import { bosses } from '../data/bosses';
import { getDungeon } from '../data/dungeons';
import { translations } from '../i18n';
import { EFFECT } from '../data/effectRegistry';
import { getEffectName } from '../data/effectNames';
import { monsters } from '../data/monsters';
import { regions } from '../data/regions';
import { skills } from '../data/skills';
import { equippedWeaponCategories, getProficiencyPassiveTotals, PROFICIENCY_ATK_BONUS_PER_POINT, PROF_XP, weaponCategoryOf } from '../data/proficiencies';
import { useCombatStore } from '../store/useCombatStore';
import { useGameStore } from '../store/useGameStore';
import { usePartyStore } from '../store/usePartyStore';
import { usePetStore } from '../store/usePetStore';
import { usePartyCombatStore } from '../store/usePartyCombatStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { socketService } from '../services/socket';
import type { Enemy, LootEntry } from '../types/combat.types';
import type { PartyMember } from '../types/party.types';
import { calculatePlayerStats, getConditionalValue, type ResolvedEffects } from './effectEngine';
import { hiddenEventsSystem } from './hiddenEvents';
import { impulseSystem } from './impulse';
import { rollLoot } from './loot';
import { questSystem } from './quests';

export interface CombatStartOptions {
  dungeon?: boolean;
  dungeonId?: string;
  floor?: number;
  maxFloor?: number;
  bossId?: string;
  enemyId?: string;
}

export type PlayerCombatAction = 'attack' | 'defend' | 'skill' | 'flee';


const getLang = () => {
  if (typeof window === 'undefined') {
    return 'en-US' as const;
  }

  const saved = window.localStorage.getItem('eclipsia_lang');

  return saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES' || saved === 'ja-JP' ? saved : 'en-US';
};

const t = (path: string) => {
  const read = (dictionary: unknown) =>
    path.split('.').reduce<unknown>((current, key) => {
      if (!current || typeof current === 'string') {
        return undefined;
      }

      return (current as Record<string, unknown>)[key];
    }, dictionary);

  const value = read(translations[getLang()]) ?? read(translations['en-US']);

  return typeof value === 'string' ? value : path;
};

const toLootTable = (lootTable: LootEntry[]) => lootTable;

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const createEnemyFromMonster = (monsterId: string): Enemy => {
  const monster = monsters.find((entry) => entry.id === monsterId);

  if (!monster) {
    throw new Error(`Unknown monster: ${monsterId}`);
  }

  return {
    id: monster.id,
    icon: monster.icon,
    nameKey: `monsters.${monster.id}.name`,
    race: monster.race,
    level: monster.level,
    hp: monster.hp,
    maxHp: monster.hp,
    atk: monster.atk,
    def: monster.def,
    xp: monster.xp,
    gold: randomBetween(monster.gold.min, monster.gold.max),
    skills: monster.skills,
    lootTable: toLootTable(monster.lootTable),
    mechanics: monster.boss
      ? {
          phaseTriggers: monster.phases === 3 ? [65, 30] : [50],
          atkBoosts: monster.phases === 3 ? [1.25, 1.45] : [1.4],
          enrage: true,
          specialAbility: 'boss_strike'
        }
      : undefined
  };
};

const createEnemyFromBoss = (bossId: string): Enemy => {
  const boss = bosses.find((entry) => entry.id === bossId);

  if (!boss) {
    throw new Error(`Unknown boss: ${bossId}`);
  }

  return {
    id: boss.id,
    icon: boss.icon,
    nameKey: boss.nameKey,
    race: boss.race,
    level: boss.level,
    hp: boss.hp,
    maxHp: boss.hp,
    atk: boss.atk,
    def: boss.def,
    xp: boss.xp,
    gold: boss.gold,
    skills: boss.skills,
    lootTable: boss.lootTable,
    mechanics: {
      phaseTriggers: [boss.mechanics.phase2Trigger, boss.mechanics.phase3Trigger].filter((value): value is number => Boolean(value)),
      atkBoosts: [boss.mechanics.phase2AtkBoost ?? boss.mechanics.atkBoost ?? 1.25, boss.mechanics.enrageAtkBoost ?? 1.5],
      enrage: Boolean(boss.mechanics.enrageBelow),
      specialAbility: boss.mechanics.specialAbility ?? 'boss_strike'
    }
  };
};

const getRegionMonsterId = (regionId: string) => {
  const region = regions.find((entry) => entry.id === regionId);
  const monsterIds = region?.monsters.filter((monsterId) => !monsters.find((monster) => monster.id === monsterId)?.boss) ?? [];

  return pickRandom(monsterIds.length > 0 ? monsterIds : ['rat']);
};

