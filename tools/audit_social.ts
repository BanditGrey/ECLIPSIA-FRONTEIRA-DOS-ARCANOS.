/* AUDITORIA SOCIAL/HUNT — valida a camada social e a caçada de party */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { dungeons } from '../client/src/data/dungeons';
import { regions } from '../client/src/data/regions';
import { bosses } from '../client/src/data/bosses';
import { translations } from '../client/src/i18n';
import {
  MAX_TURN_DAMAGE,
  SIZE_BONUS_PER_MEMBER,
  clampReportNumber,
  computeSizeBonus,
  computeTeamworkXp
} from '../server/src/utils/partyHuntRules.js';

const ROOT = path.resolve(__dirname, '..');
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8');

type Status = 'OK' | 'PARTIAL' | 'MISSING' | 'CRITICAL';
const results: Array<{ block: string; item: string; status: Status; note?: string }> = [];
const rec = (block: string, item: string, status: Status, note?: string) => results.push({ block, item, status, note });

// ── Regras puras da caçada ──
rec('regras', 'clampReportNumber bloqueia abusos', clampReportNumber(-1) === 0 && clampReportNumber(1e9) === MAX_TURN_DAMAGE ? 'OK' : 'CRITICAL');
rec('regras', 'computeSizeBonus 5 membros = +50/+25/+15', JSON.stringify(computeSizeBonus(5)) === JSON.stringify({ xp: 50, gold: 25, loot: 15 }) ? 'OK' : 'CRITICAL');
rec('regras', 'computeTeamworkXp divide entre membros', computeTeamworkXp(10, 2) === 40 && computeTeamworkXp(-5, 2) === 0 ? 'OK' : 'CRITICAL');
rec('regras', 'SIZE_BONUS_PER_MEMBER coerente', SIZE_BONUS_PER_MEMBER.xp > SIZE_BONUS_PER_MEMBER.gold && SIZE_BONUS_PER_MEMBER.gold > SIZE_BONUS_PER_MEMBER.loot ? 'OK' : 'CRITICAL');

// ── Servidor: handlers e integração ──
const serverSrc = read('server/src/server.js');
const handlers = ['party_combat:start', 'party_combat:join', 'party_combat:turn', 'party_combat:floor', 'party_combat:end', 'party_combat:leave', 'chat:whisper', 'chat:party', 'party:invite', 'party:respond', 'party:kick'];
const missingHandlers = handlers.filter((h) => !serverSrc.includes(`socket.on('${h}'`));

// presença é broadcast (emit), não listener
if (!serverSrc.includes("emit('chat:presence'")) {
  missingHandlers.push('chat:presence (emit)');
}
rec('server', 'Handlers socket sociais/hunt presentes', missingHandlers.length === 0 ? 'OK' : 'CRITICAL', missingHandlers.length ? `faltando: ${missingHandlers.join(', ')}` : undefined);
rec('server', 'server.js usa partyHuntRules (funções puras)', serverSrc.includes("from './utils/partyHuntRules.js'") && !serverSrc.includes('const SIZE_BONUS_PER_MEMBER') ? 'OK' : 'PARTIAL');
rec('server', 'Throttles anti-spam (chat/whisper/party/guild)', (serverSrc.match(/\.length >= 5/g) ?? []).length >= 3 ? 'OK' : 'PARTIAL');
const marketSrc = read('server/src/routes/market.routes.js');
rec('server', 'Mercado opera em crystals (não ouro)', marketSrc.includes('crystals') && !/buyer\.gold\s*[<>]/.test(marketSrc) ? 'OK' : 'CRITICAL');
const guildSrc = read('server/src/routes/guild.routes.js');
rec('server', 'Guildas: endpoints principais', ['create', 'join', 'leave', 'kick', 'promote', 'motd', 'disband'].every((e) => guildSrc.includes(`/${e}`)) ? 'OK' : 'MISSING');
const mailSrc = read('server/src/routes/mail.routes.js');
rec('server', 'Mail suporta itemStr + ouro + crystals', mailSrc.includes('itemStr') && mailSrc.includes('crystals') ? 'OK' : 'MISSING');
rec('server', 'Concessão de crystals protegida por ADMIN_KEY', read('server/src/routes/player.routes.js').includes('ADMIN_KEY') ? 'OK' : 'MISSING');

