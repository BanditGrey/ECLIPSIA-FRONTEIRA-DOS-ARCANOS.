import type { LangCode } from './index';

export type WikiSectionKey =
  | 'quick'
  | 'character'
  | 'combat'
  | 'party'
  | 'world'
  | 'monsters'
  | 'items'
  | 'luck'
  | 'impulse'
  | 'progression'
  | 'crafting'
  | 'guilds'
  | 'faq';

export interface WikiBlock {
  title: string;
  items: string[];
}

export interface WikiFaqItem {
  q: string;
  a: string;
}

export const wikiSectionOrder: WikiSectionKey[] = [
  'quick',
  'character',
  'combat',
  'party',
  'world',
  'monsters',
  'items',
  'luck',
  'impulse',
  'progression',
  'crafting',
  'guilds',
  'faq'
];

export const wikiTranslations = {
  "pt-BR": {
    "ui": {
      "title": "Wiki de Eclipsia",
      "subtitle": "Guia integrado da Fronteira dos Arcanos",
      "open": "Wiki",
      "back": "Voltar",
      "sections": "Seções",
      "level": "Lv",
      "xp": "XP",
      "chance": "Chance",
      "requirement": "Requisito",
      "weakness": "Fraqueza",
      "reward": "Recompensa",
      "comingSoon": "Em breve",
      "hp": "HP",
      "mp": "MP",
      "cd": "CD"
    },
    "nav": {
      "quick": "🚀 Início rápido",
      "character": "🧬 Personagem",
      "combat": "⚔ Combate",
      "party": "👥 Party",
      "world": "🗺 Mundo",
      "monsters": "👹 Monstros",
      "items": "🎒 Itens e equipamentos",
      "luck": "🍀 Sistema de Sorte",
      "impulse": "⚡ Impulso Arcano",
      "progression": "🏆 Progressão",
      "crafting": "🔧 Crafting",
      "guilds": "👥 Guildas",
      "faq": "❓ FAQ"
    },
    "quick": {
      "title": "🚀 Início rápido",
      "blocks": [
        {
          "title": "Como criar sua conta",
          "items": [
            "Escolha criar conta na tela inicial, informe usuário, email e senha.",
            "Após registrar, o jogo salva seu token e leva você à criação de personagem."
          ]
        },
        {
          "title": "Como criar seu personagem",
          "items": [
            "Escolha um nome de 3 a 20 caracteres.",
            "Selecione um dos 6 arquétipos conforme seu estilo de jogo."
          ]
        },
        {
          "title": "Como combater",
          "items": [
            "Viaje para uma região desbloqueada e inicie uma caça.",
            "Use atacar, defender, skills ou fugir. HP e MP recuperam entre combates."
          ]
        },
        {
          "title": "Primeiros passos recomendados",
          "items": [
            "Comece em Valedouro, complete quests simples e equipe os primeiros drops.",
            "Converse na taverna para aprender rumores sem spoilers diretos."
          ]
        },
        {
          "title": "Como formar uma party",
          "items": [
            "No seletor de personagens, ative gerenciar party.",
            "Personagens precisam de nível 10 para entrar na party."
          ]
        }
      ]
    },
    "character": {
      "title": "🧬 Personagem",
      "blocks": [
        {
          "title": "Arquétipos",
          "items": [
            "⚔ Lâmina: força e agilidade, dano físico rápido.",
            "🔮 Arcano: arcana e vontade, alto MP e magia.",
            "🌿 Druida: suporte equilibrado, cura e controle.",
            "🛡 Vanguarda: vitalidade alta, defesa e aggro.",
            "🏹 Atirador: agilidade e percepção, alcance e mobilidade.",
            "🗡 Espectro: furtividade, veneno e golpes críticos."
          ]
        },
        {
          "title": "Atributos",
          "items": [
            "Força aumenta dano físico.",
            "Agilidade melhora fuga, velocidade e evasão.",
            "Vitalidade aumenta defesa e resistência.",
            "Arcana melhora dano mágico e efeitos.",
            "Percepção aumenta crítico e descobertas.",
            "Vontade melhora MP, resistência mental e cura."
          ]
        },
        {
          "title": "Pontos e proficiências",
          "items": [
            "Pontos livres podem ser distribuídos no perfil.",
            "Proficiências evoluem com o uso do arquétipo e habilidades relacionadas."
          ]
        },
        {
          "title": "Sorte",
          "items": [
            "Sorte vem de base, equipamento, títulos, impulso e eventos.",
            "O teto máximo é 200 e ela nunca é comprada diretamente."
          ]
        }
      ]
    },
    "combat": {
      "title": "⚔ Combate",
      "blocks": [
        {
          "title": "Turnos",
          "items": [
            "O jogador age, o pet age automaticamente e então o inimigo ataca.",
            "A vitória concede XP, ouro, loot e recuperação parcial."
          ]
        },
        {
          "title": "Ações",
          "items": [
            "Atacar causa dano básico.",
            "Defender reduz 50% do próximo dano.",
            "Parry pode ocorrer ao defender ataque forte de boss: 30% de chance, bloqueia 80% e contra-ataca.",
            "Fugir tem 60% + agilidade×0,5% de chance."
          ]
        },
        {
          "title": "Skills e status",
          "items": [
            "Cada arquétipo tem skills próprias com MP e cooldown.",
            "Burn, freeze, bleed, paralyze, regenerate, mana_drain e all_boost vêm de efeitos e pedras espirituais."
          ]
        },
        {
          "title": "Automação",
          "items": [
            "Combate Auto usa a melhor ação disponível e ataca se não puder usar skill.",
            "Avanço Auto liga Combate Auto e para por boss, evento raro, inventário cheio ou morte."
          ]
        },
        {
          "title": "Crítico e bosses",
          "items": [
            "Crítico base é 5% + percepção×0,2%, com multiplicador de 200%.",
            "Bosses têm fases, pontos fracos e ataques fortes que incentivam defender no momento certo."
          ]
        }
      ]
    },
    "party": {
      "title": "👥 Party",
      "blocks": [
        {
          "title": "Como montar",
          "items": [
            "Adicione personagens no seletor de personagens.",
            "O nível mínimo para entrar é 10.",
            "O grupo máximo tem 5 membros."
          ]
        },
        {
          "title": "Cross campanha",
          "items": [
            "Cada personagem precisa ter chegado na mesma região para participar.",
            "Completar conteúdo em party desbloqueia avanço solo para os vivos."
          ]
        },
        {
          "title": "XP e aggro",
          "items": [
            "Solo: 100%; 2 membros: 80%; 3: 70%; 4: 60%; 5: 55% para cada.",
            "Vanguarda tem maior chance de receber ataques e tankar a party.",
            "Loot é individual por membro."
          ]
        }
      ]
    },
    "world": {
      "title": "🗺 Mundo",
      "blocks": [
        {
          "title": "Regiões",
          "items": [
            "Valedouro: início livre.",
            "Nythera: requer nível 10.",
            "Ormara: requer nível 20.",
            "Costa Abissal: requer título de névoa.",
            "Céu Partido: requer nível 55.",
            "Fragmento: secreto, ligado ao eclipse."
          ]
        },
        {
          "title": "Exploração e dungeons",
          "items": [
            "Explorar pode gerar material, ouro, XP, emboscada, evento raro ou descoberta secreta.",
            "Montarias reduzem o tempo de exploração.",
            "Dungeons têm andares, chefes e tentativas ilimitadas."
          ]
        },
        {
          "title": "Eventos ocultos — dicas",
          "items": [
            "Morrer repetidamente no mesmo local pode revelar algo.",
            "Explorar muito uma região pode atrair atenção.",
            "NPCs na taverna sabem mais do que parecem."
          ]
        }
      ]
    },
    "monsters": {
      "title": "👹 Monstros",
      "blocks": [
        {
          "title": "Tabela por região",
          "items": [
            "Valedouro: ratos, goblins e lobos jovens; fracos contra dano direto.",
            "Nythera: lobos da névoa, sprites sombrios e golems; fogo e arcano ajudam.",
            "Ormara: escorpiões e miragens; gelo e precisão ajudam.",
            "Abissal: espectros marinhos e leviatãs; raio e resistência importam.",
            "Céu Partido: harpias e titãs; ataques perfurantes e controle são úteis."
          ]
        },
        {
          "title": "Loot, mini-bosses e colossos",
          "items": [
            "Loot usa a tabela do inimigo e é melhorado por Sorte.",
            "Mini-bosses guardam avanço regional e mecânicas de fase.",
            "Colossos Arcanos exigem pistas vagas, rumores e exploração persistente."
          ]
        }
      ]
    },
    "items": {
      "title": "🎒 Itens e equipamentos",
      "blocks": [
        {
          "title": "Slots",
          "items": [
            "15 slots: arma principal, off-hand, cabeça, peito, pernas, luvas, botas, brinco, colar, cinto, resistência, amuleto, pedra espiritual, pet e montaria."
          ]
        },
        {
          "title": "Duas mãos e raridade",
          "items": [
            "Armas de duas mãos dão bônus de dano, mas bloqueiam off-hand.",
            "Raridades: comum, incomum, raro, épico, lendário e relíquia."
          ]
        },
        {
          "title": "Pedras, pets e montarias",
          "items": [
            "Pedras espirituais aplicam fogo, gelo, raio, natureza, sombra, arcano ou puro.",
            "Pets podem atacar, curar, tankar, detectar eventos ou melhorar loot, XP e sorte.",
            "Montarias reduzem tempo de exploração e podem conceder stats passivos."
          ]
        }
      ]
    },
    "luck": {
      "title": "🍀 Sistema de Sorte",
      "blocks": [
        {
          "title": "O que é",
          "items": [
            "Sorte altera chances de raridade de loot e ajuda eventos de descoberta.",
            "Fontes: atributo base, equipamentos, títulos, impulso e eventos.",
            "Teto máximo: 200."
          ]
        },
        {
          "title": "O que sorte nunca faz",
          "items": [
            "Nunca é vendida diretamente.",
            "Nunca substitui habilidade, progressão ou estratégia.",
            "Nunca transforma cosméticos em poder."
          ]
        }
      ],
      "table": [
        {
          "luck": "0",
          "common": "60%",
          "uncommon": "25%",
          "rare": "10%",
          "epic": "4%",
          "legendary": "0,9%",
          "relic": "0,1%"
        },
        {
          "luck": "200",
          "common": "27%",
          "uncommon": "26%",
          "rare": "23%",
          "epic": "17%",
          "legendary": "6%",
          "relic": "1%"
        }
      ]
    },
    "impulse": {
      "title": "⚡ Impulso Arcano",
      "blocks": [
        {
          "title": "Como funciona",
          "items": [
            "Ao voltar ao jogo, cada hora offline gera 1 carga, máximo 5.",
            "Cada combate vencido consome 1 carga."
          ]
        },
        {
          "title": "Bônus",
          "items": [
            "1 carga: +10% XP.",
            "2 cargas: +10% XP e +10% ouro.",
            "3 cargas: bônus anteriores e +10% dano.",
            "4 cargas: bônus anteriores e +10% defesa.",
            "5 cargas: bônus anteriores e +5 sorte."
          ]
        },
        {
          "title": "Estratégia",
          "items": [
            "Use cargas em sessões de caça, dungeons ou quando buscar drops raros."
          ]
        }
      ]
    },
    "progression": {
      "title": "🏆 Progressão",
      "blocks": [
        {
          "title": "XP e nível",
          "items": [
            "O nível sobe ao atingir XP suficiente. A tabela mostra valores até lv 100."
          ]
        },
        {
          "title": "Títulos",
          "items": [
            "wolf_hunter: mate lobos jovens.",
            "veil_tracker: faça descobertas.",
            "child_of_chance: obtenha drop raro.",
            "core_breaker: acerte pontos fracos.",
            "mist_bearer: sobreviva em Nythera.",
            "colossus_challenger: desafie um colosso.",
            "eclipse_awakened: condição secreta."
          ]
        },
        {
          "title": "Ranking global",
          "items": [
            "Ranking compara nível, XP, descobertas e, futuramente, PvP."
          ]
        }
      ]
    },
    "crafting": {
      "title": "🔧 Crafting",
      "blocks": [
        {
          "title": "Em breve",
          "items": [
            "Crafting usará materiais de regiões, bosses e colossos para aprimorar equipamentos."
          ]
        }
      ]
    },
    "guilds": {
      "title": "👥 Guildas",
      "blocks": [
        {
          "title": "Em breve",
          "items": [
            "Guildas trarão objetivos sociais, progresso coletivo e chat dedicado."
          ]
        }
      ]
    },
    "faq": {
      "title": "❓ FAQ",
      "items": [
        {
          "q": "Posso perder itens ao morrer?",
          "a": "Não. Sem punição por morte."
        },
        {
          "q": "Precisa pagar para ser forte?",
          "a": "Não. Sem pay to win. Só cosméticos."
        },
        {
          "q": "Quantos personagens posso ter?",
          "a": "3 grátis, 4º e 5º por conquista ou cosmético."
        },
        {
          "q": "Como entrar na party?",
          "a": "Precisa de nível 10 mínimo."
        },
        {
          "q": "XP cai se ficar em party?",
          "a": "Sim, mas todos evoluem juntos."
        },
        {
          "q": "Como encontrar os Colossos?",
          "a": "Explore o mundo e ouça os rumores da taverna."
        }
      ]
    }
  },
  "en-US": {
    "ui": {
      "title": "Eclipsia Wiki",
      "subtitle": "Integrated guide to the Frontier of the Arcanes",
      "open": "Wiki",
      "back": "Back",
      "sections": "Sections",
      "level": "Lv",
      "xp": "XP",
      "chance": "Chance",
      "requirement": "Requirement",
      "weakness": "Weakness",
      "reward": "Reward",
      "comingSoon": "Coming soon",
      "hp": "HP",
      "mp": "MP",
      "cd": "CD"
    },
    "nav": {
      "quick": "🚀 Quick Start",
      "character": "🧬 Character",
      "combat": "⚔ Combat",
      "party": "👥 Party",
      "world": "🗺 World",
      "monsters": "👹 Monsters",
      "items": "🎒 Items and Equipment",
      "luck": "🍀 Luck System",
      "impulse": "⚡ Arcane Impulse",
      "progression": "🏆 Progression",
      "crafting": "🔧 Crafting",
      "guilds": "👥 Guilds",
      "faq": "❓ FAQ"
    },
    "quick": {
      "title": "🚀 Quick Start",
      "blocks": [
        {
          "title": "How to create your account",
          "items": [
            "Choose create account on the first screen, enter username, email and password.",
            "After registering, the game stores your token and sends you to character creation."
          ]
        },
        {
          "title": "How to create your character",
          "items": [
            "Pick a name from 3 to 20 characters.",
            "Choose one of the 6 archetypes according to your play style."
          ]
        },
        {
          "title": "How to fight",
          "items": [
            "Travel to an unlocked region and start a hunt.",
            "Use attack, defend, skills or flee. HP and MP recover between combats."
          ]
        },
        {
          "title": "Recommended first steps",
          "items": [
            "Start in Valedouro, complete simple quests and equip early drops.",
            "Talk in the tavern to learn rumors without direct spoilers."
          ]
        },
        {
          "title": "How to form a party",
          "items": [
            "In character select, enable manage party.",
            "Characters need level 10 to join a party."
          ]
        }
      ]
    },
    "character": {
      "title": "🧬 Character",
      "blocks": [
        {
          "title": "Archetypes",
          "items": [
            "⚔ Blade: strength and agility, fast physical damage.",
            "🔮 Arcane: arcana and will, high MP and magic.",
            "🌿 Druid: balanced support, healing and control.",
            "🛡 Vanguard: high vitality, defense and aggro.",
            "🏹 Ranger: agility and perception, range and mobility.",
            "🗡 Spectre: stealth, poison and critical strikes."
          ]
        },
        {
          "title": "Attributes",
          "items": [
            "Strength increases physical damage.",
            "Agility improves flee chance, speed and evasion.",
            "Vitality increases defense and endurance.",
            "Arcana improves magic damage and effects.",
            "Perception increases critical chance and discoveries.",
            "Will improves MP, mental resistance and healing."
          ]
        },
        {
          "title": "Points and proficiencies",
          "items": [
            "Free points can be assigned in the profile.",
            "Proficiencies evolve through use of related archetype skills."
          ]
        },
        {
          "title": "Luck",
          "items": [
            "Luck comes from base, equipment, titles, impulse and events.",
            "Maximum cap is 200 and it is never directly purchased."
          ]
        }
      ]
    },
    "combat": {
      "title": "⚔ Combat",
      "blocks": [
        {
          "title": "Turns",
          "items": [
            "The player acts, the pet acts automatically, then the enemy attacks.",
            "Victory grants XP, gold, loot and partial recovery."
          ]
        },
        {
          "title": "Actions",
          "items": [
            "Attack deals basic damage.",
            "Defend reduces the next damage by 50%.",
            "Parry can happen when defending a boss heavy attack: 30% chance, blocks 80% and counterattacks.",
            "Flee has 60% + agility×0.5% chance."
          ]
        },
        {
          "title": "Skills and status",
          "items": [
            "Each archetype has its own skills with MP and cooldown.",
            "Burn, freeze, bleed, paralyze, regenerate, mana_drain and all_boost come from effects and spirit stones."
          ]
        },
        {
          "title": "Automation",
          "items": [
            "Auto Fight uses the best available action and attacks if no skill can be used.",
            "Auto Advance enables Auto Fight and stops for bosses, rare events, full inventory or death."
          ]
        },
        {
          "title": "Critical and bosses",
          "items": [
            "Base critical is 5% + perception×0.2%, with 200% multiplier.",
            "Bosses have phases, weak points and heavy attacks that reward timely defense."
          ]
        }
      ]
    },
    "party": {
      "title": "👥 Party",
      "blocks": [
        {
          "title": "How to build",
          "items": [
            "Add characters in character select.",
            "Minimum level to join is 10.",
            "Maximum group size is 5 members."
          ]
        },
        {
          "title": "Cross campaign",
          "items": [
            "Each character must have reached the same region to join.",
            "Completing content in party unlocks solo progress for living members."
          ]
        },
        {
          "title": "XP and aggro",
          "items": [
            "Solo: 100%; 2 members: 80%; 3: 70%; 4: 60%; 5: 55% each.",
            "Vanguard is more likely to be targeted and tank the party.",
            "Loot is individual for each member."
          ]
        }
      ]
    },
    "world": {
      "title": "🗺 World",
      "blocks": [
        {
          "title": "Regions",
          "items": [
            "Valedouro: open start.",
            "Nythera: requires level 10.",
            "Ormara: requires level 20.",
            "Abyssal Coast: requires mist title.",
            "Split Sky: requires level 55.",
            "Fragment: secret, tied to the eclipse."
          ]
        },
        {
          "title": "Exploration and dungeons",
          "items": [
            "Exploration can yield material, gold, XP, ambush, rare event or secret discovery.",
            "Mounts reduce exploration time.",
            "Dungeons have floors, bosses and unlimited attempts."
          ]
        },
        {
          "title": "Hidden events — hints",
          "items": [
            "Dying repeatedly in the same place may reveal something.",
            "Exploring a region a lot may attract attention.",
            "NPCs in the tavern know more than they seem."
          ]
        }
      ]
    },
    "monsters": {
      "title": "👹 Monsters",
      "blocks": [
        {
          "title": "Regional table",
          "items": [
            "Valedouro: rats, goblins and young wolves; weak to direct damage.",
            "Nythera: mist wolves, shadow sprites and golems; fire and arcane help.",
            "Ormara: scorpions and mirages; ice and precision help.",
            "Abyssal: sea wraiths and leviathans; lightning and resistance matter.",
            "Split Sky: harpies and titans; piercing attacks and control are useful."
          ]
        },
        {
          "title": "Loot, mini-bosses and colossi",
          "items": [
            "Loot uses the enemy table and is improved by Luck.",
            "Mini-bosses guard regional progress and phase mechanics.",
            "Arcane Colossi require vague clues, rumors and persistent exploration."
          ]
        }
      ]
    },
    "items": {
      "title": "🎒 Items and Equipment",
      "blocks": [
        {
          "title": "Slots",
          "items": [
            "15 slots: main weapon, off-hand, head, chest, legs, gloves, boots, earring, necklace, belt, resistance, amulet, spirit stone, pet and mount."
          ]
        },
        {
          "title": "Two-handed and rarity",
          "items": [
            "Two-handed weapons grant damage bonus but block off-hand.",
            "Rarities: common, uncommon, rare, epic, legendary and relic."
          ]
        },
        {
          "title": "Stones, pets and mounts",
          "items": [
            "Spirit stones apply fire, ice, lightning, nature, shadow, arcane or pure.",
            "Pets can attack, heal, tank, detect events or improve loot, XP and luck.",
            "Mounts reduce exploration time and may grant passive stats."
          ]
        }
      ]
    },
    "luck": {
      "title": "🍀 Luck System",
      "blocks": [
        {
          "title": "What it is",
          "items": [
            "Luck changes loot rarity chances and helps discovery events.",
            "Sources: base attribute, equipment, titles, impulse and events.",
            "Maximum cap: 200."
          ]
        },
        {
          "title": "What luck never does",
          "items": [
            "It is never sold directly.",
            "It never replaces skill, progression or strategy.",
            "It never turns cosmetics into power."
          ]
        }
      ],
      "table": [
        {
          "luck": "0",
          "common": "60%",
          "uncommon": "25%",
          "rare": "10%",
          "epic": "4%",
          "legendary": "0,9%",
          "relic": "0,1%"
        },
        {
          "luck": "200",
          "common": "27%",
          "uncommon": "26%",
          "rare": "23%",
          "epic": "17%",
          "legendary": "6%",
          "relic": "1%"
        }
      ]
    },
    "impulse": {
      "title": "⚡ Arcane Impulse",
      "blocks": [
        {
          "title": "How it works",
          "items": [
            "When returning to the game, each offline hour gives 1 charge, max 5.",
            "Each won combat consumes 1 charge."
          ]
        },
        {
          "title": "Bonuses",
          "items": [
            "1 charge: +10% XP.",
            "2 charges: +10% XP and +10% gold.",
            "3 charges: previous bonuses and +10% damage.",
            "4 charges: previous bonuses and +10% defense.",
            "5 charges: previous bonuses and +5 luck."
          ]
        },
        {
          "title": "Strategy",
          "items": [
            "Use charges in hunting sessions, dungeons or while chasing rare drops."
          ]
        }
      ]
    },
    "progression": {
      "title": "🏆 Progression",
      "blocks": [
        {
          "title": "XP and level",
          "items": [
            "Level rises when enough XP is reached. The table shows values up to lv 100."
          ]
        },
        {
          "title": "Titles",
          "items": [
            "wolf_hunter: kill young wolves.",
            "veil_tracker: make discoveries.",
            "child_of_chance: get a rare drop.",
            "core_breaker: hit weak points.",
            "mist_bearer: survive in Nythera.",
            "colossus_challenger: challenge a colossus.",
            "eclipse_awakened: secret condition."
          ]
        },
        {
          "title": "Global ranking",
          "items": [
            "Ranking compares level, XP, discoveries and, later, PvP."
          ]
        }
      ]
    },
    "crafting": {
      "title": "🔧 Crafting",
      "blocks": [
        {
          "title": "Coming soon",
          "items": [
            "Crafting will use region, boss and colossus materials to upgrade equipment."
          ]
        }
      ]
    },
    "guilds": {
      "title": "👥 Guilds",
      "blocks": [
        {
          "title": "Coming soon",
          "items": [
            "Guilds will bring social goals, collective progress and dedicated chat."
          ]
        }
      ]
    },
    "faq": {
      "title": "❓ FAQ",
      "items": [
        {
          "q": "Can I lose items when I die?",
          "a": "No. There is no death penalty."
        },
        {
          "q": "Do I need to pay to be strong?",
          "a": "No. No pay to win. Cosmetics only."
        },
        {
          "q": "How many characters can I have?",
          "a": "3 free, 4th and 5th through achievement or cosmetic."
        },
        {
          "q": "How do I join a party?",
          "a": "You need minimum level 10."
        },
        {
          "q": "Does XP drop in party?",
          "a": "Yes, but everyone progresses together."
        },
        {
          "q": "How do I find Colossi?",
          "a": "Explore the world and listen to tavern rumors."
        }
      ]
    }
  },
  "es-ES": {
    "ui": {
      "title": "Wiki de Eclipsia",
      "subtitle": "Guía integrada de la Frontera de los Arcanos",
      "open": "Wiki",
      "back": "Volver",
      "sections": "Secciones",
      "level": "Nv",
      "xp": "XP",
      "chance": "Probabilidad",
      "requirement": "Requisito",
      "weakness": "Debilidad",
      "reward": "Recompensa",
      "comingSoon": "Próximamente",
      "hp": "HP",
      "mp": "MP",
      "cd": "CD"
    },
    "nav": {
      "quick": "🚀 Inicio rápido",
      "character": "🧬 Personaje",
      "combat": "⚔ Combate",
      "party": "👥 Grupo",
      "world": "🗺 Mundo",
      "monsters": "👹 Monstruos",
      "items": "🎒 Objetos y equipo",
      "luck": "🍀 Sistema de Suerte",
      "impulse": "⚡ Impulso Arcano",
      "progression": "🏆 Progresión",
      "crafting": "🔧 Crafting",
      "guilds": "👥 Gremios",
      "faq": "❓ FAQ"
    },
    "quick": {
      "title": "🚀 Inicio rápido",
      "blocks": [
        {
          "title": "Primeros pasos",
          "items": [
            "Crea una cuenta con usuario, email y contraseña.",
            "Crea un personaje con nombre válido y arquetipo.",
            "Viaja a una región y usa atacar, defender, skills o huir.",
            "Empieza en Valedouro, completa misiones y habla en la taberna.",
            "Para party, activa gestionar grupo; nivel mínimo 10."
          ]
        }
      ]
    },
    "character": {
      "title": "🧬 Personaje",
      "blocks": [
        {
          "title": "Arquetipos y atributos",
          "items": [
            "Lámina, Arcano, Druida, Vanguardia, Tirador y Espectro tienen estilos propios.",
            "Fuerza: daño físico; Agilidad: huida y evasión; Vitalidad: defensa; Arcana: magia; Percepción: crítico; Voluntad: MP y resistencia.",
            "Los puntos libres se distribuyen en el perfil.",
            "Las pericias evolucionan con el uso.",
            "La Suerte viene de fuentes jugables, tiene techo 200 y nunca se compra."
          ]
        }
      ]
    },
    "combat": {
      "title": "⚔ Combate",
      "blocks": [
        {
          "title": "Reglas",
          "items": [
            "El jugador actúa, luego el pet y después el enemigo.",
            "Defender reduce daño 50%; Parry contra ataque fuerte de boss puede bloquear 80% y contraatacar.",
            "Huir tiene 60% + agilidad×0,5%.",
            "Crítico: 5% + percepción×0,2%, multiplicador 200%.",
            "Auto Combate elige la mejor acción; Avance Auto se detiene por boss, evento raro, inventario lleno o muerte."
          ]
        }
      ]
    },
    "party": {
      "title": "👥 Grupo",
      "blocks": [
        {
          "title": "Sistema",
          "items": [
            "Nivel mínimo 10 y máximo 5 miembros.",
            "Cross campaña exige que cada personaje haya llegado a la región.",
            "XP: solo 100%, 2:80%, 3:70%, 4:60%, 5:55%.",
            "Vanguardia tiene más aggro y el loot es individual."
          ]
        }
      ]
    },
    "world": {
      "title": "🗺 Mundo",
      "blocks": [
        {
          "title": "Exploración",
          "items": [
            "Valedouro, Nythera, Ormara, Costa Abisal, Cielo Partido y Fragmento tienen requisitos.",
            "Explorar puede dar materiales, oro, XP, emboscadas y secretos.",
            "Morir repetidamente, explorar mucho y escuchar NPCs revela eventos ocultos."
          ]
        }
      ]
    },
    "monsters": {
      "title": "👹 Monstruos",
      "blocks": [
        {
          "title": "Guía",
          "items": [
            "Cada región tiene monstruos con niveles y debilidades aproximadas.",
            "El loot depende de la tabla del enemigo y de la Suerte.",
            "Mini-bosses guardan regiones; Colosos requieren pistas vagas."
          ]
        }
      ]
    },
    "items": {
      "title": "🎒 Objetos y equipo",
      "blocks": [
        {
          "title": "Equipo",
          "items": [
            "Hay 15 slots de equipo.",
            "Armas de dos manos bloquean off-hand.",
            "Rarezas: común, incomún, raro, épico, legendario y reliquia.",
            "Piedras espirituales, pets y monturas añaden efectos y utilidad."
          ]
        }
      ]
    },
    "luck": {
      "title": "🍀 Sistema de Suerte",
      "blocks": [
        {
          "title": "Suerte",
          "items": [
            "Afecta chances de rareza y descubrimientos.",
            "Fuentes: base, equipo, títulos, impulso y eventos.",
            "Techo máximo 200.",
            "Nunca se vende ni convierte cosméticos en poder."
          ]
        }
      ],
      "table": [
        {
          "luck": "0",
          "common": "60%",
          "uncommon": "25%",
          "rare": "10%",
          "epic": "4%",
          "legendary": "0,9%",
          "relic": "0,1%"
        },
        {
          "luck": "200",
          "common": "27%",
          "uncommon": "26%",
          "rare": "23%",
          "epic": "17%",
          "legendary": "6%",
          "relic": "1%"
        }
      ]
    },
    "impulse": {
      "title": "⚡ Impulso Arcano",
      "blocks": [
        {
          "title": "Cargas",
          "items": [
            "1h offline = 1 carga, máximo 5.",
            "Cada combate ganado consume 1 carga.",
            "Las cargas añaden XP, oro, daño, defensa y suerte."
          ]
        }
      ]
    },
    "progression": {
      "title": "🏆 Progresión",
      "blocks": [
        {
          "title": "Progreso",
          "items": [
            "Subes de nivel con XP hasta lv 100.",
            "Los títulos recompensan logros como cazar, descubrir y desafiar colosos.",
            "El ranking global compara nivel y descubrimientos."
          ]
        }
      ]
    },
    "crafting": {
      "title": "🔧 Crafting",
      "blocks": [
        {
          "title": "Próximamente",
          "items": [
            "Usará materiales de regiones, bosses y colosos."
          ]
        }
      ]
    },
    "guilds": {
      "title": "👥 Gremios",
      "blocks": [
        {
          "title": "Próximamente",
          "items": [
            "Objetivos sociales, progreso colectivo y chat dedicado."
          ]
        }
      ]
    },
    "faq": {
      "title": "❓ FAQ",
      "items": [
        {
          "q": "¿Puedo perder objetos al morir?",
          "a": "No. Sin penalización por muerte."
        },
        {
          "q": "¿Hay que pagar para ser fuerte?",
          "a": "No. Sin pay to win. Solo cosméticos."
        },
        {
          "q": "¿Cuántos personajes puedo tener?",
          "a": "3 gratis, 4º y 5º por logro o cosmético."
        },
        {
          "q": "¿Cómo entro en party?",
          "a": "Necesitas nivel mínimo 10."
        },
        {
          "q": "¿Baja la XP en party?",
          "a": "Sí, pero todos avanzan juntos."
        },
        {
          "q": "¿Cómo encuentro Colosos?",
          "a": "Explora el mundo y escucha rumores de la taberna."
        }
      ]
    }
  },
  "ja-JP": {
    "ui": {
      "title": "エクリプシアWiki",
      "subtitle": "アルカナの辺境の統合ガイド",
      "open": "Wiki",
      "back": "戻る",
      "sections": "項目",
      "level": "Lv",
      "xp": "XP",
      "chance": "確率",
      "requirement": "条件",
      "weakness": "弱点",
      "reward": "報酬",
      "comingSoon": "近日公開",
      "hp": "HP",
      "mp": "MP",
      "cd": "CD"
    },
    "nav": {
      "quick": "🚀 クイック開始",
      "character": "🧬 キャラクター",
      "combat": "⚔ 戦闘",
      "party": "👥 パーティ",
      "world": "🗺 世界",
      "monsters": "👹 モンスター",
      "items": "🎒 アイテムと装備",
      "luck": "🍀 幸運システム",
      "impulse": "⚡ アルカナ衝動",
      "progression": "🏆 進行",
      "crafting": "🔧 クラフト",
      "guilds": "👥 ギルド",
      "faq": "❓ FAQ"
    },
    "quick": {
      "title": "🚀 クイック開始",
      "blocks": [
        {
          "title": "最初の流れ",
          "items": [
            "ユーザー名、メール、パスワードでアカウントを作成します。",
            "3〜20文字の名前とアーキタイプでキャラクターを作成します。",
            "地域へ移動し、攻撃、防御、スキル、逃走を使います。",
            "最初はヴァレドウロでクエストと装備集めを進めます。",
            "パーティは管理モードで作成し、参加にはレベル10が必要です。"
          ]
        }
      ]
    },
    "character": {
      "title": "🧬 キャラクター",
      "blocks": [
        {
          "title": "基本",
          "items": [
            "剣士、アルカナ、ドルイド、ヴァンガード、射手、スペクターの6種があります。",
            "筋力は物理、敏捷は逃走と回避、生命力は防御、アルカナは魔法、知覚は会心、意志はMPに関係します。",
            "自由ポイントはプロフィールで割り振ります。",
            "熟練度は使用で成長します。",
            "幸運の上限は200で直接購入できません。"
          ]
        }
      ]
    },
    "combat": {
      "title": "⚔ 戦闘",
      "blocks": [
        {
          "title": "ルール",
          "items": [
            "プレイヤー、ペット、敵の順に行動します。",
            "防御は50%軽減。ボスの強攻撃に防御するとパリィが発生することがあります。",
            "逃走は60%＋敏捷×0.5%。",
            "会心は5%＋知覚×0.2%、倍率200%。",
            "自動戦闘は最善行動を選び、自動進行はボスやイベントなどで停止します。"
          ]
        }
      ]
    },
    "party": {
      "title": "👥 パーティ",
      "blocks": [
        {
          "title": "仕組み",
          "items": [
            "参加はレベル10から、最大5人です。",
            "クロスキャンペーンでは同じ地域に到達している必要があります。",
            "XPはソロ100%、2人80%、3人70%、4人60%、5人55%。",
            "ヴァンガードは狙われやすく、戦利品は個別です。"
          ]
        }
      ]
    },
    "world": {
      "title": "🗺 世界",
      "blocks": [
        {
          "title": "探索",
          "items": [
            "6地域にはそれぞれ条件があります。",
            "探索では素材、ゴールド、XP、待ち伏せ、秘密が発生します。",
            "同じ場所で倒れ続ける、長く探索する、酒場の噂を聞くことが鍵です。"
          ]
        }
      ]
    },
    "monsters": {
      "title": "👹 モンスター",
      "blocks": [
        {
          "title": "案内",
          "items": [
            "地域ごとにレベルとおおよその弱点があります。",
            "戦利品は敵のテーブルと幸運で決まります。",
            "ミニボスは地域進行を守り、巨像は曖昧な手がかりで見つかります。"
          ]
        }
      ]
    },
    "items": {
      "title": "🎒 アイテムと装備",
      "blocks": [
        {
          "title": "装備",
          "items": [
            "装備スロットは15個です。",
            "両手武器は副手を封じます。",
            "レア度はコモンからレリックまであります。",
            "精霊石、ペット、乗騎は効果と利便性を与えます。"
          ]
        }
      ]
    },
    "luck": {
      "title": "🍀 幸運システム",
      "blocks": [
        {
          "title": "幸運",
          "items": [
            "戦利品のレア度と発見に影響します。",
            "基本、装備、称号、衝動、イベントが源です。",
            "最大値は200です。",
            "直接販売されず、コスメを力に変えません。"
          ]
        }
      ],
      "table": [
        {
          "luck": "0",
          "common": "60%",
          "uncommon": "25%",
          "rare": "10%",
          "epic": "4%",
          "legendary": "0,9%",
          "relic": "0,1%"
        },
        {
          "luck": "200",
          "common": "27%",
          "uncommon": "26%",
          "rare": "23%",
          "epic": "17%",
          "legendary": "6%",
          "relic": "1%"
        }
      ]
    },
    "impulse": {
      "title": "⚡ アルカナ衝動",
      "blocks": [
        {
          "title": "チャージ",
          "items": [
            "1時間オフラインで1チャージ、最大5。",
            "勝利した戦闘ごとに1チャージ消費します。",
            "チャージはXP、ゴールド、ダメージ、防御、幸運を強化します。"
          ]
        }
      ]
    },
    "progression": {
      "title": "🏆 進行",
      "blocks": [
        {
          "title": "成長",
          "items": [
            "XPでレベル100まで成長します。",
            "称号は狩り、発見、巨像挑戦などで得られます。",
            "ランキングはレベルと発見数を比較します。"
          ]
        }
      ]
    },
    "crafting": {
      "title": "🔧 クラフト",
      "blocks": [
        {
          "title": "近日公開",
          "items": [
            "地域、ボス、巨像の素材を装備強化に使います。"
          ]
        }
      ]
    },
    "guilds": {
      "title": "👥 ギルド",
      "blocks": [
        {
          "title": "近日公開",
          "items": [
            "社会的目標、共同進行、専用チャットを追加予定です。"
          ]
        }
      ]
    },
    "faq": {
      "title": "❓ FAQ",
      "items": [
        {
          "q": "死亡でアイテムを失いますか？",
          "a": "いいえ。死亡ペナルティはありません。"
        },
        {
          "q": "強くなるために課金が必要ですか？",
          "a": "いいえ。Pay to Winなし。コスメのみです。"
        },
        {
          "q": "キャラクターはいくつ作れますか？",
          "a": "3枠無料、4枠目と5枠目は実績またはコスメです。"
        },
        {
          "q": "パーティ参加方法は？",
          "a": "最低レベル10が必要です。"
        },
        {
          "q": "パーティでXPは減りますか？",
          "a": "はい。ただし全員が一緒に成長します。"
        },
        {
          "q": "巨像はどう見つけますか？",
          "a": "世界を探索し、酒場の噂を聞いてください。"
        }
      ]
    }
  }
} satisfies Record<LangCode, Record<string, unknown>>;