// ────────────────────────────────────────────────────────────────
// Integração com o effectEngine (Parte 7): os effects numéricos do
// equipamento são resolvidos no início do combate e aplicados em
// cada fase (ataque, defesa, kill, HP crítico, crítico).
// ────────────────────────────────────────────────────────────────
let activeEffects: ResolvedEffects | null = null;
/** Efeitos resolvidos do equipamento atual (com fallback seguro). */
const getResolvedEffects = (): ResolvedEffects | null => {
  if (activeEffects) return activeEffects;

  const player = usePlayerStore.getState().data;

  if (!player) return null;

  activeEffects = calculatePlayerStats(player.stats, player.equipment);
  return activeEffects;
};

const LOW_HP_THRESHOLD = 0.2;

const isPlayerLowHp = (): boolean => {
  const player = usePlayerStore.getState().data;

  return Boolean(player && player.maxHp > 0 && player.hp / player.maxHp < LOW_HP_THRESHOLD);
};

const rollCrit = (): { isCrit: boolean; multiplier: number } => {
  const player = usePlayerStore.getState().data;
  const perception = player?.stats.perception ?? 0;
  const resolved = getResolvedEffects();
  // critChance já é fração 0-1 (ex.: 0.06 = 6%)
  const critChance = resolved?.critChance ?? 0;
  const passiveCrit = getPassiveCritChance();
  const chance = 0.05 + perception * 0.002 + critChance + passiveCrit;

  if (Math.random() >= chance) {
    return { isCrit: false, multiplier: 1 };
  }

  // critDmg e ON_CRIT_DMG são frações 0-1
  const critDmg = (resolved?.critDmg ?? 0) + getPassiveCritDamage();
  const onCritDmg = resolved ? getConditionalValue(resolved, EFFECT.ON_CRIT_DMG) : 0;

  return { isCrit: true, multiplier: 2 * (1 + critDmg + onCritDmg) };
};

/**
 * Rola o crítico de uma SKILL — inclui CRIT_SKILL_DMG (40) no multiplicador.
 */
const rollSkillCrit = (): { isCrit: boolean; multiplier: number } => {
  const base = rollCrit();

  if (!base.isCrit) {
    return base;
  }

  const skillCritDmg = (getResolvedEffects() as ResolvedEffects | null)?.critSkillDmg ?? 0;
  const multiplier = 2 * (1 + ((getResolvedEffects() as ResolvedEffects | null)?.critDmg ?? 0) + getPassiveCritDamage() + skillCritDmg);

  return { isCrit: true, multiplier };
};

/**
 * Rola os effects "ao acertar" (61–66) do equipamento contra o
 * inimigo. Chance = value (inteiro em %).
 */
const rollOnHitEffects = () => {
  const resolved = getResolvedEffects();

  if (!resolved || resolved.onHitEffects.length === 0) return;

  const combat = useCombatStore.getState();
  const playerStore = usePlayerStore.getState();
  const dotDamage = Math.max(3, Math.floor(playerStore.getTotalAtk() * 0.15));

  for (const onHit of resolved.onHitEffects) {
    // chance é fração 0-1 (ex.: 0.25 = 25%)
    if (Math.random() >= onHit.chance) continue;

    switch (onHit.effectId) {
      case EFFECT.ON_HIT_BURN:
        combat.addEnemyEffect({ type: 'dot', turns: 2, damage: dotDamage });
        break;
      case EFFECT.ON_HIT_BLEED:
        combat.addEnemyEffect({ type: 'dot', turns: 2, damage: dotDamage });
        break;
      case EFFECT.ON_HIT_POISON:
        combat.addEnemyEffect({ type: 'dot', turns: 3, damage: dotDamage });
        break;
      case EFFECT.ON_HIT_FREEZE:
      case EFFECT.ON_HIT_STUN:
        combat.addEnemyEffect({ type: 'stun', turns: Math.max(1, onHit.value) });
        break;
      case EFFECT.ON_HIT_SLOW:
        combat.addEnemyEffect({ type: 'slow', turns: Math.max(1, onHit.value), value: 20 });
        break;
      default:
        break;
    }

    combat.addLog('attack', `${getEffectName(onHit.effectId, getLang())}!`);
  }
};

/** Finaliza o turno do inimigo: ticks de cooldown, avanço de turno e auto-batalha. */
const endEnemyTurn = () => {
  reportHuntRound(false);

  const combat = useCombatStore.getState();

  usePetStore.getState().tickCooldown();
  combat.tickCooldowns();
  useCombatStore.setState({
    turn: combat.turn + 1,
    phase: 'player',
    isDefending: false
  });

  if (useCombatStore.getState().autoFight) {
    combatEngine.autoAction();
  }
};

/** Cura flat direta no jogador (usado pelo effect 55 — REGENERATE). */
const healPlayerFlat = (amount: number) => {
  usePlayerStore.setState((state) => {
    if (!state.data || amount <= 0) return state;

    return {
      data: {
        ...state.data,
        hp: Math.min(state.data.maxHp, state.data.hp + amount)
      }
    };
  });
};

// ── Caçada de party: acumuladores do round e reporte ──
let roundDealt = 0;
let roundTaken = 0;

const huntSession = () => {
  const state = usePartyCombatStore.getState();

  return state.active ? state.session : null;
};

