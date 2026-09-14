const commandSearch = document.getElementById("commandSearch");
const sectionFilter = document.getElementById("sectionFilter");
const subsectionFilter = document.getElementById("subsectionFilter");
const commandsSections = document.getElementById("commandsSections");
const commandsCount = document.getElementById("commandsCount");

const itemSearch = document.getElementById("itemSearch");
const qualityFilter = document.getElementById("qualityFilter");
const itemQty = document.getElementById("itemQty");
const itemsSections = document.getElementById("itemsSections");
const itemsCount = document.getElementById("itemsCount");

const tooltip = document.getElementById("tooltip");
const toast = document.getElementById("toast");

let COMMANDS = [];
let ITEMS = [];

const normalize = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function showToast(msg){ toast.textContent=msg; toast.classList.add("show"); clearTimeout(showToast.t); showToast.t=setTimeout(()=>toast.classList.remove("show"),1400); }
async function copyText(t){ try{ await navigator.clipboard.writeText(t); showToast("Copiado: "+t);}catch{showToast("No se pudo copiar")} }

async function loadData(){
  const [c,i] = await Promise.all([
    fetch("data/commands.json").then(r=>r.json()),
    fetch("data/items.json").then(r=>r.json())
  ]);
  COMMANDS = c;
  ITEMS = i;
  initFilters();
  renderCommands();
  renderItems();
}

function initFilters(){
  [...new Set(COMMANDS.map(x=>x.section))].sort().forEach(s=>{
    const o=document.createElement("option"); o.value=s; o.textContent=s; sectionFilter.appendChild(o);
  });
  refreshSubsectionFilter();
}

function refreshSubsectionFilter(){
  const sec = sectionFilter.value;
  subsectionFilter.innerHTML = `<option value="all">Todas las subsecciones</option>`;
  [...new Set(COMMANDS.filter(x=>sec==="all"||x.section===sec).map(x=>x.subsection))].sort().forEach(s=>{
    const o=document.createElement("option"); o.value=s; o.textContent=s; subsectionFilter.appendChild(o);
  });
}

function renderCommands(){
  const q=normalize(commandSearch.value), sec=sectionFilter.value, sub=subsectionFilter.value;
  const list = COMMANDS.filter(c=>{
    const okSec = sec==="all"||c.section===sec;
    const okSub = sub==="all"||c.subsection===sub;
    const okQ = !q || normalize(`${c.section} ${c.subsection} ${c.command} ${c.description} ${c.alias||""}`).includes(q);
    return okSec && okSub && okQ;
  });
  commandsCount.textContent = `${list.length} comandos`;

  const grouped = {};
  for(const c of list){
    grouped[c.section] ??= {};
    grouped[c.section][c.subsection] ??= [];
    grouped[c.section][c.subsection].push(c);
  }

  commandsSections.innerHTML = "";
  Object.keys(grouped).sort().forEach(section=>{
    const secEl=document.createElement("div"); secEl.className="section";
    secEl.innerHTML=`<h3>${section}</h3>`;
    Object.keys(grouped[section]).sort().forEach(sub=>{
      const subEl=document.createElement("div"); subEl.className="subsection";
      subEl.innerHTML=`<h4>${sub} <span class="muted">(${grouped[section][sub].length})</span></h4><div class="grid"></div>`;
      const grid=subEl.querySelector(".grid");
      grouped[section][sub].forEach(c=>{
        const card=document.createElement("article"); card.className="card";
        card.innerHTML=`
          <strong>${c.description}</strong>
          <span class="cmd" title="${c.command}">${c.command}</span>
          <div class="row">
            <span class="muted">${c.alias?`Alias: ${c.alias}`:""}</span>
            <button class="btn" data-copy="${c.command}">Copiar</button>
          </div>
        `;
        grid.appendChild(card);
      });
      secEl.appendChild(subEl);
    });
    commandsSections.appendChild(secEl);
  });
}

function renderItems(){
  const q=normalize(itemSearch.value), qual=qualityFilter.value, qty=Math.max(1,Number(itemQty.value)||1);
  const list = ITEMS.filter(i=>{
    const okQ = !q || normalize(`${i.id} ${i.name} ${i.set||""} ${i.quality}`).includes(q);
    const okQual = qual==="all" || i.quality===qual;
    return okQ && okQual;
  });
  itemsCount.textContent = `${list.length} ítems`;

  const grouped = {
    sets: list.filter(i=>i.group==="set"),
    legendary: list.filter(i=>i.quality==="legendary"),
    epic: list.filter(i=>i.quality==="epic"),
    rare: list.filter(i=>i.quality==="rare")
  };

  itemsSections.innerHTML = "";
  const blocks = [
    ["Conjuntos / Sets", grouped.sets, true],
    ["Legendarios", grouped.legendary, false],
    ["Épicos", grouped.epic, false],
    ["Raros", grouped.rare, false],
  ];

  for(const [title, arr, bySet] of blocks){
    const section=document.createElement("div"); section.className="section";
    section.innerHTML=`<h3>${title} <span class="muted">(${arr.length})</span></h3>`;
    if(bySet){
      const by = {};
      arr.forEach(x => { const k=x.set||"Otros"; (by[k]??=[]).push(x); });
      Object.keys(by).sort().forEach(setName=>{
        const sub=document.createElement("div"); sub.className="subsection";
        sub.innerHTML=`<h4>${setName} <span class="muted">(${by[setName].length})</span></h4><div class="items-grid"></div>`;
        const g=sub.querySelector(".items-grid");
        by[setName].forEach(i=>g.appendChild(itemCard(i,qty)));
        section.appendChild(sub);
      });
    }else{
      const g=document.createElement("div"); g.className="items-grid";
      arr.forEach(i=>g.appendChild(itemCard(i,qty)));
      section.appendChild(g);
    }
    itemsSections.appendChild(section);
  }
}

function itemCard(i, qty){
  const cmd = `.additem ${i.id} ${qty}`;
  const el=document.createElement("article");
  el.className=`card item q-${i.quality}`;
  el.dataset.tooltip = `
<b>${i.name}</b><br/>
ID: ${i.id}<br/>
Calidad: ${i.quality}<br/>
Tipo: ${i.type || "N/A"}<br/>
Slot: ${i.slot || "N/A"}<br/>
Set: ${i.set || "N/A"}<br/>
Comando: <code>${cmd}</code>
  `.trim();
  el.innerHTML=`
    <img src="${i.icon}" alt="${i.name}" loading="lazy" />
    <div>
      <div class="name">${i.name}</div>
      <div class="muted">ID: ${i.id}</div>
      <span class="cmd">${cmd}</span>
    </div>
    <button class="btn" data-copy="${cmd}">Copiar</button>
  `;
  return el;
}

document.addEventListener("click", e=>{
  const b=e.target.closest("button[data-copy]");
  if(b) copyText(b.dataset.copy);
});

document.addEventListener("mousemove", e=>{
  const card=e.target.closest("[data-tooltip]");
  if(!card){ tooltip.classList.remove("show"); return; }
  tooltip.innerHTML=card.dataset.tooltip;
  tooltip.style.left = `${e.clientX + 14}px`;
  tooltip.style.top = `${e.clientY + 14}px`;
  tooltip.classList.add("show");
});

sectionFilter.addEventListener("change", ()=>{ refreshSubsectionFilter(); renderCommands(); });
subsectionFilter.addEventListener("change", renderCommands);
commandSearch.addEventListener("input", renderCommands);

itemSearch.addEventListener("input", renderItems);
qualityFilter.addEventListener("change", renderItems);
itemQty.addEventListener("input", renderItems);

loadData();