import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema(
  {
    strength: { type: Number, default: 5 },
    agility: { type: Number, default: 5 },
    vitality: { type: Number, default: 5 },
    arcana: { type: Number, default: 5 },
    perception: { type: Number, default: 5 },
    will: { type: Number, default: 5 }
  },
  { _id: false }
);

const LuckSchema = new mongoose.Schema(
  {
    base: { type: Number, default: 0 },
    equipment: { type: Number, default: 0 },
    titles: { type: Number, default: 0 },
    impulse: { type: Number, default: 0 },
    events: { type: Number, default: 0 }
  },
  { _id: false }
);

/**
 * Equipamento: cada slot armazena uma String — ou o id de catálogo
 * (legado) ou a itemStr serializada do sistema ItemEffects:
 *
 *    "numId|e1:v1|e2:v2|...|e10:v10"   ex.: "1005|1:65|4:5|7:3"
 *
 * Formato compacto: menos espaço no banco, transferência fácil entre
 * jogadores (correio/mercado/trades) e serialização direta.
 */
const EquipmentSchema = new mongoose.Schema(
  {
    weapon_main: { type: String, default: null },
    weapon_off: { type: String, default: null },
    head: { type: String, default: null },
    chest: { type: String, default: null },
    legs: { type: String, default: null },
    gloves: { type: String, default: null },
    boots: { type: String, default: null },
    earring: { type: String, default: null },
    necklace: { type: String, default: null },
    belt: { type: String, default: null },
    resistance: { type: String, default: null },
    amulet: { type: String, default: null },
    spirit_stone: { type: String, default: null },
    pet: { type: String, default: null },
    mount: { type: String, default: null }
  },
  { _id: false }
);

/**
 * Formato itemStr (sistema ItemEffects):
 *    "numId"                     → item base sem effects customizados
 *    "numId|e1:v1|e2:v2|..."     → com effects (values podem ser negativos)
 * Ex.: "1005|1:65|4:5|7:3"
 */
const ITEM_STR_REGEX = /^\d+(\|[1-9]\d*:-?\d+)*$/;

/**
 * Inventário (sistema ItemEffects): itens como string serializada.
 *
 *    { itemStr: "1005|1:65|4:5|7:3", qty: 1 }
 *
 * O campo legado `id` é mantido (opcional) para compatibilidade com
 * personagens antigos; novos itens devem usar `itemStr`.
 */
const InventoryItemSchema = new mongoose.Schema(
  {
    itemStr: {
      type: String,
      default: null,
      validate: {
        validator: (value) => value === null || ITEM_STR_REGEX.test(value),
        message: (props) => `itemStr inválida: "${props.value}"`
      }
    },
    id: { type: String, default: null },
    qty: { type: Number, default: 1 }
  },
  { _id: false }
);

const ProficienciesSchema = new mongoose.Schema(
  {
    blade: { type: Number, default: 0 },
    arcane: { type: Number, default: 0 },
    druid: { type: Number, default: 0 },
    vanguard: { type: Number, default: 0 },
    ranger: { type: Number, default: 0 },
    spectre: { type: Number, default: 0 }
  },
  { _id: false }
);

const CharacterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    archetype: { type: String, required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    xpToNext: { type: Number, default: 100 },
    gold: { type: Number, default: 100 },
    hp: { type: Number, required: true },
    maxHp: { type: Number, required: true },
    mp: { type: Number, required: true },
    maxMp: { type: Number, required: true },
    stats: { type: StatsSchema, default: () => ({}) },
    luck: { type: LuckSchema, default: () => ({}) },
    freePoints: { type: Number, default: 3 },
    equipment: { type: EquipmentSchema, default: () => ({}) },
    inventory: { type: [InventoryItemSchema], default: [] },
    maxInventory: { type: Number, default: 60 },
    // Baú: armazenamento estendido do personagem (até 500 entradas)
    storage: { type: [InventoryItemSchema], default: [] },
    maxStorage: { type: Number, default: 500 },
    skills: { type: [String], default: [] },
    skillCooldowns: { type: Map, of: Number, default: {} },
    titles: { type: [String], default: [] },
    activeTitle: { type: String, default: null },
    proficiencies: { type: ProficienciesSchema, default: () => ({}) },
    kills: { type: Map, of: Number, default: {} },
    discoveries: { type: [String], default: [] },
    weakPointHits: { type: Number, default: 0 },
    rareDrops: { type: Number, default: 0 },
    progress: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
  },
  { _id: true }
);

const PlayerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  characters: { type: [CharacterSchema], default: [] },
  activeCharId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Índices para busca eficiente de personagens (ranking, listagem)
PlayerSchema.index({ 'characters.name': 1 });
PlayerSchema.index({ 'characters.level': -1 });

export const Player = mongoose.model('Player', PlayerSchema);