/** Auras da caçada só valem lutando na região da sessão. */
const huntRegionMatches = (): boolean => {
  const session = huntSession();

  return Boolean(session && session.region === useCombatStore.getState().region);
};

const reportHuntRound = (killed: boolean) => {
  if (!huntSession()) {
    roundDealt = 0;
    roundTaken = 0;
    return;
  }

  if (roundDealt > 0 || roundTaken > 0 || killed) {
    socketService.reportPartyTurn({ dmgDealt: roundDealt, dmgTaken: roundTaken, killed });
  }

  roundDealt = 0;
  roundTaken = 0;
};

/**
 * Passivas das armas equipadas (dmg/crit/heal) — veja PROFICIENCY_PASSIVES.
 */
const getPassiveTotals = () => {
  const data = usePlayerStore.getState().data;

  return data ? getProficiencyPassiveTotals(data.equipment, data.proficiencies) : { dmgBonus: 0, critChance: 0, critDamage: 0, healBonus: 0, defBonus: 0 };
};

const getPassiveCritChance = (): number => getPassiveTotals().critChance;
const getPassiveCritDamage = (): number => getPassiveTotals().critDamage;

/**
 * Soma dos bônus de ATK das proficiências das armas equipadas.
 * +0,2% por ponto (100 pts = +20%).
 */
const getEquippedProficiencyBonus = (): number => {
  const data = usePlayerStore.getState().data;

  if (!data) {
    return 0;
  }

  const categories = equippedWeaponCategories(data.equipment);

  return categories.reduce((sum, category) => {
    const points = data.proficiencies[category] ?? 0;

    return sum + points * PROFICIENCY_ATK_BONUS_PER_POINT;
  }, 0);
};

/**
 * Concede XP de proficiência às armas equipadas (por ataque/skill/kill).
 */
const gainProficiencyXp = (amount: number) => {
  const data = usePlayerStore.getState().data;

  if (!data) {
    return;
  }

  for (const category of equippedWeaponCategories(data.equipment)) {
    usePlayerStore.getState().addProficiency(category, amount);
  }
};

const getPlayerDamage = (percent = 100, extraMultiplier = 1, isSkill = false) => {
  const playerStore = usePlayerStore.getState();
  const combat = useCombatStore.getState();
  const resolved = getResolvedEffects();

  // Bônus de dano (frações 0-1): DMG_BONUS (24), VS_* (75-78),
  // ON_LOW_HP_ATK (69, com HP < 20%), PARTY_ATK_AURA (79 com party ativa)
  let bonusFraction = resolved?.dmgBonus ?? 0;

  // Aura coletiva da caçada de party (soma dos PARTY_ATK_AURA dos membros)
  const session = huntSession();

  if (session && huntRegionMatches()) {
    bonusFraction += session.auraAtk / 100;
  }

  if (resolved && combat.enemy) {
    if (combat.enemy.race === 'beast') {
      bonusFraction += getConditionalValue(resolved, EFFECT.VS_BEAST_DMG);
    }

    if (combat.enemy.race === 'undead') {
      bonusFraction += getConditionalValue(resolved, EFFECT.VS_UNDEAD_DMG);
    }

    // VS_WEAK_DMG (78): inimigo comprometido (atordoado/lento) expõe o ponto fraco
    const enemyCompromised = combat.enemyEffects.some((effect) => effect.type === 'stun' || effect.type === 'slow');

    if (enemyCompromised) {
      bonusFraction += getConditionalValue(resolved, EFFECT.VS_WEAK_DMG);
    }
  }

  if (combat.isBoss && resolved) {
    bonusFraction += getConditionalValue(resolved, EFFECT.VS_BOSS_DMG);
  }

  if (isPlayerLowHp() && resolved) {
    bonusFraction += getConditionalValue(resolved, EFFECT.ON_LOW_HP_ATK);
  }

  // PARTY_ATK_AURA (79): bônus enquanto houver party ativa
  if (resolved && usePartyStore.getState().getAlive().length > 0) {
    bonusFraction += getConditionalValue(resolved, EFFECT.PARTY_ATK_AURA);
  }

  const base = playerStore.getTotalAtk() * (percent / 100) * impulseSystem.getBonus('damage') * (1 + bonusFraction);

  // PROEFICIÊNCIA DE ARMA: +0,2% de ATK por ponto na categoria da arma equipada.
  const weaponBonus = getEquippedProficiencyBonus();

  // PASSIVAS de proficiência (marcos 50/150/300): bônus de dano.
  const passiveDmg = getPassiveTotals().dmgBonus;
  const finalBase = base * (1 + weaponBonus + passiveDmg) * extraMultiplier;

  const { isCrit, multiplier } = isSkill ? rollSkillCrit() : rollCrit();
  const defenseReduction = Math.max(0, combat.enemy?.def ?? 0) * 0.35;
  const damage = Math.max(1, Math.floor(finalBase * multiplier - defenseReduction));

  // ON_CRIT_BLEED (71): ao criticar aplica sangramento (value = dano)
  if (isCrit && resolved) {
    const critBleed = getConditionalValue(resolved, EFFECT.ON_CRIT_BLEED);

    if (critBleed > 0) {
      combat.addEnemyEffect({ type: 'dot', turns: 2, damage: critBleed });
      combat.addLog('attack', `${getEffectName(EFFECT.ON_CRIT_BLEED, getLang())}!`);
    }
  }

  return damage;
};

