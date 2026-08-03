import { bosses } from '../data/bosses';
import { translations } from '../i18n';
import { monsters } from '../data/monsters';
import { regions } from '../data/regions';
import { skills } from '../data/skills';
import { useCombatStore } from '../store/useCombatStore';
import { useGameStore } from '../store/useGameStore';
import { usePartyStore } from '../store/usePartyStore';
import { usePetStore } from '../store/usePetStore';
import { usePlayerStore } from '../store/usePlayerStore';
import type { Enemy, LootEntry } from '../types/combat.types';
import type { PartyMember } from '../types/party.types';
import { hiddenEventsSystem } from './hiddenEvents';
import { impulseSystem } from './impulse';
import { rollLoot } from './loot';
import { questSystem } from './quests';

export interface CombatStartOptions {
  dungeon?: boolean;
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

const getCritMultiplier = () => {
  const player = usePlayerStore.getState().data;
  const perception = player?.stats.perception ?? 0;
  const chance = 0.05 + perception * 0.002;

  return Math.random() < chance ? 2 : 1;
};

const getPlayerDamage = (percent = 100) => {
  const playerStore = usePlayerStore.getState();
  const combat = useCombatStore.getState();
  const base = playerStore.getTotalAtk() * (percent / 100) * impulseSystem.getBonus('damage');
  const crit = getCritMultiplier();
  const defenseReduction = Math.max(0, combat.enemy?.def ?? 0) * 0.35;

  return Math.max(1, Math.floor(base * crit - defenseReduction));
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
  const enemyHp = Math.max(0, combat.enemyHp - amount);

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

  const vanguards = alive.filter((member) => member.archetype === 'vanguard');

  if (vanguards.length > 0 && Math.random() < 0.6) {
    return pickRandom(vanguards);
  }

  return pickRandom(alive);
};

const damagePartyOrPlayer = (damage: number) => {
  const party = usePartyStore.getState();
  const target = selectPartyTarget();

  if (!target) {
    usePlayerStore.getState().takeDamage(damage);
    return;
  }

  party.takeDamage(target.id, damage);

  if (target.id === party.activeId) {
    usePlayerStore.getState().takeDamage(damage);
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
  const combat = useCombatStore.getState();
  const playerStore = usePlayerStore.getState();
  const partyStore = usePartyStore.getState();
  const enemy = combat.enemy;

  if (!enemy) {
    return;
  }

  const xpMultiplier = partyStore.getXpMultiplier();
  const xp = Math.floor(enemy.xp * xpMultiplier * impulseSystem.getBonus('xp'));
  const gold = Math.floor(enemy.gold * impulseSystem.getBonus('gold'));

  playerStore.gainXp(xp);
  playerStore.gainGold(gold);
  playerStore.addKill(enemy.id);
  questSystem.onKill(enemy.id);

  const loot = rollLoot(enemy, playerStore.getLuck(), combat.autoConfig.lootFilter);
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
        floor: nextFloor,
        maxFloor: combat.maxFloor
      });
    } else if (!combat.autoConfig.stopBoss) {
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
    const enemy = options.bossId
      ? createEnemyFromBoss(options.bossId)
      : createEnemyFromMonster(options.enemyId ?? getRegionMonsterId(region));

    useCombatStore.setState({
      active: true,
      phase: 'player',
      turn: 1,
      region,
      floor: options.floor ?? 1,
      maxFloor: options.maxFloor ?? 1,
      isDungeon: Boolean(options.dungeon),
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
    const damage = getPlayerDamage(100);
    const hp = applyEnemyDamage(damage);

    useCombatStore.getState().addLog('attack', `${t('combat.attack')} ${damage}`);

    if (hp <= 0) {
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

    if (!skill || !player || player.mp < skill.mp || combat.skillCooldowns[skillId]) {
      this.attack();
      return;
    }

    reducePlayerMp(skill.mp);
    combat.setCooldown(skillId, skill.cd);

    if (skill.healPercent) {
      usePlayerStore.getState().recoverHp(skill.healPercent);
    }

    if (skill.dotDamage && skill.dotTurns) {
      combat.addEnemyEffect({ type: 'dot', turns: skill.dotTurns, damage: skill.dotDamage });
    }

    if (skill.damagePercent) {
      applyEnemyDamage(getPlayerDamage(skill.damagePercent));
    }

    if (skill.stunTurns) {
      combat.addEnemyEffect({ type: 'stun', turns: skill.stunTurns });
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

    const isStrongBossAttack = combat.isBoss && combat.turn % 3 === 0;
    let damage = enemy.atk * bossBoost * (isStrongBossAttack ? 1.5 : 1);

    if (combat.isDefending && isStrongBossAttack && Math.random() < 0.3) {
      damage *= 0.2;
      applyEnemyDamage(getPlayerDamage(150));
      combat.addLog('parry', t('combat.log.defended'));
    } else if (combat.isDefending) {
      damage *= 0.5;
    }

    damage = Math.max(1, Math.floor(damage / impulseSystem.getBonus('defense')));
    damagePartyOrPlayer(damage);
    usePetStore.getState().petTakeDmg(Math.floor(damage * 0.25));
    combat.addLog('enemy', `${t('combat.log.playerTook').replace('{damage}', String(damage))}`);

    if (isDefeated()) {
      handleDefeat();
      return;
    }

    usePetStore.getState().tickCooldown();
    combat.tickCooldowns();
    useCombatStore.setState({
      turn: combat.turn + 1,
      phase: 'player',
      isDefending: false
    });

    if (useCombatStore.getState().autoFight) {
      this.autoAction();
    }
  },

  autoAction() {
    const combat = useCombatStore.getState();
    const player = usePlayerStore.getState().data;

    if (!combat.active || !player || usePlayerStore.getState().isInvFull() || usePlayerStore.getState().isDead()) {
      return;
    }

    const availableSkill = skills
      .filter((skill) => player.skills.includes(skill.id))
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
