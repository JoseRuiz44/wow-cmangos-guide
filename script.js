const COMMANDS = [
  // Cuenta / permisos
  { category: "Cuenta", command: ".account", description: "Muestra ayuda de comandos de cuenta" },
  { category: "Cuenta", command: ".account create <usuario> <pass>", description: "Crea cuenta" },
  { category: "Cuenta", command: ".account delete <usuario>", description: "Elimina cuenta" },
  { category: "Cuenta", command: ".account set password <usuario> <pass>", description: "Cambia contraseña" },
  { category: "Cuenta", command: ".account set gmlevel <usuario> <nivel>", description: "Asigna nivel GM" },

  // Personaje / jugador
  { category: "Jugador", command: ".character", description: "Ayuda de comandos de personaje" },
  { category: "Jugador", command: ".namego <nombre>", description: "Te teletransporta al jugador" },
  { category: "Jugador", command: ".goname <nombre>", description: "Trae jugador a tu posición" },
  { category: "Jugador", command: ".kick <nombre>", description: "Expulsa jugador" },
  { category: "Jugador", command: ".ban account <cuenta> <tiempo> <motivo>", description: "Ban por cuenta" },
  { category: "Jugador", command: ".ban character <personaje> <tiempo> <motivo>", description: "Ban por personaje" },
  { category: "Jugador", command: ".unban account <cuenta>", description: "Desbanear cuenta" },
  { category: "Jugador", command: ".mute <nombre> <tiempo>", description: "Silencia chat" },
  { category: "Jugador", command: ".unmute <nombre>", description: "Quita silencio" },

  // Progreso / stats
  { category: "Progreso", command: ".levelup [niveles]", description: "Sube nivel al objetivo o a ti" },
  { category: "Progreso", command: ".modify level <nivel>", description: "Establece nivel" },
  { category: "Progreso", command: ".modify hp <valor>", description: "Modifica vida" },
  { category: "Progreso", command: ".modify mana <valor>", description: "Modifica mana" },
  { category: "Progreso", command: ".modify energy <valor>", description: "Modifica energía" },
  { category: "Progreso", command: ".modify rage <valor>", description: "Modifica ira" },
  { category: "Progreso", command: ".modify money <cobre>", description: "Da/quita dinero" },
  { category: "Progreso", command: ".modify speed <valor>", description: "Modifica velocidad" },

  // Inventario / ítems
  { category: "Ítems", command: ".additem <id> [cantidad]", description: "Añade ítem por ID" },
  { category: "Ítems", command: ".additemset <setId>", description: "Añade set completo" },
  { category: "Ítems", command: ".listitem <id>", description: "Lista dueños del ítem" },

  // Hechizos / auras
  { category: "Hechizos", command: ".learn <spellId>", description: "Aprende hechizo" },
  { category: "Hechizos", command: ".unlearn <spellId>", description: "Olvida hechizo" },
  { category: "Hechizos", command: ".cast <spellId>", description: "Lanza hechizo" },
  { category: "Hechizos", command: ".aura <spellId>", description: "Aplica aura" },

  // Mundo / movimiento
  { category: "Mundo", command: ".gps", description: "Muestra coordenadas" },
  { category: "Mundo", command: ".go xyz <x> <y> <z> [mapa]", description: "Teletransporte por coordenadas" },
  { category: "Mundo", command: ".go creature <guid>", description: "Ir a criatura por GUID" },
  { category: "Mundo", command: ".go object <guid>", description: "Ir a objeto por GUID" },
  { category: "Mundo", command: ".appear <nombre>", description: "Aparece donde un jugador" },
  { category: "Mundo", command: ".summon <nombre>", description: "Invoca jugador" },

  // Criaturas / gameobjects
  { category: "Spawns", command: ".npc add <entry>", description: "Crea NPC por entry" },
  { category: "Spawns", command: ".npc delete", description: "Borra NPC seleccionado" },
  { category: "Spawns", command: ".npc move", description: "Mueve spawn NPC al lugar actual" },
  { category: "Spawns", command: ".npc info", description: "Info del NPC seleccionado" },
  { category: "Spawns", command: ".gobject add <entry>", description: "Crea gameobject" },
  { category: "Spawns", command: ".gobject delete", description: "Borra gameobject" },
  { category: "Spawns", command: ".gobject move", description: "Mueve gameobject" },
  { category: "Spawns", command: ".gobject info", description: "Info del gameobject" },

  // Clima / tiempo / server
  { category: "Servidor", command: ".server info", description: "Info del servidor" },
  { category: "Servidor", command: ".server motd", description: "Muestra mensaje del día" },
  { category: "Servidor", command: ".announce <texto>", description: "Anuncio global" },
  { category: "Servidor", command: ".notify <texto>", description: "Notificación global" },
  { category: "Servidor", command: ".saveall", description: "Guarda todos los personajes" },
  { category: "Servidor", command: ".server shutdown <segundos>", description: "Apaga servidor" },
  { category: "Servidor", command: ".server restart <segundos>", description: "Reinicia servidor" },
  { category: "Servidor", command: ".reload all", description: "Recarga tablas soportadas" },

  // Eventos / debug
  { category: "Debug", command: ".event activelist", description: "Lista eventos activos" },
  { category: "Debug", command: ".event start <id>", description: "Inicia evento" },
  { category: "Debug", command: ".event stop <id>", description: "Detiene evento" },
  { category: "Debug", command: ".lookup item <texto>", description: "Busca ítems por nombre" },
  { category: "Debug", command: ".lookup spell <texto>", description: "Busca hechizos por nombre" },
  { category: "Debug", command: ".lookup creature <texto>", description: "Busca criaturas por nombre" }
];