const reducePlayerMp = (amount: number) => {
  usePlayerStore.setState((state) => ({
    data: state.data
      ? {
          ...state.data,
          mp: Math.max(0, state.data.mp - amount)
        }
      : state.data
  }));
};

const healPlayerPercent = (hpPercent: number, mpPercent: number) => {
  const playerStore = usePlayerStore.getState();

  playerStore.recoverHp(hpPercent);
  playerStore.recoverMp(mpPercent);
};

const applyEnemyDamage = (amount: number) => {
  const combat = useCombatStore.getState();
  const applied = Math.min(Math.max(0, amount), Math.max(0, combat.enemyHp));
  const enemyHp = Math.max(0, combat.enemyHp - amount);

  if (huntSession()) {
    roundDealt += applied;
  }

  useCombatStore.getState().setEnemyHp(enemyHp);

  return enemyHp;
};

const applyDotEffects = () => {
  const combat = useCombatStore.getState();
  const dotDamage = combat.enemyEffects.reduce((total, effect) => total + (effect.damage ?? 0), 0);

  if (dotDamage > 0) {
    applyEnemyDamage(dotDamage);
    combat.addLog({ type: 'dot', message: `${t('combat.log.damage')} ${dotDamage}`, turn: combat.turn });
  }

  combat.tickEffects();
};

const selectPartyTarget = (): PartyMember | null => {
  const party = usePartyStore.getState();
  const alive = party.getAlive();

  if (alive.length === 0) {
    return null;
  }

  // PROEFICIÊNCIA DE ARMA: quem empunha ESCUDO assume o papel de tanque
  // e tem 60% de chance de absorver o golpe pelos aliados.
  const shielded = alive.filter((member) => {
    const main = weaponCategoryOf(member.equipment?.weapon_main);
    const off = weaponCategoryOf(member.equipment?.weapon_off);

    return main === 'shield' || off === 'shield';
  });

  if (shielded.length > 0 && Math.random() < 0.6) {
    return pickRandom(shielded);
  }

  return pickRandom(alive);
};

const damagePartyOrPlayer = (damage: number) => {
  const party = usePartyStore.getState();
  const target = selectPartyTarget();
  const resolved = getResolvedEffects();

  // PARTY_DEF_AURA (80): party ativa reduz o dano recebido do grupo
  let finalDamage = damage;

  if (resolved && party.getAlive().length > 0) {
    const defAura = getConditionalValue(resolved, EFFECT.PARTY_DEF_AURA);

    if (defAura > 0) {
      finalDamage = Math.max(1, Math.floor(finalDamage * (1 - defAura)));
    }
  }

  if (huntSession()) {
    roundTaken += Math.max(0, finalDamage);
  }

  if (!target) {
    usePlayerStore.getState().takeDamage(finalDamage);
    return;
  }

  party.takeDamage(target.id, finalDamage);

  if (target.id === party.activeId) {
    usePlayerStore.getState().takeDamage(finalDamage);
  }
};

const isDefeated = () => {
  const playerDead = usePlayerStore.getState().isDead();
  const party = usePartyStore.getState();
  const members = party.members;

  return playerDead || (members.length > 0 && party.getAlive().length === 0);
};

const handleDefeat = () => {
  const combat = useCombatStore.getState();

  combat.addLog('defeat', t('combat.defeat'));
  hiddenEventsSystem.recordDeath(combat.region || 'unknown');

  if (combat.isDungeon) {
    hiddenEventsSystem.recordDungeonDeath(combat.region || 'dungeon');
  }

  usePlayerStore.getState().restoreAll();
  usePartyStore.getState().reviveAll();
  combat.resetCombat();
};

