import type { SkillIconName } from '../components/ui/SkillIcon';

/**
 * Converte um skillId (string do sistema) para o nome do ícone SVG apropriado.
 * Faz matching por keywords no id (ex: "fireball", "slash", "heal").
 */
export function skillIconFor(skillId: string): SkillIconName {
  const id = skillId.toLowerCase();

  if (/slash|cleave|strike|swing|rend/.test(id)) return 'slash';
  if (/pierce|stab|thrust|arrow|shot|bolt.*phys|shoot/.test(id)) return 'pierce';
  if (/smash|bash|crush|slam|quake|stomp|sunder/.test(id)) return 'smash';
  if (/whirl|spin|aoe_phys|cleave_/.test(id)) return 'whirlwind';
  if (/backstab|ambush|sneak/.test(id)) return 'backstab';

  if (/fire|flame|burn|inferno|blaze/.test(id)) return 'fireball';
  if (/ice|frost|freeze|cold|blizzard/.test(id)) return 'ice_shard';
  if (/lightning|thunder|storm|shock|volt|chain/.test(id)) return 'lightning';
  if (/shadow|dark|bolt_magic|void|curse|abyss/.test(id)) return 'shadow_bolt';
  if (/nature|earth|root|vine|thorn|entangle/.test(id)) return 'nature';

  if (/heal|mend|restore|cure|regenerate|recover/.test(id)) return 'heal';
  if (/shield|barrier|ward|protect|defense/.test(id)) return 'barrier';
  if (/war.?cry|battle.?cry|attack_?buff|berserk|rage|fury|empower/.test(id)) return 'buff_atk';
  if (/iron.?skin|def.?buff|fortify|bulwark/.test(id)) return 'buff_def';
  if (/haste|speed|swift|dash|quick/.test(id)) return 'buff_speed';

  if (/poison|toxin|venom|sting|envenom/.test(id)) return 'poison';
  if (/bleed|wound|rend_blood/.test(id)) return 'bleed';
  if (/stun|bash_stun|petrify|paralyze/.test(id)) return 'stun';
  if (/slow|chill|frost_bite/.test(id)) return 'slow';
  if (/drain|life.?steal|absorb|siphon/.test(id)) return 'drain';

  if (/summon|conjure|mirror|clone|pet_call/.test(id)) return 'summon';
  if (/teleport|blink|phase/.test(id)) return 'teleport';
  if (/stealth|hide|invisi/.test(id)) return 'stealth';
  if (/roar|shout|battle_cry|war_cry|scream/.test(id)) return 'roar';
  if (/howl|wolf/.test(id)) return 'howl';

  return 'skill_generic';
}