// ── Client: caçada ──
const storeSrc = read('client/src/store/usePartyCombatStore.ts');
rec('client', 'Store da caçada com floor/sizeBonus/auras', ['floor', 'sizeBonus', 'auraAtk', 'auraDef', 'members'].every((k) => storeSrc.includes(k)) ? 'OK' : 'MISSING');
const layoutSrc = read('client/src/components/layout/GameLayout.tsx');
rec('client', 'PartyCombatBridge montado no GameLayout', layoutSrc.includes('PartyCombatBridge') && layoutSrc.includes('joinPartyHunt') ? 'OK' : 'MISSING');
const combatSrc = read('client/src/systems/combat.ts');
rec('client', 'Combat reporta turnos e andares', combatSrc.includes('reportHuntRound') && combatSrc.includes('reportPartyFloor') ? 'OK' : 'MISSING');
rec('client', 'Auras e sizeBonus aplicados com gate de região', combatSrc.includes('huntRegionMatches') && combatSrc.includes('sizeBonus?.xp') ? 'OK' : 'MISSING');
const socketSrc = read('client/src/services/socket.ts');
const socketMethods = ['startPartyHunt', 'joinPartyHunt', 'reportPartyTurn', 'reportPartyFloor', 'endPartyHunt', 'leavePartyHunt', 'sendWhisper', 'sendPartyMessage', 'inviteToParty', 'respondPartyInvite'];
const missingMethods = socketMethods.filter((m) => !socketSrc.includes(`${m}(`));
rec('client', 'socketService com métodos sociais/hunt', missingMethods.length === 0 ? 'OK' : 'CRITICAL', missingMethods.length ? `faltando: ${missingMethods.join(', ')}` : undefined);
const partyPanelSrc = read('client/src/components/panels/PartyPanel.tsx');
rec('client', 'PartyPanel: iniciar caçada/dungeon + encerrar + entrar no andar', ['startPartyHunt', 'startDungeon', 'endPartyHunt', 'enterHuntDungeon'].every((k) => partyPanelSrc.includes(k)) ? 'OK' : 'MISSING');
const combatPanelSrc = read('client/src/components/panels/CombatPanel.tsx');
rec('client', 'CombatPanel mostra sessão (contribuições/auras/andar)', ['huntSession', 'sizeBonus', 'auraAtk'].every((k) => combatPanelSrc.includes(k)) ? 'OK' : 'MISSING');
const chatSrc = read('client/src/components/panels/ChatPanel.tsx');
rec('client', 'Chat: comandos sociais', ['/convite', '/w', '/r', '/p', '/help'].every((c) => chatSrc.includes(`'${c}'`)) ? 'OK' : 'MISSING');
rec('client', 'Chat: tipos de mensagem (party/whisper/invite)', ['whisper-in', 'whisper-out', 'invite', 'party'].every((k) => chatSrc.includes(`'${k}'`)) ? 'OK' : 'MISSING');

// ── Dados: dungeons coerentes ──
let dungeonDataOk = true;
const dungeonNotes: string[] = [];
for (const dungeon of dungeons) {
  if (!regions.some((r) => r.id === dungeon.regionId)) { dungeonDataOk = false; dungeonNotes.push(`${dungeon.id}: região inválida`); }
  if (!bosses.some((b) => b.id === dungeon.bossId)) { dungeonDataOk = false; dungeonNotes.push(`${dungeon.id}: boss inválido`); }
}
rec('dados', 'Dungeons com região e boss válidos', dungeonDataOk ? 'OK' : 'CRITICAL', dungeonNotes.join('; ') || undefined);

// ── i18n social (4 idiomas) ──
const langs = ['pt-BR', 'en-US', 'es-ES', 'ja-JP'] as const;
const requiredPartyCombat = ['started', 'ended', 'startHunt', 'startDungeon', 'enterFloor', 'sizeBonusHint', 'waitLeader', 'floor'];
let i18nOk = true;
const i18nMissing: string[] = [];
for (const lang of langs) {
  const tree = (translations[lang] as Record<string, unknown>).partyCombat as Record<string, unknown> | undefined;
  for (const key of requiredPartyCombat) {
    if (!tree || !(key in tree)) { i18nOk = false; i18nMissing.push(`${lang}:partyCombat.${key}`); }
  }
}
rec('i18n', 'partyCombat.* completo nos 4 idiomas', i18nOk ? 'OK' : 'MISSING', i18nMissing.join(', ') || undefined);
let chatI18nOk = true;
const chatMissing: string[] = [];
for (const lang of langs) {
  const tree = (translations[lang] as Record<string, unknown>).chat as Record<string, unknown> | undefined;
  for (const key of ['commandHint', 'whisperFrom', 'inviteCard', 'presenceIn', 'actionWhisper']) {
    if (!tree || !(key in tree)) { chatI18nOk = false; chatMissing.push(`${lang}:chat.${key}`); }
  }
}
rec('i18n', 'chat social completo nos 4 idiomas', chatI18nOk ? 'OK' : 'MISSING', chatMissing.join(', ') || undefined);

// ── Saída ──
console.log(JSON.stringify(results, null, 1));
const count = (s: Status) => results.filter((r) => r.status === s).length;
console.log(`\nRESUMO AUDITORIA SOCIAL: OK=${count('OK')} PARTIAL=${count('PARTIAL')} MISSING=${count('MISSING')} CRITICAL=${count('CRITICAL')} TOTAL=${results.length}`);
process.exit(count('CRITICAL') === 0 && count('MISSING') === 0 ? 0 : 1);