const handleVictory = () => {
  reportHuntRound(true);

  const combat = useCombatStore.getState();

  // Dungeon em party: andar limpo avança para todos os membros
  const activeHunt = huntSession();

  if (activeHunt?.dungeonId && combat.isDungeon) {
    socketService.reportPartyFloor(combat.floor + 1);
  }
  const playerStore = usePlayerStore.getState();
  const partyStore = usePartyStore.getState();
  const enemy = combat.enemy;

  if (!enemy) {
    return;
  }

  const xpMultiplier = partyStore.getXpMultiplier();
  const resolved = getResolvedEffects();
  const xpBonus = resolved?.xpBonus ?? 0;
  const goldBonus = resolved?.goldBonus ?? 0;

  // Bônus de grupo por nº de membros na caçada (autoritativo do servidor)
  const activeSession = huntSession();
  const sizeBonus = activeSession && huntRegionMatches() ? activeSession.sizeBonus : undefined;

  // xpBonus/goldBonus são frações 0-1; sizeBonus vem em % inteiro
  const xp = Math.floor(enemy.xp * xpMultiplier * impulseSystem.getBonus('xp') * (1 + xpBonus + (sizeBonus?.xp ?? 0) / 100));
  const gold = Math.floor(enemy.gold * impulseSystem.getBonus('gold') * (1 + goldBonus + (sizeBonus?.gold ?? 0) / 100));

  playerStore.gainXp(xp);
  playerStore.gainGold(gold);
  playerStore.addKill(enemy.id);
  gainProficiencyXp(PROF_XP.kill);
  questSystem.onKill(enemy.id);

  // Missões diárias
  playerStore.recordDailyEvent('kill');

  if (combat.isDungeon) {
    playerStore.recordDailyEvent('dungeon_floor');
  }

  // 4. Ao matar: ON_KILL_HEAL (67) e ON_KILL_MP (68) — frações 0-1,
  //    convertidas para porcentagem (0-100) esperada por recoverHp/recoverMp
  if (resolved) {
    const onKillHeal = getConditionalValue(resolved, EFFECT.ON_KILL_HEAL);

    if (onKillHeal > 0) {
      playerStore.recoverHp(onKillHeal * 100);
    }

    const onKillMp = getConditionalValue(resolved, EFFECT.ON_KILL_MP);

    if (onKillMp > 0) {
      playerStore.recoverMp(onKillMp * 100);
    }
  }

  // Recompensas garantidas ao limpar a dungeon (boss do último andar)
  if (combat.isDungeon && combat.floor >= combat.maxFloor && combat.dungeonId) {
    const dungeonDef = getDungeon(combat.dungeonId);

    if (dungeonDef) {
      playerStore.gainGold(dungeonDef.rewardGold);
      dungeonDef.rewardItems.forEach((itemId) => playerStore.addItem(itemId, 1));
      combat.addLog('victory', `${t('combat.dungeonCleared')} +${dungeonDef.rewardGold} 🪙`);
    }
  }

  // LOOT_BONUS (29, pets/montarias) + bônus de grupo aumentam a sorte do drop
  const lootLuck = playerStore.getLuck() + (resolved?.lootBonus ?? 0) * 200 + (sizeBonus?.loot ?? 0) * 5;
  const loot = rollLoot(enemy, lootLuck, combat.autoConfig.lootFilter);
  loot.forEach((entry) => playerStore.addItem(entry.itemId, entry.qty));

  impulseSystem.consumeCharge();

  if (combat.isDungeon) {
    healPlayerPercent(60, 60);
  } else {
    healPlayerPercent(30, 40);
  }

  combat.addLog('victory', t('combat.victory'));
  useCombatStore.setState({ phase: 'victory', active: false });

  if (combat.autoAdvance && !playerStore.isDead() && !playerStore.isInvFull()) {
    const rareEventsTriggered = hiddenEventsSystem.checkAll();

    if (combat.autoConfig.stopEvent && rareEventsTriggered.length > 0) {
      return;
    }

    if (combat.isDungeon && combat.floor < combat.maxFloor) {
      const nextFloor = combat.floor + 1;

      if (combat.autoConfig.stopBoss && nextFloor === combat.maxFloor) {
        return;
      }

      useCombatStore.setState({ floor: nextFloor });
      combatEngine.start(combat.region, {
        dungeon: true,
        dungeonId: combat.dungeonId ?? undefined,
        floor: nextFloor,
        maxFloor: combat.maxFloor
      });
    } else if (!combat.isDungeon && !combat.autoConfig.stopBoss) {
      // Dungeon limpa: permanece na tela de vitória (sem reiniciar caça)
      combatEngine.start(combat.region);
    }
  }
};

const afterPlayerAction = () => {
  const combat = useCombatStore.getState();
  const petResult = usePetStore.getState().petAct(combat.enemy?.atk ?? 0);

  if (petResult.damage) {
    applyEnemyDamage(petResult.damage);
    combat.addLog('pet', `${t('pet.title')} ${petResult.damage}`);
  }

  if (petResult.heal) {
    usePlayerStore.getState().recoverHp(petResult.heal);
  }

  if (useCombatStore.getState().enemyHp <= 0) {
    handleVictory();
    return;
  }

  combatEngine.enemyTurn();
};