const ITEMS = [
  { id: 19019, name: "Thunderfury, Blessed Blade of the Windseeker", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_39.jpg" },
  { id: 17182, name: "Sulfuras, Hand of Ragnaros", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_hammer_unique_sulfuras.jpg" },
  { id: 18832, name: "Brutality Blade", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_48.jpg" },
  { id: 17063, name: "Band of Accuria", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_ring_15.jpg" },
  { id: 19364, name: "Ashkandi, Greatsword of the Brotherhood", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_50.jpg" },
  { id: 18803, name: "Finkle's Lava Dredger", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_mace_13.jpg" },
  { id: 17076, name: "Bonereaver's Edge", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_axe_09.jpg" },
  { id: 19334, name: "The Untamed Blade", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_59.jpg" },
  { id: 18842, name: "Staff of Dominance", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_staff_13.jpg" },
  { id: 17103, name: "Azuresong Mageblade", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_sword_43.jpg" },
  { id: 19379, name: "Neltharion's Tear", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_gem_bloodstone_01.jpg" },
  { id: 18814, name: "Choker of the Fire Lord", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelry_necklace_10.jpg" },
  { id: 16864, name: "Belt of Might", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_belt_09.jpg" },
  { id: 16865, name: "Breastplate of Might", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_plate03.jpg" },
  { id: 16866, name: "Helm of Might", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_09.jpg" },
  { id: 19160, name: "Contest Winner's Tabard", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_shirt_guildtabard_01.jpg" },
  { id: 11508, name: "Gamemaster's Slippers", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_boots_cloth_01.jpg" },
  { id: 12064, name: "Gamemaster's Hood", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_27.jpg" },
  { id: 20034, name: "Zandalar Vindicator's Breastplate", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_chest_plate10.jpg" },
  { id: 21176, name: "Black Qiraji Resonating Crystal", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_qirajicrystal_05.jpg" },
  { id: 13335, name: "Deathcharger's Reins", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_undeadhorse.jpg" },
  { id: 2411, name: "Black Stallion Bridle", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_ridinghorse.jpg" },
  { id: 19872, name: "Swift Razzashi Raptor", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_raptor.jpg" },
  { id: 19902, name: "Swift Zulian Tiger", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_jungletiger.jpg" },
  { id: 33809, name: "Amani War Bear", icon: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_challangingroar.jpg" },
  { id: 6948, name: "Hearthstone", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_rune_01.jpg" },
  { id: 159, name: "Refreshing Spring Water", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_drink_07.jpg" },
  { id: 117, name: "Tough Jerky", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_misc_food_15.jpg" },
  { id: 4306, name: "Silk Cloth", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_fabric_silk_01.jpg" },
  { id: 14047, name: "Runecloth", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_fabric_purplefire_01.jpg" },
  { id: 13446, name: "Major Healing Potion", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_54.jpg" },
  { id: 13444, name: "Major Mana Potion", icon: "https://wow.zamimg.com/images/wow/icons/large/inv_potion_76.jpg" }
];

const commandSearch = document.getElementById("commandSearch");
const categoryFilter = document.getElementById("categoryFilter");
const commandsGrid = document.getElementById("commandsGrid");
const commandsCount = document.getElementById("commandsCount");

const itemSearch = document.getElementById("itemSearch");
const itemQty = document.getElementById("itemQty");
const itemsGrid = document.getElementById("itemsGrid");
const itemsCount = document.getElementById("itemsCount");

const toast = document.getElementById("toast");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 1500);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copiado: " + text);
  } catch {
    showToast("No se pudo copiar automáticamente");
  }
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function setupCategories() {
  const categories = [...new Set(COMMANDS.map(c => c.category))].sort((a, b) => a.localeCompare(b));
  for (const cat of categories) {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  }
}

function renderCommands() {
  const q = normalize(commandSearch.value);
  const cat = categoryFilter.value;

  const filtered = COMMANDS.filter(c => {
    const matchesCategory = cat === "all" || c.category === cat;
    const hay = normalize(`${c.category} ${c.command} ${c.description}`);
    const matchesSearch = !q || hay.includes(q);
    return matchesCategory && matchesSearch;
  });

  commandsCount.textContent = `${filtered.length} comandos`;

  commandsGrid.innerHTML = "";

  if (!filtered.length) {
    commandsGrid.innerHTML = `<div class="card"><span class="muted">No hay comandos para ese filtro.</span></div>`;
    return;
  }

  for (const c of filtered) {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <h3>${c.category}</h3>
      <span class="cmd" title="${c.command}">${c.command}</span>
      <p class="muted">${c.description}</p>
      <div class="row">
        <span class="muted">Listo para pegar</span>
        <button class="btn" data-copy="${c.command}">Copiar</button>
      </div>
    `;
    commandsGrid.appendChild(el);
  }
}

function renderItems() {
  const q = normalize(itemSearch.value);
  const qty = Math.max(1, Number(itemQty.value) || 1);

  const filtered = ITEMS.filter(i => {
    const hay = normalize(`${i.name} ${i.id}`);
    return !q || hay.includes(q);
  });

  itemsCount.textContent = `${filtered.length} ítems`;

  itemsGrid.innerHTML = "";

  if (!filtered.length) {
    itemsGrid.innerHTML = `<div class="card"><span class="muted">No hay ítems para esa búsqueda.</span></div>`;
    return;
  }

  for (const i of filtered) {
    const cmd = `.additem ${i.id} ${qty}`;
    const el = document.createElement("article");
    el.className = "card item";
    el.innerHTML = `
      <img src="${i.icon}" alt="${i.name}" loading="lazy" />
      <div>
        <div class="name">${i.name}</div>
        <div class="id">ID: ${i.id}</div>
        <span class="cmd" title="${cmd}">${cmd}</span>
      </div>
      <button class="btn" data-copy="${cmd}">Copiar</button>
    `;
    itemsGrid.appendChild(el);
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-copy]");
  if (!btn) return;
  copyToClipboard(btn.dataset.copy);
});

commandSearch.addEventListener("input", renderCommands);
categoryFilter.addEventListener("change", renderCommands);
itemSearch.addEventListener("input", renderItems);
itemQty.addEventListener("input", renderItems);

setupCategories();
renderCommands();
renderItems();