export const combatEngine = {
  start(region: string, options: CombatStartOptions = {}) {
    const isDungeon = Boolean(options.dungeon);
    const floor = options.floor ?? 1;
    const maxFloor = options.maxFloor ?? 1;
    const dungeonDef = options.dungeonId ? getDungeon(options.dungeonId) : undefined;

    // Dungeon: o boss aparece automaticamente no último andar
    const bossId = options.bossId ?? (isDungeon && floor >= maxFloor ? dungeonDef?.bossId : undefined);

    const enemy = bossId
      ? createEnemyFromBoss(bossId)
      : createEnemyFromMonster(options.enemyId ?? getRegionMonsterId(region));

    // 1. Ao iniciar combate: resolve os stats reais do equipamento
    //    e registra os onHitEffects / pools defensivos.
    const player = usePlayerStore.getState().data;
    activeEffects = player ? calculatePlayerStats(player.stats, player.equipment) : null;
    useCombatStore.setState({
      shieldPool: activeEffects ? getConditionalValue(activeEffects, EFFECT.SHIELD) : 0,
      barrierPool: activeEffects ? getConditionalValue(activeEffects, EFFECT.BARRIER) : 0
    });

    useCombatStore.setState({
      active: true,
      phase: 'player',
      turn: 1,
      region,
      floor,
      maxFloor,
      isDungeon,
      dungeonId: options.dungeonId ?? null,
      isBoss: Boolean(enemy.mechanics),
      enemy,
      enemyHp: enemy.hp,
      enemyMaxHp: enemy.maxHp,
      enemyEffects: [],
      playerEffects: [],
      isDefending: false,
      log: [],
      phase2Triggered: false,
      phase3Triggered: false,
      enraged: false
    });

    return enemy;
  },

  attack() {
    gainProficiencyXp(PROF_XP.attack);
    // BASIC_ATK_DMG (32): amplifica o dano do ataque básico
    const basicDmgBonus = (getResolvedEffects() as ResolvedEffects | null)?.basicAtkDmg ?? 0;
    const damage = getPlayerDamage(100, 1 + basicDmgBonus);
    const hp = applyEnemyDamage(damage);

    useCombatStore.getState().addLog('attack', `${t('combat.attack')} ${damage}`);

    if (hp <= 0) {
      handleVictory();
      return;
    }

    // 2. Ao atacar: rola os onHitEffects (61–66) do equipamento.
    rollOnHitEffects();

    if (useCombatStore.getState().enemyHp <= 0) {
      handleVictory();
      return;
    }

    afterPlayerAction();
  },

  defend() {
    useCombatStore.setState({ isDefending: true });
    useCombatStore.getState().addLog('defend', t('combat.defend'));
    afterPlayerAction();
  },

  skill(skillId: string) {
    const skill = skills.find((entry) => entry.id === skillId);
    const player = usePlayerStore.getState().data;
    const combat = useCombatStore.getState();
    const resolved = getResolvedEffects() as ResolvedEffects | null;

    if (!skill || !player || player.mp < skill.mp || combat.skillCooldowns[skillId]) {
      this.attack();
      return;
    }

    gainProficiencyXp(PROF_XP.skill);

    // SKILL_MP_REDUCE (34): reduz o custo de MP da skill (mín 1)
    const mpCost = Math.max(1, Math.round(skill.mp * (1 - (resolved?.skillMpReduce ?? 0))));
    reducePlayerMp(mpCost);

    // HASTE (59) + SKILL_CD_REDUCE (33): reduzem o cooldown (mín 1)
    const haste = resolved ? getConditionalValue(resolved, EFFECT.HASTE) : 0;
    const cdReduce = resolved?.skillCdReduce ?? 0;
    combat.setCooldown(skillId, Math.max(1, Math.round(skill.cd * (1 - haste - cdReduce))));

    if (skill.healPercent) {
      // HEAL_BONUS (26) + SKILL_HEAL_BONUS (36) + PASSIVA amplificam a cura
      const healBonus = (resolved?.healBonus ?? 0) + (resolved?.skillHealBonus ?? 0) + getPassiveTotals().healBonus;

      usePlayerStore.getState().recoverHp(skill.healPercent * (1 + healBonus));
    }

    if (skill.dotDamage && skill.dotTurns) {
      // DOT_DMG_BONUS (35): amplifica o dano de DoT
      const dotDmg = Math.max(1, Math.round(skill.dotDamage * (1 + (resolved?.dotDmgBonus ?? 0))));
      combat.addEnemyEffect({ type: 'dot', turns: skill.dotTurns, damage: dotDmg });
    }

    if (skill.damagePercent) {
      // SKILL_DMG (31): amplifica o dano de skills (soma com passiva dmg)
      const skillDmgBonus = (resolved?.skillDmg ?? 0) + getPassiveTotals().dmgBonus;
      applyEnemyDamage(getPlayerDamage(skill.damagePercent, 1 + skillDmgBonus, true));
    }

    if (skill.stunTurns) {
      // CONTROL_DURATION (37): amplifica a duração de stun
      const turns = Math.max(1, Math.round(skill.stunTurns * (1 + (resolved?.controlDuration ?? 0))));
      combat.addEnemyEffect({ type: 'stun', turns });
    }

    if (skill.slowTurns) {
      // CONTROL_DURATION (37): amplifica a duração de slow
      const turns = Math.max(1, Math.round(skill.slowTurns * (1 + (resolved?.controlDuration ?? 0))));
      combat.addEnemyEffect({ type: 'slow', turns });
    }

    if (skill.reflectPercent && skill.reflectTurns) {
      // REFLECT_BONUS (39): amplifica o reflexo
      const reflect = Math.min(1, skill.reflectPercent / 100 * (1 + (resolved?.reflectBonus ?? 0)));
      combat.addEnemyEffect({ type: 'reflect', turns: skill.reflectTurns, damage: reflect });
    }

    if (skill.executeBelowHpPercent) {
      // EXECUTE_THRESHOLD (38): aumenta o limiar de execução (cap 50%)
      const threshold = Math.min(50, skill.executeBelowHpPercent * (1 + (resolved?.executeThreshold ?? 0)));
      const enemyHp = useCombatStore.getState().enemyHp;
      const enemyMaxHp = useCombatStore.getState().enemyMaxHp;
      const isExecutable = enemyHp > 0 && enemyHp <= enemyMaxHp * (threshold / 100);

      if (isExecutable) {
        applyEnemyDamage(999999);
        useCombatStore.getState().addLog('execute', t('combat.log.execute'));
      }
    }

    combat.addLog('skill', t(`skills.${skillId}.name`));

    if (useCombatStore.getState().enemyHp <= 0) {
      handleVictory();
      return;
    }

    afterPlayerAction();
  },

  flee() {
    const player = usePlayerStore.getState().data;
    const chance = 0.6 + (player?.stats.agility ?? 0) * 0.005;

    if (Math.random() <= chance) {
      useCombatStore.getState().addLog('flee', t('combat.fled'));
      useCombatStore.getState().resetCombat();
      return true;
    }

    useCombatStore.getState().addLog('flee_failed', t('combat.log.missed'));
    this.enemyTurn();
    return false;
  },

  enemyTurn() {
    const combat = useCombatStore.getState();
    const enemy = combat.enemy;

    if (!enemy) {
      return;
    }

    applyDotEffects();

    if (useCombatStore.getState().enemyHp <= 0) {
      handleVictory();
      return;
    }

    // Inimigo atordoado (stun de skills ou ON_HIT_FREEZE/ON_HIT_STUN):
    // perde o turno.
    const isStunned = combat.enemyEffects.some((effect) => effect.type === 'stun');

    if (isStunned) {
      combat.addLog('enemy', getEffectName(EFFECT.STUN, getLang()));
      endEnemyTurn();
      return;
    }

    const hpPercent = (combat.enemyHp / Math.max(1, combat.enemyMaxHp)) * 100;
    let bossBoost = 1;

    if (combat.isBoss && enemy.mechanics?.phaseTriggers[0] && hpPercent <= enemy.mechanics.phaseTriggers[0]) {
      bossBoost = enemy.mechanics.atkBoosts[0] ?? bossBoost;
      useCombatStore.setState({ phase2Triggered: true });
    }

    if (combat.isBoss && enemy.mechanics?.phaseTriggers[1] && hpPercent <= enemy.mechanics.phaseTriggers[1]) {
      bossBoost = enemy.mechanics.atkBoosts[1] ?? bossBoost;
      useCombatStore.setState({ phase3Triggered: true });
    }

    if (combat.isBoss && enemy.mechanics?.enrage && hpPercent <= 20) {
      bossBoost = Math.max(bossBoost, enemy.mechanics.atkBoosts[enemy.mechanics.atkBoosts.length - 1] ?? bossBoost);
      useCombatStore.setState({ enraged: true });
    }

    const resolved = getResolvedEffects();
    const player = usePlayerStore.getState().data;

    // ── Esquiva: base por AGI; ON_DODGE_ATK (74) contra-ataca ao esquivar ──
    const dodgeChance = 0.03 + (player?.stats.agility ?? 0) * 0.002;

    if (Math.random() < dodgeChance) {
      combat.addLog('defend', t('combat.log.missed'));

      if (resolved) {
        const onDodgeAtk = getConditionalValue(resolved, EFFECT.ON_DODGE_ATK);

        if (onDodgeAtk > 0) {
          const counter = Math.max(1, Math.floor(usePlayerStore.getState().getTotalAtk() * onDodgeAtk));
          applyEnemyDamage(counter);
          combat.addLog('parry', `${getEffectName(EFFECT.ON_DODGE_ATK, getLang())} ${counter}`);
        }
      }

      if (useCombatStore.getState().enemyHp <= 0) {
        handleVictory();
        return;
      }

      endEnemyTurn();
      return;
    }

    const isStrongBossAttack = combat.isBoss && combat.turn % 3 === 0;
    let damage = enemy.atk * bossBoost * (isStrongBossAttack ? 1.5 : 1);

    if (combat.isDefending && isStrongBossAttack && Math.random() < 0.3) {
      damage *= 0.2;
      applyEnemyDamage(getPlayerDamage(150));
      combat.addLog('parry', t('combat.log.defended'));
    } else if (combat.isDefending) {
      damage *= 0.5;

      // ON_BLOCK_COUNTER (73): ao bloquear, chance de contra-atacar com % do ATK
      if (resolved) {
        const onBlockCounter = getConditionalValue(resolved, EFFECT.ON_BLOCK_COUNTER);

        if (onBlockCounter > 0 && Math.random() < 0.4) {
          const counter = Math.max(1, Math.floor(usePlayerStore.getState().getTotalAtk() * onBlockCounter));
          applyEnemyDamage(counter);
          combat.addLog('parry', `${getEffectName(EFFECT.ON_BLOCK_COUNTER, getLang())} ${counter}`);
        }
      }
    }

    if (useCombatStore.getState().enemyHp <= 0) {
      handleVictory();
      return;
    }

    damage = Math.max(1, Math.floor(damage / impulseSystem.getBonus('defense')));

    // ── Effects defensivos do equipamento ──
    if (resolved) {
      // Inimigo com slow (47/66) causa 10% menos dano
      if (combat.enemyEffects.some((effect) => effect.type === 'slow')) {
        damage *= 0.9;
      }

      // DEF_BONUS (25) e ON_LOW_HP_DEF (70, com HP < 20%) — frações 0-1
      let defBonus = resolved.defBonus;

      if (isPlayerLowHp()) {
        defBonus += getConditionalValue(resolved, EFFECT.ON_LOW_HP_DEF);
      }

      // Aura coletiva de defesa da caçada de party
      const activeSession = huntSession();

      if (activeSession && huntRegionMatches() && activeSession.auraDef > 0) {
        defBonus += activeSession.auraDef;
      }

      if (defBonus > 0) {
        damage /= 1 + defBonus;
      }

      damage = Math.max(1, Math.floor(damage));

      // REFLECT (56): reflete parte do dano de volta ao inimigo (fração 0-1)
      const reflect = getConditionalValue(resolved, EFFECT.REFLECT);

      if (reflect > 0) {
        const reflected = Math.floor(damage * reflect);

        if (reflected > 0) {
          applyEnemyDamage(reflected);
          combat.addLog('parry', `${getEffectName(EFFECT.REFLECT, getLang())} ${reflected}`);
        }
      }

      // SHIELD (57): escudo absorve dano (pool de HP)
      const currentShieldPool = useCombatStore.getState().shieldPool;
      const shieldAbsorb = Math.min(currentShieldPool, damage);

      if (shieldAbsorb > 0) {
        useCombatStore.setState({ shieldPool: currentShieldPool - shieldAbsorb });
        damage -= shieldAbsorb;
        combat.addLog('defend', `${getEffectName(EFFECT.SHIELD, getLang())} ${shieldAbsorb}`);
      }

      // BARRIER (58): barreira mágica absorve o restante (pool de MP)
      const currentBarrierPool = useCombatStore.getState().barrierPool;
      const barrierAbsorb = Math.min(currentBarrierPool, damage);

      if (barrierAbsorb > 0) {
        useCombatStore.setState({ barrierPool: currentBarrierPool - barrierAbsorb });
        damage -= barrierAbsorb;
        combat.addLog('defend', `${getEffectName(EFFECT.BARRIER, getLang())} ${barrierAbsorb}`);
      }
    }

    damage = Math.max(0, Math.floor(damage));

    if (damage > 0) {
      damagePartyOrPlayer(damage);
      usePetStore.getState().petTakeDmg(Math.floor(damage * 0.25));
      combat.addLog('enemy', `${t('combat.log.playerTook').replace('{damage}', String(damage))}`);
    }

    if (isDefeated()) {
      handleDefeat();
      return;
    }

    // REGENERATE (55): regenera HP por turno (valor flat)
    if (resolved) {
      const regen = getConditionalValue(resolved, EFFECT.REGENERATE);

      if (regen > 0) {
        healPlayerFlat(regen);
      }
    }

    endEnemyTurn();
  },

  autoAction() {
    const combat = useCombatStore.getState();
    const player = usePlayerStore.getState().data;

    if (!combat.active || !player || usePlayerStore.getState().isInvFull() || usePlayerStore.getState().isDead()) {
      return;
    }

    const usableSkillIds = usePlayerStore.getState().getUsableSkillIds();
    const availableSkill = skills
      .filter((skill) => usableSkillIds.includes(skill.id))
      .filter((skill) => player.mp >= skill.mp && !combat.skillCooldowns[skill.id])
      .filter(() => player.mp >= combat.autoConfig.mpThreshold)
      .sort((a, b) => (b.damagePercent ?? 0) - (a.damagePercent ?? 0))[0];

    if (availableSkill) {
      this.skill(availableSkill.id);
      return;
    }

    this.attack();
  }
};

export const start = combatEngine.start.bind(combatEngine);
export const attack = combatEngine.attack.bind(combatEngine);
export const defend = combatEngine.defend.bind(combatEngine);
export const useSkill = combatEngine.skill.bind(combatEngine);
export const flee = combatEngine.flee.bind(combatEngine);
