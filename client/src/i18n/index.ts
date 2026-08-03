export type LangCode = 'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP';

export type TranslationValue = string | TranslationTree;

export interface TranslationTree {
  [key: string]: TranslationValue;
}

export const defaultLang: LangCode = 'en-US';

export const supportedLangs: LangCode[] = ['pt-BR', 'en-US', 'es-ES', 'ja-JP'];

export const translations: Record<LangCode, TranslationTree> = {
  "pt-BR": {
    "game": {
      "title": "ECLIPSIA",
      "subtitle": "Fronteira dos Arcanos",
      "loading": "Carregando...",
      "version": "Versão",
      "confirm": "Confirmar",
      "cancel": "Cancelar",
      "back": "Voltar",
      "save": "Salvar",
      "close": "Fechar",
      "yes": "Sim",
      "no": "Não",
      "ok": "OK",
      "soon": "Em breve",
      "locked": "Bloqueado",
      "unknown": "Desconhecido",
      "level": "Nível",
      "lvl": "Nv.",
      "rank": "Classe",
      "new": "Novo"
    },
    "login": {
      "title": "Entrar em Eclipsia",
      "subtitle": "A fronteira arcana aguarda.",
      "user": "Usuário",
      "userPlaceholder": "Digite seu usuário",
      "passPLaceholder": "Digite sua senha",
      "enter": "Entrar",
      "register": "Registrar",
      "forgotPass": "Esqueci minha senha",
      "noAccount": "Ainda não tem conta?",
      "hasAccount": "Já tem conta?",
      "loginError": "Usuário ou senha inválidos.",
      "registerSuccess": "Conta criada com sucesso.",
      "language": "Idioma",
      "pass": "Senha",
      "email": "Email",
      "emailPlaceholder": "Digite seu email",
      "loginTab": "LOGIN",
      "registerTab": "CRIAR CONTA"
    },
    "register": {
      "username": "Nome de usuário",
      "usernamePlaceholder": "Escolha um nome",
      "confirmPass": "Confirmar senha",
      "create": "Criar conta",
      "passwordMismatch": "As senhas não coincidem."
    },
    "charCreate": {
      "title": "Criar personagem",
      "subtitle": "Escolha sua origem arcana.",
      "nameLabel": "Nome do personagem",
      "namePlaceholder": "Digite o nome",
      "nameError": "Nome inválido.",
      "nameTaken": "Nome já em uso.",
      "archetypeTitle": "Arquétipo",
      "archetypeHint": "Cada arquétipo muda atributos e combate.",
      "confirm": "Confirmar",
      "stats": {
        "atk": "Ataque",
        "def": "Defesa",
        "arc": "Arcano"
      },
      "archetypes": {
        "blade": {
          "name": "Lâmina",
          "desc": "Velocidade e precisão"
        },
        "arcane": {
          "name": "Arcano",
          "desc": "Poder mágico e destruição"
        },
        "druid": {
          "name": "Druida",
          "desc": "Cura e controle da natureza"
        },
        "vanguard": {
          "name": "Vanguarda",
          "desc": "Defesa e proteção"
        },
        "ranger": {
          "name": "Atirador",
          "desc": "Alcance e mobilidade"
        },
        "spectre": {
          "name": "Espectro",
          "desc": "Furtividade e veneno"
        }
      },
      "destinyTitle": "Escolha seu Destino",
      "awaken": "DESPERTAR EM ECLIPSIA",
      "nameRequired": "Nome obrigatório entre 3 e 20 caracteres.",
      "archetypeRequired": "Escolha um arquétipo."
    },
    "charSelect": {
      "title": "Selecionar personagem",
      "subtitle": "Escolha quem cruzará a fronteira.",
      "play": "Jogar",
      "addParty": "Adicionar à party",
      "removeParty": "Remover da party",
      "manageParty": "Gerenciar party",
      "cancelParty": "Cancelar party",
      "enterGame": "Entrar no jogo",
      "createNew": "Criar novo",
      "slotsLeft": "Espaços restantes",
      "confirmDelete": "Confirmar exclusão",
      "chars": "chars",
      "activeBadge": "ATIVO",
      "partyBadge": "PARTY",
      "delete": "Excluir",
      "noCharacters": "Nenhum personagem criado.",
      "partyFull": "Party cheia.",
      "selectCharacter": "Selecione um personagem."
    },
    "header": {
      "gold": "Ouro",
      "crystalsHint": "Cristais: moeda premium usada no mercado mundial e entre jogadores",
      "settings": "Configurações"
    },
    "nav": {
      "hub": "Central",
      "travel": "Viagem",
      "hunt": "Caça",
      "items": "Itens",
      "profile": "Perfil"
    },
    "hub": {
      "travel": "Viajar",
      "hunt": "Caçar",
      "city": "Cidade",
      "items": "Itens",
      "profile": "Perfil",
      "quests": "Missões",
      "ranking": "Ranking",
      "guild": "Guilda",
      "chat": "Chat",
      "charges": "Cargas"
    },
    "travel": {
      "title": "Viagem",
      "regions": {
        "_self": "Regiões",
        "valedouro": {
          "name": "Valedouro",
          "level": "Nível 1",
          "desc": "Campos dourados e ruínas antigas."
        },
        "nythera": {
          "name": "Floresta de Nythera",
          "level": "Nível 10",
          "desc": "Floresta noturna de raízes sussurrantes."
        },
        "ormara": {
          "name": "Deserto de Ormara",
          "level": "Nível 20",
          "desc": "Costa de marés arcanas."
        },
        "abissal": {
          "name": "Costa Abissal",
          "level": "Nível 30",
          "desc": "Rasgo escuro entre mundos."
        },
        "ceupartido": {
          "name": "Céu Partido",
          "level": "Nível 40",
          "desc": "Ilhas suspensas sob tempestades."
        },
        "fragmento": {
          "name": "???",
          "level": "Nível 50",
          "desc": "O limite onde a realidade se quebra."
        }
      },
      "dungeons": {
        "_self": "Masmorras",
        "cripta": {
          "name": "Cripta Velada",
          "level": "Nível 5",
          "floors": "Andares",
          "region": "Valedouro"
        },
        "secret": {
          "name": "Masmorra Secreta",
          "level": "Nível variável",
          "desc": "Entrada rara revelada por eventos ocultos."
        },
        "bandit_camp": { "name": "Acampamento dos Bandidos", "desc": "Bandidos saqueiam as estradas de Valedouro. O líder espera no último andar." },
        "root_crypt": { "name": "Cripta das Raízes", "desc": "As raízes da floresta invadiram uma cripta antiga. O Guardião desperta." },
        "mirror_sanctum": { "name": "Santuário do Espelho", "desc": "Um espelho amaldiçoado aprisiona reflexos famintos nas profundezas de Nythera." },
        "azhur_pit": { "name": "Fosso de Azhur", "desc": "Nas dunas de Ormara, a areia engoliu um fosso onde Azhur devora os fracos." },
        "velkaryn_spire": { "name": "Pináculo de Velkaryn", "desc": "Acima das nuvens de Céu-Partido, o pináculo guarda os segredos de Velkaryn." },
        "thal_mora_abyss": { "name": "Abismo de Thal'Mora", "desc": "Nas profundezas abissais, Thal'Mora canta para afogar os incautos." },
        "fragment_nexus": { "name": "Nexo do Fragmento", "desc": "O coração partido de Eclipsia pulsa atrás do véu. Apenas os despertos o encontram." }
      },
      "enter": "Entrar",
      "go": "Ir",
      "locked": "Bloqueado",
      "requireLevel": "Requer nível",
      "requireTitle": "Requer título",
      "requireQuest": "Requer missão",
      "requireUnknown": "Requisito desconhecido",
      "tabs": {
        "regions": "REGIÕES",
        "dungeons": "DUNGEONS"
      },
      "requirements": {
        "portador": "Título Portador",
        "specialQuest": "Quest especial",
        "eclipseAwakened": "Título eclipse_awakened",
        "hidden": "Condição oculta"
      },
      "regionRanges": {
        "valedouro": "Nv 1-10",
        "nythera": "Nv 10-25",
        "ormara": "Nv 25-40",
        "abissal": "Nv 40-55",
        "ceupartido": "Nv 55-70",
        "fragmento": "Nv ???"
      },
      "dungeonInfo": {
        "rootCrypt": {
          "name": "Cripta da Raiz",
          "level": "Nv 15+",
          "floors": "10 andares",
          "region": "Nythera"
        },
        "hidden": {
          "name": "???",
          "condition": "Condição oculta"
        }
      },
      "dungeonFloors": "andares",
      "dungeonBoss": "Chefe",
      "dungeonReward": "Recompensa",

    },
    "combat": {
      "title": "Combate",
      "dungeonCleared": "Dungeon limpa!",
      "attack": "Atacar",
      "defend": "Defender",
      "skills": "Habilidades",
      "flee": "Fugir",
      "log": {
        "_self": "Registro",
        "title": "Registro de combate",
        "playerUsed": "Você usou {skill}.",
        "enemyUsed": "O inimigo usou {skill}.",
        "playerDealt": "Você causou {damage} de dano.",
        "playerTook": "Você sofreu {damage} de dano.",
        "damage": "Dano",
        "critical": "Crítico!",
        "missed": "Errou!",
        "defended": "Você defendeu.",
        "fled": "Você fugiu.",
        "victory": "Vitória alcançada.",
        "levelUp": "Você subiu de nível!"
      },
      "autoFight": "Combate Auto",
      "autoAdvance": "Avanço Auto",
      "on": "Ligado",
      "off": "Desligado",
      "floor": "Andar",
      "vs": "contra",
      "victory": "Vitória",
      "defeat": "Derrota",
      "fled": "Você fugiu.",
      "defeatMsg": "Você caiu sem punição. HP e MP serão restaurados.",
      "tryAgain": "Tentar novamente",
      "collectLoot": "Coletar saque",
      "nextFloor": "Próximo andar",
      "autoConfig": {
        "title": "Configuração automática",
        "mpThreshold": "Limite de MP",
        "stopBoss": "Parar em chefes",
        "stopEvent": "Parar em eventos",
        "lootFilter": "Filtro de saque",
        "lootAll": "Coletar tudo",
        "lootUncommon": "Incomum ou melhor",
        "lootRare": "Raro ou melhor",
        "lootEpic": "Épico ou melhor",
        "save": "Salvar"
      },
      "skillsModal": "Habilidades",
      "autoConfigModal": "Configuração automática",
      "lootModal": "Saque",
      "noSkills": "Nenhuma habilidade desbloqueada.",
      "noLoot": "Nenhum saque disponível."
    },
    "city": {
      "valedouro": "Valedouro",
      "valedouroDesc": "Cidade de pedra clara cercada por campos dourados.",
      "tavern": "Taverna",
      "shop": "Loja",
      "blacksmith": "Ferreiro",
      "sage": "Sábio",
      "board": "Mural",
      "mail": "Correio",
      "tavernQuote": "Toda jornada começa com uma história.",
      "clickToTalk": "Clique para conversar",
      "talk": "Conversar",
      "askMore": "Perguntar mais",
      "alreadyKnow": "Você já conhece este rumor.",
      "shopAll": "Todos os itens",
      "buy": "Comprar",
      "bought": "Comprado",
      "blacksmithTitle": "Forja de Valedouro",
      "blacksmithDesc": "Aço, runas e paciência criam lendas.",
      "upgrade": "Aprimorar",
      "noEquipment": "Nenhum equipamento.",
      "sageTitle": "Arquivo do Sábio",
      "sageDesc": "Conhecimento arcano seguro.",
      "learnSkill": "Aprender habilidade",
      "resetStats": "Redefinir atributos",
      "resetStatsDesc": "Recupere pontos distribuídos.",
      "reset": "Redefinir",
      "boardTitle": "Mural de missões",
      "boardDesc": "Pedidos, caçadas e alertas.",
      "accept": "Aceitar",
      "tabs": {
        "tavern": "🍺 TAVERNA",
        "shop": "🏪 LOJA",
        "blacksmith": "🔨 FERREIRO",
        "sage": "🧙 SÁBIO",
        "board": "📋 MURAL"
      },
      "filters": {
        "all": "Tudo",
        "weapons": "Armas",
        "armor": "Armadura",
        "accessories": "Acessórios",
        "pet": "Pet",
        "mount": "Montaria"
      },
      "npcs": {
        "old_merchant": {
          "name": "Velho Mercador"
        },
        "adventurer": {
          "name": "Aventureira"
        },
        "mysterious": {
          "name": "Figura Encapuzada"
        },
        "beast_tamer": {
          "name": "Domador de Feras"
        }
      },
      "dialogues": {
        "old_merchant": "As moedas antigas lembram caminhos que mapas esquecem.",
        "adventurer": "Nythera testa coragem antes de testar lâminas.",
        "mysterious": "Siga o véu quando a lua negar sua própria sombra.",
        "beast_tamer": "Feras respeitam paciência mais do que força."
      },
      "categories": "Categorias",
      "price": "Preço",
      "levelReq": "Nível mínimo",
      "canBuy": "Comprar",
      "cantBuy": "Indisponível",
      "upgradeCost": "Custo de upgrade",
      "resetCost": "Custo de reset"
    },
    "tavern": {
      "npcs": {
        "old_merchant": "Mercador antigo",
        "adventurer": "Aventureira",
        "mysterious": "Figura misteriosa",
        "beast_tamer": "Domador de feras"
      },
      "rumors": {
        "wolf_tracks": "Pegadas de lobo ao norte.",
        "cursed_crypt": "A cripta responde a nomes mortos.",
        "nythera_night": "Nythera escurece cedo.",
        "forbidden_boss": "Chefes proibidos atendem desafios.",
        "azhur_howl": "O uivo de Azhur apaga tochas.",
        "eclipse_secret": "O eclipse revela portas invisíveis.",
        "spirit_stones": "Pedras espirituais escolhem pacientes.",
        "party_power": "Grupos avançam mais, mas dividem XP.",
        "pet_secret": "Pets revelam caminhos ocultos.",
        "rare_pets": "Pets raros evitam pressa.",
        "mount_secret": "Montarias conhecem atalhos."
      }
    },
    "party": {
      "title": "Party",
      "setActive": "Definir ativo",
      "remove": "Remover",
      "empty": "Nenhum membro.",
      "levelReq": "Nível mínimo 10.",
      "xpInfo": "XP reduzido por tamanho do grupo.",
      "crossInfo": "É preciso alcançar a mesma região.",
      "xpMultiplier": "Multiplicador de XP",
      "activate": "Ativar",
      "dead": "Morto"
    },
    "partyReal": {
      "title": "Grupo de jogadores",
      "namePlaceholder": "Nome do jogador online",
      "invite": "Convidar",
      "invitedBy": "Convite de grupo de",
      "leave": "Sair do grupo",
      "kick": "Expulsar",
      "kicked": "Você foi expulso do grupo.",
      "declined": "Convite recusado.",
      "failed": "Não foi possível convidar",
      "reason": { "offline": "jogador offline", "busy": "já está em um grupo", "full": "grupo cheio", "not_leader": "apenas o líder convida" }
    },
    "dailyQuests": {
      "claim": "Resgatar",
      "claimed": "Resgatada",
      "cannot": "Missão diária ainda incompleta",
      "rewardReceived": "Recompensa diária resgatada!",
      "daily_kills": { "name": "Caçador do dia: derrote 20 inimigos" },
      "daily_explorer": { "name": "Explorador do dia: explore 15 vezes" },
      "daily_crafts": { "name": "Artesão do dia: forje 2 itens" },
      "daily_dungeon": { "name": "Aventureiro do dia: avance 3 andares de dungeon" }
    },
    "pet": {
      "title": "Pet",
      "level": "Nível",
      "ready": "Pronto",
      "reviving": "Revivendo",
      "noActive": "Nenhum pet ativo.",
      "abilities": {
        "nibble": "Mordiscada",
        "scout": "Explorar",
        "wolf_bite": "Mordida de lobo",
        "spikes": "Espinhos",
        "honey_trail": "Trilha de mel",
        "nature_heal": "Cura natural",
        "shadow_nose": "Faro sombrio",
        "eagle_dive": "Mergulho da águia",
        "stone_wall": "Muralha de pedra",
        "arcane_wisdom": "Sabedoria arcana",
        "dragon_claw": "Garra de dragão",
        "lucky_paw": "Pata sortuda",
        "eclipse_fang": "Presa do eclipse",
        "king_roar": "Rugido real",
        "fragment_strike": "Golpe fragmentado"
      }
    },
    "mount": {
      "title": "Montaria",
      "exploreTime": "Tempo de exploração",
      "noActive": "Nenhuma montaria ativa."
    },
    "items": {
      "equipped": "Equipado",
      "bag": "Bolsa",
      "crafting": "Criação",
      "market": "Mercado",
      "equip": "Equipar",
      "unequip": "Desequipar",
      "discard": "Descartar",
      "compare": "Comparar",
      "slots": {
        "_self": "Espaços",
        "weapon_main": "Arma principal",
        "weapon_off": "Mão secundária",
        "head": "Cabeça",
        "chest": "Peitoral",
        "legs": "Pernas",
        "gloves": "Luvas",
        "boots": "Botas",
        "earring": "Brinco",
        "necklace": "Colar",
        "belt": "Cinto",
        "resistance": "Resistência",
        "amulet": "Amuleto",
        "spirit_stone": "Pedra espiritual",
        "pet": "Pet",
        "mount": "Montaria"
      },
      "empty": "Nenhum item.",
      "confirmDiscard": "Confirmar descarte?",
      "storageSlots": "slots do baú",
      "storageEmpty": "Baú vazio.",
      "storageFull": "Baú cheio (500).",
      "bagFull": "Mochila cheia (60).",
      "deposit": "Depositar",
      "withdraw": "Retirar",
      "twoHanded": "Duas mãos",
      "twoHandedWarning": "Remove a mão secundária.",
      "twoHandedBlocked": "Mão secundária bloqueada por arma de duas mãos.",
      "spiritStoneEffect": "Efeito da pedra espiritual",
      "stoneLevel": "Nível da pedra",
      "group": {
        "weapons": "Armas",
        "armor": "Armaduras",
        "accessories": "Acessórios",
        "companions": "Companheiros"
      },
      "rarities": {
        "common": "Comum",
        "uncommon": "Incomum",
        "rare": "Raro",
        "epic": "Épico",
        "legendary": "Lendário",
        "relic": "Relíquia"
      },
      "spiritEffects": {
        "burn": "Queimar",
        "freeze": "Congelar",
        "paralyze": "Paralisar",
        "regenerate": "Regenerar",
        "bleed": "Sangrar",
        "mana_drain": "Drenar mana",
        "all_boost": "Impulso total"
      },
      "tabs": {
        "equipped": "EQUIPADO",
        "bag": "MOCHILA",
        "crafting": "CRAFTING",
        "market": "MERCADO",
        "storage": "BAÚ"
      },
      "unknownItem": "Item desconhecido",
      "genericDesc": "Um item encontrado na fronteira dos arcanos.",
      "mainStats": "Stats principais",
      "effects": "Efeitos",
      "noEffects": "Sem efeitos",
      "itemCode": "Código do item",
      "positive": "Positivo",
      "negative": "Negativo",
      "comparison": "Comparação",
      "currentEquipped": "Equipado atual",
      "twoHandedBadge": "2H",
      "slotEmpty": "Slot vazio",
      "groups": {
        "weapons": "ARMAS",
        "armor": "ARMADURA",
        "accessories": "ACESSÓRIOS"
      },
      "defaultSlotIcons": {
        "weapon_main": "⚔",
        "weapon_off": "🛡",
        "head": "🎩",
        "chest": "🥋",
        "legs": "👖",
        "gloves": "🧤",
        "boots": "🥾",
        "earring": "💠",
        "necklace": "📿",
        "belt": "🧷",
        "resistance": "🔰",
        "amulet": "🔮",
        "spirit_stone": "💎",
        "pet": "🐾",
        "mount": "🐴"
      },
      "names": {
        "long_sword": "Espada longa",
        "misty_ring": "Anel nebuloso",
        "fortune_amulet": "Amuleto da fortuna"
      }
    },
    "profile": {
      "title": "Perfil",
      "status": "Status",
      "skills": "Habilidades",
      "titles": {
        "_self": "Títulos",
        "locked": "Bloqueado",
        "equipped": "Equipado",
        "equip": "Equipar"
      },
      "freePoints": "Pontos livres",
      "distribute": "Distribuir",
      "equip": "Equipar",
      "equipped": "Equipado",
      "stats": {
        "strength": "Força",
        "agility": "Agilidade",
        "vitality": "Vitalidade",
        "arcana": "Arcana",
        "perception": "Percepção",
        "will": "Vontade",
        "luck": "Sorte"
      },
      "tabs": {
        "status": "STATUS",
        "skills": "SKILLS",
        "titles": "TÍTULOS"
      },
      "skillInfo": {
        "mp": "MP",
        "cd": "CD"
      },
      "proficiencies": "Proficiências",
      "titleNames": {
        "portador": "Portador",
        "veil_tracker": "Rastreador do Véu",
        "eclipse_awakened": "Desperto do Eclipse"
      }
    },
    "quests": {
      "title": "Missões",
      "active": "Ativas",
      "completed": "Concluídas",
      "reward": "Recompensa",
      "progress": "Progresso",
      "details": "Detalhes",
      "none": "Nenhuma missão.",
      "secret": "Secreta",
      "unknown": "Desconhecida",
      "hunt_wolves": {
        "name": "Caça aos lobos",
        "desc": "Proteja as estradas de Valedouro."
      },
      "explore_forest": {
        "name": "Explorar a floresta",
        "desc": "Investigue marcas arcanas."
      },
      "kill_boss": {
        "name": "Derrubar o chefe",
        "desc": "Derrote o líder da região."
      },
      "tabs": {
        "daily": "DIÁRIAS",
        "active": "ATIVAS",
        "completed": "COMPLETAS"
      },
      "viewDetails": "Ver detalhes",
      "completedAt": "Concluída em",
      "secretMystery": "Sombras de Nythera escondem um chamado sem nome.",
      "progressCounter": "Progresso",
      "rewardXp": "XP",
      "rewardGold": "ouro",
      "wolf_hunt_1": {
        "name": "Caça aos Lobos da Névoa",
        "desc": "Matar 10 Lobos da Névoa."
      },
      "goblin_slayer": {
        "name": "Exterminador de Goblins",
        "desc": "Matar 15 Goblins."
      },
      "forest_explorer": {
        "name": "Explorador de Nythera",
        "desc": "Explorar Nythera 5 vezes."
      },
      "shadow_secret": {
        "name": "Segredo das Sombras",
        "desc": "Quest oculta desbloqueada por 3 descobertas em Nythera."
      },
      "mystery": "???"
    },
    "ranking": {
      "title": "Ranking",
      "level": "Nível",
      "pvp": "PvP",
      "discovery": "Descoberta",
      "you": "Você",
      "soon": {
        "pvp": "PvP em breve.",
        "discovery": "Descoberta em breve."
      },
      "tabs": {
        "level": "NÍVEL",
        "pvp": "PVP",
        "discovery": "DESCOBERTAS"
      },
      "loading": "Carregando ranking...",
      "empty": "Nenhum dado de ranking.",
      "value": "Valor",
      "position": "Posição",
      "xp": "XP"
    },
    "guild": {
      "title": "Guilda",
      "soon": "Sistema de Guildas em breve",
      "offline": "Guildas indisponíveis (servidor offline).",
      "createTitle": "Criar guilda",
      "namePlaceholder": "Nome da guilda (3-24)",
      "create": "Criar",
      "browse": "Guildas existentes",
      "empty": "Nada por aqui ainda.",
      "leaderLabel": "Líder",
      "membersWord": "membros",
      "join": "Entrar",
      "yourRole": "Seu cargo",
      "role": { "leader": "Líder", "officer": "Oficial", "member": "Membro" },
      "disband": "Dissolver",
      "leave": "Sair",
      "leaveConfirm": "Sair da guilda?",
      "disbandConfirm": "Dissolver a guilda? Todos os membros serão removidos.",
      "motd": "Mensagem do dia",
      "motdPlaceholder": "Escreva a mensagem da guilda...",
      "saveMotd": "Salvar",
      "motdSaved": "Mensagem salva!",
      "members": "Membros",
      "promote": "Promover a oficial",
      "demote": "Rebaixar a membro",
      "kick": "Expulsar",
      "chatTitle": "Chat da guilda",
      "chatPlaceholder": "Mensagem para a guilda...",
      "error": "Erro na operação de guilda",
      "created": "Guilda criada!",
      "joined": "Você entrou na guilda!",
      "disbanded": "Guilda dissolvida.",
      "removed": "Você não está mais na guilda."
    },
    "chat": {
      "title": "Chat",
      "placeholder": "Digite sua mensagem...",
      "send": "Enviar",
      "global": "Global",
      "guild": "Guilda",
      "system": "Sistema",
      "systemName": "Sistema",
      "connected": "Conectado ao chat.",
      "disconnected": "Desconectado do chat.",
      "messageTooLong": "Mensagem muito longa.",
      "empty": "Digite uma mensagem.",
      "itemLinkHint": "Dica: cole [item:numId|efeito:valor|...] para linkar um item — ex.: [item:1005|1:65|4:5|7:3]",
      "commandHint": "Comandos: /convite <nome> · /w <nome> <msg> · /r <msg> · /p <msg> · /help — clique em um nome para ações",
      "partyPrefix": "Grupo",
      "whisperFrom": "Sussurro de",
      "whisperTo": "Sussurro para",
      "whisperOffline": "Não foi possível sussurrar — jogador offline",
      "inviteCard": "Convite de grupo de",
      "inviteAnswered": "Convite respondido.",
      "inviteSent": "Convite enviado para",
      "presenceIn": "entrou na fronteira",
      "presenceOut": "saiu da fronteira",
      "actionInvite": "Convidar ao grupo",
      "actionWhisper": "Sussurrar",
      "noReplyTarget": "Ninguém para responder ainda — use /w <nome> <msg>",
      "badCommand": "Comando inválido"
    },
    "mail": {
      "inbox": "Caixa de entrada",
      "unread": "não lidas",
      "empty": "Nenhuma carta.",
      "compose": "Nova carta",
      "toPlaceholder": "Nome do destinatário",
      "subjectPlaceholder": "Assunto",
      "messagePlaceholder": "Mensagem...",
      "noAttachment": "Sem anexo",
      "goldPlaceholder": "Ouro (opcional)",
      "crystalsPlaceholder": "💎 Cristais (opcional)",
      "send": "Enviar",
      "sent": "Carta enviada!",
      "claim": "Resgatar",
      "claimed": "Anexo resgatado!",
      "from": "De",
      "noSubject": "(sem assunto)",
      "error": "Erro no correio",
      "noRecipient": "Informe o destinatário",
      "offline": "Correio indisponível (servidor offline)."
    },
    "market": {
      "tabs": { "buy": "Comprar", "sell": "Vender", "mine": "Minhas ofertas" },
      "empty": "Nenhuma oferta.",
      "seller": "Vendedor",
      "buy": "Comprar",
      "bought": "Compra realizada!",
      "listItem": "Colocar à venda",
      "listed": "Oferta criada!",
      "price": "Preço",
      "invalidPrice": "Preço inválido",
      "cancel": "Cancelar",
      "status": { "active": "Ativa", "sold": "Vendida", "cancelled": "Cancelada" },
      "offline": "Mercado indisponível (servidor offline).",
      "error": "Erro no mercado",
      "taxNote": "Taxas: 2 💎 para listar (não reembolsável) e 5% sobre a venda.",
      "crystalsCurrency": "O mercado mundial usa 💎 Cristais (moeda paga) — o ouro do jogo fica protegido da economia entre jogadores.",
    },
    "crafting": {
      "craft": "Forjar",
      "cannot": "Requisitos insuficientes",
      "success": "Forjado",
      "invFull": "Inventário cheio",
      "upgradeTitle": "Melhoria (+5% por nível)",
      "selectItem": "Selecionar item",
      "level": "Nível",
      "upgrade": "Melhorar",
      "upgraded": "Melhorado",
      "enchantTitle": "Encantamento",
      "selectStone": "Selecionar pedra espiritual",
      "enchant": "Encantar",
      "enchanted": "Encantado"
    },
    "trade": {
      "title": "Troca entre jogadores",
      "hint": "Negocie itens e ouro diretamente com outro personagem online. Máx. 3 itens por lado.",
      "targetPlaceholder": "Nome do outro personagem",
      "request": "Pedir troca",
      "incoming": "Pedido de troca de",
      "with": "Trocando com",
      "addItem": "Adicionar item",
      "confirm": "Confirmar",
      "confirmHint": "Confirme quando a oferta estiver pronta.",
      "waitingConfirm": "Aguardando o outro jogador...",
      "completed": "Troca concluída!",
      "declined": "Troca recusada.",
      "cancelled": "Troca cancelada",
      "failed": "Falha na troca"
    },

    "impulse": {
      "title": "Impulso",
      "absent": "Tempo ausente",
      "hours": "horas",
      "hour": "hora",
      "minutes": "minutos",
      "charges": "Cargas",
      "hint": "Impulso ajuda sem substituir progresso.",
      "enter": "Entrar",
      "names": {
        "1": "Brisa Arcana",
        "2": "Chama Reacesa",
        "3": "Ritmo Lunar",
        "4": "Eclipse Parcial",
        "5": "Retorno Lendário"
      },
      "bonuses": {
        "xp": "XP",
        "gold": "Ouro",
        "damage": "Dano",
        "defense": "Defesa",
        "luck": "Sorte"
      }
    },
    "loot": {
      "title": "Saque",
      "collectAll": "Coletar tudo",
      "collected": "Coletado"
    },
    "settings": {
      "title": "Configurações",
      "language": "Idioma",
      "sound": "Som",
      "music": "Música",
      "notifications": "Notificações",
      "save": "Salvar",
      "saved": "Configurações salvas.",
      "languageButtons": {
        "pt": "🇧🇷PT",
        "en": "🇺🇸EN",
        "es": "🇪🇸ES",
        "ja": "🇯🇵JA"
      }
    },
    "errors": {
      "generic": "Algo deu errado.",
      "connection": "Erro de conexão.",
      "session": "Sessão expirada.",
      "inventoryFull": "Inventário cheio.",
      "notEnoughGold": "Ouro insuficiente.",
      "levelRequired": "Nível necessário.",
      "titleRequired": "Título necessário."
    },
    "notifications": {
      "levelUp": "Você subiu de nível!",
      "newTitle": "Novo título!",
      "rareEvent": "Evento raro!",
      "colossusSoon": "Um colosso se aproxima.",
      "questComplete": "Missão concluída!",
      "itemFound": "Item encontrado!"
    },
    "skills": {
      "spin_slash": {
        "name": "Corte giratório",
        "desc": "Gira a lâmina para atingir o inimigo."
      },
      "dash_cut": {
        "name": "Corte veloz",
        "desc": "Avança rapidamente e corta o alvo."
      },
      "bleed": {
        "name": "Sangramento",
        "desc": "Causa dano por turnos."
      },
      "execute": {
        "name": "Executar",
        "desc": "Dano alto contra alvos fracos."
      },
      "arcane_burst": {
        "name": "Explosão arcana",
        "desc": "Libera energia arcana."
      },
      "ice_nova": {
        "name": "Nova de gelo",
        "desc": "Congela o ar e causa dano."
      },
      "heal_pulse": {
        "name": "Pulso de cura",
        "desc": "Restaura parte do HP."
      },
      "root": {
        "name": "Enraizar",
        "desc": "Prende o alvo com raízes."
      },
      "thousand_cuts": {
        "name": "Mil cortes",
        "desc": "Sequência de golpes rápidos."
      },
      "blade_storm": {
        "name": "Tempestade de lâminas",
        "desc": "Dança de cortes devastadores."
      },
      "chain_lightning": {
        "name": "Relâmpago em cadeia",
        "desc": "Raio que salta entre alvos."
      },
      "void_gate": {
        "name": "Portal do vazio",
        "desc": "Distorce defesa e mana."
      },
      "thorns": {
        "name": "Espinhos",
        "desc": "Retalia ataques recebidos."
      },
      "nature_burst": {
        "name": "Explosão natural",
        "desc": "Impacto de energia selvagem."
      },
      "shield_bash": {
        "name": "Golpe de escudo",
        "desc": "Atordoa com o escudo."
      },
      "fortress": {
        "name": "Fortaleza",
        "desc": "Aumenta muito a defesa."
      },
      "piercing_shot": {
        "name": "Disparo perfurante",
        "desc": "Ignora parte da defesa."
      },
      "rain_of_arrows": {
        "name": "Chuva de flechas",
        "desc": "Dispara várias flechas."
      },
      "death_mark": {
        "name": "Marca da morte",
        "desc": "Aumenta dano recebido pelo alvo."
      },
      "shadow_step": {
        "name": "Passo sombrio",
        "desc": "Prepara um ataque crítico."
      }
    },
    "bosses": {
      "bandit_leader": {
        "name": "Líder dos Bandidos",
        "desc": "Saqueador astuto de golpes sujos.",
        "phase2": "Chama reforços.",
        "enrage": "Entra em fúria."
      },
      "root_guardian": {
        "name": "Guardião das Raízes",
        "desc": "Protetor ancestral de Nythera.",
        "phase2": "Raízes cercam a arena.",
        "phase3": "A floresta desperta.",
        "enrage": "A seiva arcana ferve."
      },
      "void_mirror": {
        "name": "Espelho do Vazio",
        "desc": "Reflexo vivo de medo e poder.",
        "phase2": "O espelho se duplica."
      },
      "azhur": {
        "name": "Azhur, Lobo do Eclipse",
        "desc": "Fera lendária das luas partidas.",
        "phase2": "Some nas sombras.",
        "phase3": "O eclipse cobre suas presas.",
        "enrage": "O uivo abala a coragem.",
        "access": "Acesso por rastros secretos.",
        "worldImpact": "As estradas silenciam."
      },
      "thal_mora": {
        "name": "Thal Mora, Voz das Profundezas",
        "desc": "Presença abissal das marés.",
        "phase2": "A arena afunda.",
        "phase3": "Leviatãs menores surgem.",
        "access": "Acesso por marés ocultas.",
        "worldImpact": "As águas recuam."
      },
      "velkaryn": {
        "name": "Velkaryn, Cavaleiro do Último Eclipse",
        "desc": "Juramento antigo em armadura quebrada.",
        "phase2": "Ergue a lâmina sem sombra.",
        "access": "Acesso no Fragmento.",
        "worldImpact": "O céu lembra os sobreviventes."
      },
      "skills": {
        "double_slash": "Corte duplo",
        "battle_cry": "Grito de batalha",
        "vine_whip": "Chicote de vinhas",
        "root_slam": "Impacto de raízes",
        "spore_cloud": "Nuvem de esporos",
        "mirror_image": "Imagem espelhada",
        "void_blast": "Explosão do vazio",
        "reflect": "Refletir",
        "crimson_fang": "Presa carmesim",
        "shadow_rush": "Investida sombria",
        "howl_of_ruin": "Uivo da ruína",
        "twin_shadow": "Sombra gêmea",
        "abyss_coil": "Elo abissal",
        "tidal_crush": "Esmagamento da maré",
        "depth_charge": "Carga das profundezas",
        "leviathan_roar": "Rugido do leviatã",
        "eclipse_slash": "Corte do eclipse",
        "void_parry": "Aparo do vazio",
        "knight_charge": "Carga do cavaleiro",
        "final_eclipse": "Eclipse final"
      }
    },
    "hiddenEvents": {
      "cursed_dungeon": {
        "name": "Masmorra amaldiçoada",
        "desc": "Entrada instável que muda de lugar.",
        "found": "Você encontrou a masmorra."
      },
      "ghost_npc": {
        "name": "Fantasma viajante",
        "desc": "Espírito com pistas de títulos.",
        "hint": "Procure-o na névoa."
      },
      "hidden_weapon": {
        "name": "Arma oculta",
        "desc": "Lâmina selada por uma história.",
        "hint": "Nem todo tesouro brilha."
      },
      "forbidden_boss": {
        "name": "Chefe proibido",
        "desc": "Desafio opcional sem punição.",
        "found": "O selo foi quebrado."
      },
      "monthly_eclipse": {
        "name": "Eclipse mensal",
        "desc": "Evento raro de encontros secretos.",
        "hint": "Olhe para o céu."
      },
      "wolf_tracks": {
        "name": "Rastros de lobo",
        "desc": "Pegadas levam a uma caça lendária.",
        "found": "Rastros de Azhur encontrados."
      },
      "dungeon_failure": {
        "name": "Fracasso ecoante",
        "desc": "A derrota ensina o padrão.",
        "hint": "Tente novamente sem punição."
      }
    },
    "panels": {
      "selectRegion": "Selecione uma região para iniciar o combate.",
      "goTravel": "Ir para VIAJAR",
      "soonDesc": "Este recurso estará disponível em breve.",
      "current": "Atual",
      "equippedItem": "Item equipado",
      "none": "Nenhum",
      "cost": "Custo",
      "free": "Grátis",
      "newRumors": "Novos rumores",
      "seen": "Visto",
      "notSeen": "Novo",
      "dialogue": "Diálogo",
      "available": "Disponível",
      "requirement": "Requisito",
      "minLevel": "Nível mínimo",
      "all": "Tudo"
    },
    "app": {
      "initializing": "Inicializando Eclipsia..."
    },
    "monsters": {
      "rat": {
        "name": "Rato"
      },
      "goblin": {
        "name": "Goblin"
      },
      "wolf_pup": {
        "name": "Filhote de Lobo"
      },
      "bandit_leader": {
        "name": "Líder dos Bandidos"
      },
      "mist_wolf": {
        "name": "Lobo da Névoa"
      },
      "shadow_sprite": {
        "name": "Fada Sombria"
      },
      "forest_golem": {
        "name": "Golem da Floresta"
      },
      "root_guardian": {
        "name": "Guardião das Raízes"
      },
      "sand_scorpion": {
        "name": "Escorpião de Areia"
      },
      "mirage_beast": {
        "name": "Fera da Miragem"
      },
      "dune_crawler": {
        "name": "Rastejante das Dunas"
      },
      "sea_wraith": {
        "name": "Espectro Marinho"
      },
      "deep_leviathan_jr": {
        "name": "Leviatã Jovem das Profundezas"
      },
      "storm_harpy": {
        "name": "Harpia da Tempestade"
      },
      "cloud_titan": {
        "name": "Titã das Nuvens"
      }
    },
    "sync": {
      "saving": "💾 Salvando...",
      "saved": "✅ Salvo",
      "error": "❌ Erro"
    },
    "socket": {
      "bossDefeated": "Chefe derrotado",
      "colossusSpawned": "Colosso surgiu",
      "online": "Jogadores online",
      "newMail": "Nova carta recebida",
      "itemSold": "Item vendido no mercado"
    },
    "auth": {
      "invalidUsername": "Usuário deve ter 3 a 20 caracteres.",
      "invalidEmail": "Email inválido.",
      "invalidPassword": "Senha deve ter pelo menos 6 caracteres."
    }
  },
  "en-US": {
    "game": {
      "title": "ECLIPSIA",
      "subtitle": "Frontier of the Arcanes",
      "loading": "Loading...",
      "version": "Version",
      "confirm": "Confirm",
      "cancel": "Cancel",
      "back": "Back",
      "save": "Save",
      "close": "Close",
      "yes": "Yes",
      "no": "No",
      "ok": "OK",
      "soon": "Soon",
      "locked": "Locked",
      "unknown": "Unknown",
      "level": "Level",
      "lvl": "Lv.",
      "rank": "Rank",
      "new": "New"
    },
    "login": {
      "title": "Log in to Eclipsia",
      "subtitle": "The arcane frontier awaits.",
      "user": "User",
      "userPlaceholder": "Enter your username",
      "passPLaceholder": "Enter your password",
      "enter": "Enter",
      "register": "Register",
      "forgotPass": "Forgot password",
      "noAccount": "No account yet?",
      "hasAccount": "Already have an account?",
      "loginError": "Invalid username or password.",
      "registerSuccess": "Account created successfully.",
      "language": "Language",
      "pass": "Password",
      "email": "Email",
      "emailPlaceholder": "Enter your email",
      "loginTab": "LOGIN",
      "registerTab": "CREATE ACCOUNT"
    },
    "register": {
      "username": "Username",
      "usernamePlaceholder": "Choose a username",
      "confirmPass": "Confirm password",
      "create": "Create account",
      "passwordMismatch": "Passwords do not match."
    },
    "charCreate": {
      "title": "Create character",
      "subtitle": "Choose your arcane origin.",
      "nameLabel": "Character name",
      "namePlaceholder": "Enter the name",
      "nameError": "Invalid name.",
      "nameTaken": "Name already taken.",
      "archetypeTitle": "Archetype",
      "archetypeHint": "Each archetype changes attributes and combat.",
      "confirm": "Confirm",
      "stats": {
        "atk": "Attack",
        "def": "Defense",
        "arc": "Arcane"
      },
      "archetypes": {
        "blade": {
          "name": "Blade",
          "desc": "Speed and precision"
        },
        "arcane": {
          "name": "Arcane",
          "desc": "Magic power and destruction"
        },
        "druid": {
          "name": "Druid",
          "desc": "Healing and nature control"
        },
        "vanguard": {
          "name": "Vanguard",
          "desc": "Defense and protection"
        },
        "ranger": {
          "name": "Marksman",
          "desc": "Range and mobility"
        },
        "spectre": {
          "name": "Spectre",
          "desc": "Stealth and poison"
        }
      },
      "destinyTitle": "Choose Your Destiny",
      "awaken": "AWAKEN IN ECLIPSIA",
      "nameRequired": "Name is required and must be 3 to 20 characters.",
      "archetypeRequired": "Choose an archetype."
    },
    "charSelect": {
      "title": "Select character",
      "subtitle": "Choose who crosses the frontier.",
      "play": "Play",
      "addParty": "Add to party",
      "removeParty": "Remove from party",
      "manageParty": "Manage party",
      "cancelParty": "Cancel party",
      "enterGame": "Enter game",
      "createNew": "Create new",
      "slotsLeft": "Slots left",
      "confirmDelete": "Confirm deletion",
      "chars": "chars",
      "activeBadge": "ACTIVE",
      "partyBadge": "PARTY",
      "delete": "Delete",
      "noCharacters": "No characters created.",
      "partyFull": "Party full.",
      "selectCharacter": "Select a character."
    },
    "header": {
      "gold": "Gold",
      "crystalsHint": "Crystals: premium currency used in the world market and between players",
      "settings": "Settings"
    },
    "nav": {
      "hub": "Hub",
      "travel": "Travel",
      "hunt": "Hunt",
      "items": "Items",
      "profile": "Profile"
    },
    "hub": {
      "travel": "Travel",
      "hunt": "Hunt",
      "city": "City",
      "items": "Items",
      "profile": "Profile",
      "quests": "Quests",
      "ranking": "Ranking",
      "guild": "Guild",
      "chat": "Chat",
      "charges": "Charges"
    },
    "travel": {
      "title": "Travel",
      "regions": {
        "_self": "Regions",
        "valedouro": {
          "name": "Valedouro",
          "level": "Level 1",
          "desc": "Golden fields and old ruins."
        },
        "nythera": {
          "name": "Nythera Forest",
          "level": "Level 10",
          "desc": "Night forest of whispering roots."
        },
        "ormara": {
          "name": "Ormara Desert",
          "level": "Level 20",
          "desc": "Coast of arcane tides."
        },
        "abissal": {
          "name": "Abyssal Coast",
          "level": "Level 30",
          "desc": "Dark tear between worlds."
        },
        "ceupartido": {
          "name": "Split Sky",
          "level": "Level 40",
          "desc": "Floating islands under storms."
        },
        "fragmento": {
          "name": "???",
          "level": "Level 50",
          "desc": "The edge where reality breaks."
        }
      },
      "dungeons": {
        "_self": "Dungeons",
        "cripta": {
          "name": "Veiled Crypt",
          "level": "Level 5",
          "floors": "Floors",
          "region": "Valedouro"
        },
        "secret": {
          "name": "Secret Dungeon",
          "level": "Variable level",
          "desc": "Rare entrance revealed by hidden events."
        },
        "bandit_camp": { "name": "Bandit Camp", "desc": "Bandits plunder the roads of Valedouro. Their leader waits on the last floor." },
        "root_crypt": { "name": "Root Crypt", "desc": "Forest roots have overtaken an ancient crypt. The Guardian stirs." },
        "mirror_sanctum": { "name": "Mirror Sanctum", "desc": "A cursed mirror traps hungry reflections in the depths of Nythera." },
        "azhur_pit": { "name": "Pit of Azhur", "desc": "In the dunes of Ormara, the sand swallowed a pit where Azhur devours the weak." },
        "velkaryn_spire": { "name": "Velkaryn's Spire", "desc": "Above the clouds of Skyrent, the spire guards Velkaryn's secrets." },
        "thal_mora_abyss": { "name": "Thal'Mora's Abyss", "desc": "In the abyssal depths, Thal'Mora sings to drown the unwary." },
        "fragment_nexus": { "name": "Fragment Nexus", "desc": "The shattered heart of Eclipsia beats behind the veil. Only the awakened find it." }
      },
      "enter": "Enter",
      "go": "Go",
      "locked": "Locked",
      "requireLevel": "Requires level",
      "requireTitle": "Requires title",
      "requireQuest": "Requires quest",
      "requireUnknown": "Unknown requirement",
      "tabs": {
        "regions": "REGIONS",
        "dungeons": "DUNGEONS"
      },
      "requirements": {
        "portador": "Bearer title",
        "specialQuest": "Special quest",
        "eclipseAwakened": "eclipse_awakened title",
        "hidden": "Hidden condition"
      },
      "regionRanges": {
        "valedouro": "Lv 1-10",
        "nythera": "Lv 10-25",
        "ormara": "Lv 25-40",
        "abissal": "Lv 40-55",
        "ceupartido": "Lv 55-70",
        "fragmento": "Lv ???"
      },
      "dungeonInfo": {
        "rootCrypt": {
          "name": "Root Crypt",
          "level": "Lv 15+",
          "floors": "10 floors",
          "region": "Nythera"
        },
        "hidden": {
          "name": "???",
          "condition": "Hidden condition"
        }
      },
      "dungeonFloors": "floors",
      "dungeonBoss": "Boss",
      "dungeonReward": "Reward",

    },
    "combat": {
      "title": "Combat",
      "dungeonCleared": "Dungeon cleared!",
      "attack": "Attack",
      "defend": "Defend",
      "skills": "Skills",
      "flee": "Flee",
      "log": {
        "_self": "Log",
        "title": "Combat log",
        "playerUsed": "You used {skill}.",
        "enemyUsed": "The enemy used {skill}.",
        "playerDealt": "You dealt {damage} damage.",
        "playerTook": "You took {damage} damage.",
        "damage": "Damage",
        "critical": "Critical!",
        "missed": "Missed!",
        "defended": "You defended.",
        "fled": "You fled.",
        "victory": "Victory achieved.",
        "levelUp": "You leveled up!"
      },
      "autoFight": "Auto Fight",
      "autoAdvance": "Auto Advance",
      "on": "On",
      "off": "Off",
      "floor": "Floor",
      "vs": "vs",
      "victory": "Victory",
      "defeat": "Defeat",
      "fled": "You fled.",
      "defeatMsg": "You fell with no penalty. HP and MP will be restored.",
      "tryAgain": "Try again",
      "collectLoot": "Collect loot",
      "nextFloor": "Next floor",
      "autoConfig": {
        "title": "Auto configuration",
        "mpThreshold": "MP threshold",
        "stopBoss": "Stop at bosses",
        "stopEvent": "Stop at events",
        "lootFilter": "Loot filter",
        "lootAll": "Loot all",
        "lootUncommon": "Uncommon or better",
        "lootRare": "Rare or better",
        "lootEpic": "Epic or better",
        "save": "Save"
      },
      "skillsModal": "Skills",
      "autoConfigModal": "Auto configuration",
      "lootModal": "Loot",
      "noSkills": "No skills unlocked.",
      "noLoot": "No loot available."
    },
    "city": {
      "valedouro": "Valedouro",
      "valedouroDesc": "A pale-stone city surrounded by golden fields.",
      "tavern": "Tavern",
      "shop": "Shop",
      "blacksmith": "Blacksmith",
      "sage": "Sage",
      "board": "Board",
      "mail": "Mail",
      "tavernQuote": "Every journey begins with a story.",
      "clickToTalk": "Click to talk",
      "talk": "Talk",
      "askMore": "Ask more",
      "alreadyKnow": "You already know this rumor.",
      "shopAll": "All items",
      "buy": "Buy",
      "bought": "Bought",
      "blacksmithTitle": "Valedouro Forge",
      "blacksmithDesc": "Steel, runes, and patience create legends.",
      "upgrade": "Upgrade",
      "noEquipment": "No equipment.",
      "sageTitle": "Sage Archive",
      "sageDesc": "Safe arcane knowledge.",
      "learnSkill": "Learn skill",
      "resetStats": "Reset stats",
      "resetStatsDesc": "Recover assigned points.",
      "reset": "Reset",
      "boardTitle": "Quest board",
      "boardDesc": "Requests, hunts, and alerts.",
      "accept": "Accept",
      "tabs": {
        "tavern": "🍺 TAVERN",
        "shop": "🏪 SHOP",
        "blacksmith": "🔨 BLACKSMITH",
        "sage": "🧙 SAGE",
        "board": "📋 BOARD"
      },
      "filters": {
        "all": "All",
        "weapons": "Weapons",
        "armor": "Armor",
        "accessories": "Accessories",
        "pet": "Pet",
        "mount": "Mount"
      },
      "npcs": {
        "old_merchant": {
          "name": "Old Merchant"
        },
        "adventurer": {
          "name": "Adventurer"
        },
        "mysterious": {
          "name": "Hooded Figure"
        },
        "beast_tamer": {
          "name": "Beast Tamer"
        }
      },
      "dialogues": {
        "old_merchant": "Ancient coins remember roads maps forget.",
        "adventurer": "Nythera tests courage before it tests blades.",
        "mysterious": "Follow the veil when the moon denies its own shadow.",
        "beast_tamer": "Beasts respect patience more than strength."
      },
      "categories": "Categories",
      "price": "Price",
      "levelReq": "Minimum level",
      "canBuy": "Buy",
      "cantBuy": "Unavailable",
      "upgradeCost": "Upgrade cost",
      "resetCost": "Reset cost"
    },
    "tavern": {
      "npcs": {
        "old_merchant": "Old merchant",
        "adventurer": "Adventurer",
        "mysterious": "Mysterious figure",
        "beast_tamer": "Beast tamer"
      },
      "rumors": {
        "wolf_tracks": "Wolf tracks to the north.",
        "cursed_crypt": "The crypt answers dead names.",
        "nythera_night": "Nythera darkens early.",
        "forbidden_boss": "Forbidden bosses answer challenges.",
        "azhur_howl": "Azhur's howl snuffs torches.",
        "eclipse_secret": "The eclipse reveals invisible doors.",
        "spirit_stones": "Spirit stones choose the patient.",
        "party_power": "Groups advance farther but split XP.",
        "pet_secret": "Pets reveal hidden paths.",
        "rare_pets": "Rare pets avoid haste.",
        "mount_secret": "Mounts know shortcuts."
      }
    },
    "party": {
      "title": "Party",
      "setActive": "Set active",
      "remove": "Remove",
      "empty": "No members.",
      "levelReq": "Minimum level 10.",
      "xpInfo": "XP is reduced by group size.",
      "crossInfo": "You must reach the same region.",
      "xpMultiplier": "XP multiplier",
      "activate": "Activate",
      "dead": "Dead"
    },
    "partyReal": {
      "title": "Player group",
      "namePlaceholder": "Online player name",
      "invite": "Invite",
      "invitedBy": "Group invite from",
      "leave": "Leave group",
      "kick": "Kick",
      "kicked": "You were kicked from the group.",
      "declined": "Invite declined.",
      "failed": "Could not invite",
      "reason": { "offline": "player is offline", "busy": "already in a group", "full": "group is full", "not_leader": "only the leader can invite" }
    },
    "dailyQuests": {
      "claim": "Claim",
      "claimed": "Claimed",
      "cannot": "Daily quest not complete yet",
      "rewardReceived": "Daily reward claimed!",
      "daily_kills": { "name": "Hunter of the day: defeat 20 enemies" },
      "daily_explorer": { "name": "Explorer of the day: explore 15 times" },
      "daily_crafts": { "name": "Crafter of the day: forge 2 items" },
      "daily_dungeon": { "name": "Adventurer of the day: clear 3 dungeon floors" }
    },
    "pet": {
      "title": "Pet",
      "level": "Level",
      "ready": "Ready",
      "reviving": "Reviving",
      "noActive": "No active pet.",
      "abilities": {
        "nibble": "Nibble",
        "scout": "Scout",
        "wolf_bite": "Wolf Bite",
        "spikes": "Spikes",
        "honey_trail": "Honey Trail",
        "nature_heal": "Nature Heal",
        "shadow_nose": "Shadow Nose",
        "eagle_dive": "Eagle Dive",
        "stone_wall": "Stone Wall",
        "arcane_wisdom": "Arcane Wisdom",
        "dragon_claw": "Dragon Claw",
        "lucky_paw": "Lucky Paw",
        "eclipse_fang": "Eclipse Fang",
        "king_roar": "King Roar",
        "fragment_strike": "Fragment Strike"
      }
    },
    "mount": {
      "title": "Mount",
      "exploreTime": "Exploration time",
      "noActive": "No active mount."
    },
    "items": {
      "equipped": "Equipped",
      "bag": "Bag",
      "crafting": "Crafting",
      "market": "Market",
      "equip": "Equip",
      "unequip": "Unequip",
      "discard": "Discard",
      "compare": "Compare",
      "slots": {
        "_self": "Slots",
        "weapon_main": "Main weapon",
        "weapon_off": "Off-hand",
        "head": "Head",
        "chest": "Chest",
        "legs": "Legs",
        "gloves": "Gloves",
        "boots": "Boots",
        "earring": "Earring",
        "necklace": "Necklace",
        "belt": "Belt",
        "resistance": "Resistance",
        "amulet": "Amulet",
        "spirit_stone": "Spirit stone",
        "pet": "Pet",
        "mount": "Mount"
      },
      "empty": "No items.",
      "confirmDiscard": "Confirm discard?",
      "storageSlots": "storage slots",
      "storageEmpty": "Storage is empty.",
      "storageFull": "Storage full (500).",
      "bagFull": "Bag full (60).",
      "deposit": "Deposit",
      "withdraw": "Withdraw",
      "twoHanded": "Two-handed",
      "twoHandedWarning": "Removes the off-hand item.",
      "twoHandedBlocked": "Off-hand blocked by two-handed weapon.",
      "spiritStoneEffect": "Spirit stone effect",
      "stoneLevel": "Stone level",
      "group": {
        "weapons": "Weapons",
        "armor": "Armor",
        "accessories": "Accessories",
        "companions": "Companions"
      },
      "rarities": {
        "common": "Common",
        "uncommon": "Uncommon",
        "rare": "Rare",
        "epic": "Epic",
        "legendary": "Legendary",
        "relic": "Relic"
      },
      "spiritEffects": {
        "burn": "Burn",
        "freeze": "Freeze",
        "paralyze": "Paralyze",
        "regenerate": "Regenerate",
        "bleed": "Bleed",
        "mana_drain": "Mana drain",
        "all_boost": "All boost"
      },
      "tabs": {
        "equipped": "EQUIPPED",
        "bag": "BAG",
        "crafting": "CRAFTING",
        "market": "MARKET",
        "storage": "STORAGE"
      },
      "unknownItem": "Unknown item",
      "genericDesc": "An item found on the arcane frontier.",
      "mainStats": "Main stats",
      "effects": "Effects",
      "noEffects": "No effects",
      "itemCode": "Item code",
      "positive": "Positive",
      "negative": "Negative",
      "comparison": "Comparison",
      "currentEquipped": "Currently equipped",
      "twoHandedBadge": "2H",
      "slotEmpty": "Empty slot",
      "groups": {
        "weapons": "WEAPONS",
        "armor": "ARMOR",
        "accessories": "ACCESSORIES"
      },
      "defaultSlotIcons": {
        "weapon_main": "⚔",
        "weapon_off": "🛡",
        "head": "🎩",
        "chest": "🥋",
        "legs": "👖",
        "gloves": "🧤",
        "boots": "🥾",
        "earring": "💠",
        "necklace": "📿",
        "belt": "🧷",
        "resistance": "🔰",
        "amulet": "🔮",
        "spirit_stone": "💎",
        "pet": "🐾",
        "mount": "🐴"
      },
      "names": {
        "long_sword": "Long sword",
        "misty_ring": "Misty ring",
        "fortune_amulet": "Fortune amulet"
      }
    },
    "profile": {
      "title": "Profile",
      "status": "Status",
      "skills": "Skills",
      "titles": {
        "_self": "Titles",
        "locked": "Locked",
        "equipped": "Equipped",
        "equip": "Equip"
      },
      "freePoints": "Free points",
      "distribute": "Distribute",
      "equip": "Equip",
      "equipped": "Equipped",
      "stats": {
        "strength": "Strength",
        "agility": "Agility",
        "vitality": "Vitality",
        "arcana": "Arcana",
        "perception": "Perception",
        "will": "Will",
        "luck": "Luck"
      },
      "tabs": {
        "status": "STATUS",
        "skills": "SKILLS",
        "titles": "TITLES"
      },
      "skillInfo": {
        "mp": "MP",
        "cd": "CD"
      },
      "proficiencies": "Proficiencies",
      "titleNames": {
        "portador": "Bearer",
        "veil_tracker": "Veil Tracker",
        "eclipse_awakened": "Eclipse Awakened"
      }
    },
    "quests": {
      "title": "Quests",
      "active": "Active",
      "completed": "Completed",
      "reward": "Reward",
      "progress": "Progress",
      "details": "Details",
      "none": "No quests.",
      "secret": "Secret",
      "unknown": "Unknown",
      "hunt_wolves": {
        "name": "Wolf Hunt",
        "desc": "Protect Valedouro roads."
      },
      "explore_forest": {
        "name": "Explore the forest",
        "desc": "Investigate arcane marks."
      },
      "kill_boss": {
        "name": "Bring down the boss",
        "desc": "Defeat the region leader."
      },
      "tabs": {
        "daily": "DAILY",
        "active": "ACTIVE",
        "completed": "COMPLETE"
      },
      "viewDetails": "View details",
      "completedAt": "Completed at",
      "secretMystery": "Shadows of Nythera hide a nameless call.",
      "progressCounter": "Progress",
      "rewardXp": "XP",
      "rewardGold": "gold",
      "wolf_hunt_1": {
        "name": "Mist Wolf Hunt",
        "desc": "Kill 10 Mist Wolves."
      },
      "goblin_slayer": {
        "name": "Goblin Slayer",
        "desc": "Kill 15 Goblins."
      },
      "forest_explorer": {
        "name": "Nythera Explorer",
        "desc": "Explore Nythera 5 times."
      },
      "shadow_secret": {
        "name": "Shadow Secret",
        "desc": "Hidden quest unlocked by 3 discoveries in Nythera."
      },
      "mystery": "???",
      "itemLinkHint": "Tip: paste [item:numId|effect:value|...] to link an item — e.g. [item:1005|1:65|4:5|7:3]",
      "commandHint": "Commands: /invite <name> · /w <name> <msg> · /r <msg> · /p <msg> · /help — click a name for actions",
      "partyPrefix": "Party",
      "whisperFrom": "Whisper from",
      "whisperTo": "Whisper to",
      "whisperOffline": "Could not whisper — player offline",
      "inviteCard": "Party invite from",
      "inviteAnswered": "Invite answered.",
      "inviteSent": "Invite sent to",
      "presenceIn": "entered the frontier",
      "presenceOut": "left the frontier",
      "actionInvite": "Invite to party",
      "actionWhisper": "Whisper",
      "noReplyTarget": "No one to reply yet — use /w <name> <msg>",
      "badCommand": "Invalid command"
    },
    "mail": {
      "inbox": "Inbox",
      "unread": "unread",
      "empty": "No letters.",
      "compose": "New letter",
      "toPlaceholder": "Recipient name",
      "subjectPlaceholder": "Subject",
      "messagePlaceholder": "Message...",
      "noAttachment": "No attachment",
      "goldPlaceholder": "Gold (optional)",
      "crystalsPlaceholder": "💎 Crystals (optional)",
      "send": "Send",
      "sent": "Letter sent!",
      "claim": "Claim",
      "claimed": "Attachment claimed!",
      "from": "From",
      "noSubject": "(no subject)",
      "error": "Mail error",
      "noRecipient": "Recipient required",
      "offline": "Mail unavailable (server offline)."
    },
    "market": {
      "tabs": { "buy": "Buy", "sell": "Sell", "mine": "My listings" },
      "empty": "No listings.",
      "seller": "Seller",
      "buy": "Buy",
      "bought": "Purchased!",
      "listItem": "List for sale",
      "listed": "Listing created!",
      "price": "Price",
      "invalidPrice": "Invalid price",
      "cancel": "Cancel",
      "status": { "active": "Active", "sold": "Sold", "cancelled": "Cancelled" },
      "offline": "Market unavailable (server offline).",
      "error": "Market error",
      "taxNote": "Fees: 2 💎 listing fee (non-refundable) and 5% tax on sale.",
      "crystalsCurrency": "The world market uses 💎 Crystals (paid currency) — in-game gold stays protected from the player economy.",
    },
    "crafting": {
      "craft": "Forge",
      "cannot": "Requirements not met",
      "success": "Forged",
      "invFull": "Inventory full",
      "upgradeTitle": "Upgrade (+5% per level)",
      "selectItem": "Select item",
      "level": "Level",
      "upgrade": "Upgrade",
      "upgraded": "Upgraded",
      "enchantTitle": "Enchanting",
      "selectStone": "Select spirit stone",
      "enchant": "Enchant",
      "enchanted": "Enchanted"
    },
    "trade": {
      "title": "Player trade",
      "hint": "Trade items and gold directly with another online character. Max 3 items per side.",
      "targetPlaceholder": "Other character name",
      "request": "Request trade",
      "incoming": "Trade request from",
      "with": "Trading with",
      "addItem": "Add item",
      "confirm": "Confirm",
      "confirmHint": "Confirm when the offer is ready.",
      "waitingConfirm": "Waiting for the other player...",
      "completed": "Trade completed!",
      "declined": "Trade declined.",
      "cancelled": "Trade cancelled",
      "failed": "Trade failed"
    },

    "ranking": {
      "title": "Ranking",
      "level": "Level",
      "pvp": "PvP",
      "discovery": "Discovery",
      "you": "You",
      "soon": {
        "pvp": "PvP coming soon.",
        "discovery": "Discovery coming soon."
      },
      "tabs": {
        "level": "LEVEL",
        "pvp": "PVP",
        "discovery": "DISCOVERIES"
      },
      "loading": "Loading ranking...",
      "empty": "No ranking data.",
      "value": "Value",
      "position": "Position",
      "xp": "XP"
    },
    "guild": {
      "title": "Guild",
      "soon": "Guild system coming soon",
      "offline": "Guilds unavailable (server offline).",
      "createTitle": "Create guild",
      "namePlaceholder": "Guild name (3-24)",
      "create": "Create",
      "browse": "Existing guilds",
      "empty": "Nothing here yet.",
      "leaderLabel": "Leader",
      "membersWord": "members",
      "join": "Join",
      "yourRole": "Your role",
      "role": { "leader": "Leader", "officer": "Officer", "member": "Member" },
      "disband": "Disband",
      "leave": "Leave",
      "leaveConfirm": "Leave the guild?",
      "disbandConfirm": "Disband the guild? All members will be removed.",
      "motd": "Message of the day",
      "motdPlaceholder": "Write the guild message...",
      "saveMotd": "Save",
      "motdSaved": "Message saved!",
      "members": "Members",
      "promote": "Promote to officer",
      "demote": "Demote to member",
      "kick": "Kick",
      "chatTitle": "Guild chat",
      "chatPlaceholder": "Message the guild...",
      "error": "Guild operation error",
      "created": "Guild created!",
      "joined": "You joined the guild!",
      "disbanded": "Guild disbanded.",
      "removed": "You are no longer in the guild."
    },
    "chat": {
      "title": "Chat",
      "placeholder": "Type your message...",
      "send": "Send",
      "global": "Global",
      "guild": "Guild",
      "system": "System",
      "systemName": "System",
      "connected": "Connected to chat.",
      "disconnected": "Disconnected from chat.",
      "messageTooLong": "Message too long.",
      "empty": "Type a message."
    },
    "impulse": {
      "title": "Impulse",
      "absent": "Time away",
      "hours": "hours",
      "hour": "hour",
      "minutes": "minutes",
      "charges": "Charges",
      "hint": "Impulse helps without replacing progress.",
      "enter": "Enter",
      "names": {
        "1": "Arcane Breeze",
        "2": "Rekindled Flame",
        "3": "Lunar Rhythm",
        "4": "Partial Eclipse",
        "5": "Legendary Return"
      },
      "bonuses": {
        "xp": "XP",
        "gold": "Gold",
        "damage": "Damage",
        "defense": "Defense",
        "luck": "Luck"
      }
    },
    "loot": {
      "title": "Loot",
      "collectAll": "Collect all",
      "collected": "Collected"
    },
    "settings": {
      "title": "Settings",
      "language": "Language",
      "sound": "Sound",
      "music": "Music",
      "notifications": "Notifications",
      "save": "Save",
      "saved": "Settings saved.",
      "languageButtons": {
        "pt": "🇧🇷PT",
        "en": "🇺🇸EN",
        "es": "🇪🇸ES",
        "ja": "🇯🇵JA"
      }
    },
    "errors": {
      "generic": "Something went wrong.",
      "connection": "Connection error.",
      "session": "Session expired.",
      "inventoryFull": "Inventory full.",
      "notEnoughGold": "Not enough gold.",
      "levelRequired": "Level required.",
      "titleRequired": "Title required."
    },
    "notifications": {
      "levelUp": "You leveled up!",
      "newTitle": "New title!",
      "rareEvent": "Rare event!",
      "colossusSoon": "A colossus approaches.",
      "questComplete": "Quest complete!",
      "itemFound": "Item found!"
    },
    "skills": {
      "spin_slash": {
        "name": "Spin Slash",
        "desc": "Spins the blade to strike the enemy."
      },
      "dash_cut": {
        "name": "Dash Cut",
        "desc": "Rushes forward and cuts the target."
      },
      "bleed": {
        "name": "Bleed",
        "desc": "Deals damage over turns."
      },
      "execute": {
        "name": "Execute",
        "desc": "High damage against weak targets."
      },
      "arcane_burst": {
        "name": "Arcane Burst",
        "desc": "Releases arcane energy."
      },
      "ice_nova": {
        "name": "Ice Nova",
        "desc": "Freezes the air and deals damage."
      },
      "heal_pulse": {
        "name": "Heal Pulse",
        "desc": "Restores part of HP."
      },
      "root": {
        "name": "Root",
        "desc": "Binds the target with roots."
      },
      "thousand_cuts": {
        "name": "Thousand Cuts",
        "desc": "Sequence of fast strikes."
      },
      "blade_storm": {
        "name": "Blade Storm",
        "desc": "Dance of devastating cuts."
      },
      "chain_lightning": {
        "name": "Chain Lightning",
        "desc": "Lightning that jumps between targets."
      },
      "void_gate": {
        "name": "Void Gate",
        "desc": "Distorts defense and mana."
      },
      "thorns": {
        "name": "Thorns",
        "desc": "Retaliates against attacks."
      },
      "nature_burst": {
        "name": "Nature Burst",
        "desc": "Impact of wild energy."
      },
      "shield_bash": {
        "name": "Shield Bash",
        "desc": "Stuns with the shield."
      },
      "fortress": {
        "name": "Fortress",
        "desc": "Greatly increases defense."
      },
      "piercing_shot": {
        "name": "Piercing Shot",
        "desc": "Ignores part of defense."
      },
      "rain_of_arrows": {
        "name": "Rain of Arrows",
        "desc": "Fires several arrows."
      },
      "death_mark": {
        "name": "Death Mark",
        "desc": "Increases damage taken by the target."
      },
      "shadow_step": {
        "name": "Shadow Step",
        "desc": "Prepares a critical attack."
      }
    },
    "bosses": {
      "bandit_leader": {
        "name": "Bandit Leader",
        "desc": "Cunning raider of dirty strikes.",
        "phase2": "Calls reinforcements.",
        "enrage": "Enters rage."
      },
      "root_guardian": {
        "name": "Root Guardian",
        "desc": "Ancestral protector of Nythera.",
        "phase2": "Roots surround the arena.",
        "phase3": "The forest awakens.",
        "enrage": "Arcane sap boils."
      },
      "void_mirror": {
        "name": "Void Mirror",
        "desc": "Living reflection of fear and power.",
        "phase2": "The mirror duplicates itself."
      },
      "azhur": {
        "name": "Azhur, Wolf of the Eclipse",
        "desc": "Legendary beast of broken moons.",
        "phase2": "Vanishes into shadows.",
        "phase3": "The eclipse covers its fangs.",
        "enrage": "The howl shakes courage.",
        "access": "Access through secret tracks.",
        "worldImpact": "The roads fall silent."
      },
      "thal_mora": {
        "name": "Thal Mora, Voice of the Depths",
        "desc": "Abyssal presence of tides.",
        "phase2": "The arena sinks.",
        "phase3": "Lesser leviathans emerge.",
        "access": "Access through hidden tides.",
        "worldImpact": "The waters recede."
      },
      "velkaryn": {
        "name": "Velkaryn, Knight of the Last Eclipse",
        "desc": "Ancient oath in broken armor.",
        "phase2": "Raises the shadowless blade.",
        "access": "Access in the Fragment.",
        "worldImpact": "The sky remembers survivors."
      },
      "skills": {
        "double_slash": "Double Slash",
        "battle_cry": "Battle Cry",
        "vine_whip": "Vine Whip",
        "root_slam": "Root Slam",
        "spore_cloud": "Spore Cloud",
        "mirror_image": "Mirror Image",
        "void_blast": "Void Blast",
        "reflect": "Reflect",
        "crimson_fang": "Crimson Fang",
        "shadow_rush": "Shadow Rush",
        "howl_of_ruin": "Howl of Ruin",
        "twin_shadow": "Twin Shadow",
        "abyss_coil": "Abyss Coil",
        "tidal_crush": "Tidal Crush",
        "depth_charge": "Depth Charge",
        "leviathan_roar": "Leviathan Roar",
        "eclipse_slash": "Eclipse Slash",
        "void_parry": "Void Parry",
        "knight_charge": "Knight Charge",
        "final_eclipse": "Final Eclipse"
      }
    },
    "hiddenEvents": {
      "cursed_dungeon": {
        "name": "Cursed Dungeon",
        "desc": "Unstable entrance that changes place.",
        "found": "You found the dungeon."
      },
      "ghost_npc": {
        "name": "Traveling Ghost",
        "desc": "Spirit with title clues.",
        "hint": "Look in the fog."
      },
      "hidden_weapon": {
        "name": "Hidden Weapon",
        "desc": "Blade sealed by a story.",
        "hint": "Not every treasure shines."
      },
      "forbidden_boss": {
        "name": "Forbidden Boss",
        "desc": "Optional challenge with no penalty.",
        "found": "The seal was broken."
      },
      "monthly_eclipse": {
        "name": "Monthly Eclipse",
        "desc": "Rare event with secret encounters.",
        "hint": "Look at the sky."
      },
      "wolf_tracks": {
        "name": "Wolf Tracks",
        "desc": "Pawprints lead to a legendary hunt.",
        "found": "Azhur tracks found."
      },
      "dungeon_failure": {
        "name": "Echoing Failure",
        "desc": "Defeat teaches the pattern.",
        "hint": "Try again with no penalty."
      }
    },
    "panels": {
      "selectRegion": "Select a region to start combat.",
      "goTravel": "Go to TRAVEL",
      "soonDesc": "This feature will be available soon.",
      "current": "Current",
      "equippedItem": "Equipped item",
      "none": "None",
      "cost": "Cost",
      "free": "Free",
      "newRumors": "New rumors",
      "seen": "Seen",
      "notSeen": "New",
      "dialogue": "Dialogue",
      "available": "Available",
      "requirement": "Requirement",
      "minLevel": "Minimum level",
      "all": "All"
    },
    "app": {
      "initializing": "Initializing Eclipsia..."
    },
    "monsters": {
      "rat": {
        "name": "Rat"
      },
      "goblin": {
        "name": "Goblin"
      },
      "wolf_pup": {
        "name": "Wolf Pup"
      },
      "bandit_leader": {
        "name": "Bandit Leader"
      },
      "mist_wolf": {
        "name": "Mist Wolf"
      },
      "shadow_sprite": {
        "name": "Shadow Sprite"
      },
      "forest_golem": {
        "name": "Forest Golem"
      },
      "root_guardian": {
        "name": "Root Guardian"
      },
      "sand_scorpion": {
        "name": "Sand Scorpion"
      },
      "mirage_beast": {
        "name": "Mirage Beast"
      },
      "dune_crawler": {
        "name": "Dune Crawler"
      },
      "sea_wraith": {
        "name": "Sea Wraith"
      },
      "deep_leviathan_jr": {
        "name": "Young Deep Leviathan"
      },
      "storm_harpy": {
        "name": "Storm Harpy"
      },
      "cloud_titan": {
        "name": "Cloud Titan"
      }
    },
    "sync": {
      "saving": "💾 Saving...",
      "saved": "✅ Saved",
      "error": "❌ Error"
    },
    "socket": {
      "bossDefeated": "Boss defeated",
      "colossusSpawned": "Colossus spawned",
      "online": "Online players"
    },
    "auth": {
      "invalidUsername": "Username must be 3 to 20 characters.",
      "invalidEmail": "Invalid email.",
      "invalidPassword": "Password must be at least 6 characters."
    }
  },
  "es-ES": {
    "game": {
      "title": "ECLIPSIA",
      "subtitle": "Frontera de los Arcanos",
      "loading": "Cargando...",
      "version": "Versión",
      "confirm": "Confirmar",
      "cancel": "Cancelar",
      "back": "Volver",
      "save": "Guardar",
      "close": "Cerrar",
      "yes": "Sí",
      "no": "No",
      "ok": "OK",
      "soon": "Próximamente",
      "locked": "Bloqueado",
      "unknown": "Desconocido",
      "level": "Nivel",
      "lvl": "Nv.",
      "rank": "Rango",
      "new": "Nuevo"
    },
    "login": {
      "title": "Entrar en Eclipsia",
      "subtitle": "La frontera arcana espera.",
      "user": "Usuario",
      "userPlaceholder": "Introduce tu usuario",
      "passPLaceholder": "Introduce tu contraseña",
      "enter": "Entrar",
      "register": "Registrarse",
      "forgotPass": "Olvidé mi contraseña",
      "noAccount": "¿Aún no tienes cuenta?",
      "hasAccount": "¿Ya tienes cuenta?",
      "loginError": "Usuario o contraseña inválidos.",
      "registerSuccess": "Cuenta creada con éxito.",
      "language": "Idioma",
      "pass": "Contraseña",
      "email": "Email",
      "emailPlaceholder": "Introduce tu email",
      "loginTab": "LOGIN",
      "registerTab": "CREAR CUENTA"
    },
    "register": {
      "username": "Nombre de usuario",
      "usernamePlaceholder": "Elige un nombre",
      "confirmPass": "Confirmar contraseña",
      "create": "Crear cuenta",
      "passwordMismatch": "Las contraseñas no coinciden."
    },
    "charCreate": {
      "title": "Crear personaje",
      "subtitle": "Elige tu origen arcano.",
      "nameLabel": "Nombre del personaje",
      "namePlaceholder": "Introduce el nombre",
      "nameError": "Nombre inválido.",
      "nameTaken": "Nombre en uso.",
      "archetypeTitle": "Arquetipo",
      "archetypeHint": "Cada arquetipo cambia atributos y combate.",
      "confirm": "Confirmar",
      "stats": {
        "atk": "Ataque",
        "def": "Defensa",
        "arc": "Arcano"
      },
      "archetypes": {
        "blade": {
          "name": "Hoja",
          "desc": "Velocidad y precisión"
        },
        "arcane": {
          "name": "Arcano",
          "desc": "Poder mágico y destrucción"
        },
        "druid": {
          "name": "Druida",
          "desc": "Curación y control de la naturaleza"
        },
        "vanguard": {
          "name": "Vanguardia",
          "desc": "Defensa y protección"
        },
        "ranger": {
          "name": "Tirador",
          "desc": "Alcance y movilidad"
        },
        "spectre": {
          "name": "Espectro",
          "desc": "Sigilo y veneno"
        }
      },
      "destinyTitle": "Elige tu Destino",
      "awaken": "DESPERTAR EN ECLIPSIA",
      "nameRequired": "El nombre es obligatorio y debe tener de 3 a 20 caracteres.",
      "archetypeRequired": "Elige un arquetipo."
    },
    "charSelect": {
      "title": "Seleccionar personaje",
      "subtitle": "Elige quién cruzará la frontera.",
      "play": "Jugar",
      "addParty": "Añadir al grupo",
      "removeParty": "Quitar del grupo",
      "manageParty": "Gestionar grupo",
      "cancelParty": "Cancelar grupo",
      "enterGame": "Entrar al juego",
      "createNew": "Crear nuevo",
      "slotsLeft": "Espacios restantes",
      "confirmDelete": "Confirmar eliminación",
      "chars": "chars",
      "activeBadge": "ACTIVO",
      "partyBadge": "PARTY",
      "delete": "Eliminar",
      "noCharacters": "No hay personajes creados.",
      "partyFull": "Grupo lleno.",
      "selectCharacter": "Selecciona un personaje."
    },
    "header": {
      "gold": "Oro",
      "crystalsHint": "Cristales: moneda premium usada en el mercado mundial y entre jugadores",
      "settings": "Ajustes"
    },
    "nav": {
      "hub": "Centro",
      "travel": "Viaje",
      "hunt": "Caza",
      "items": "Objetos",
      "profile": "Perfil"
    },
    "hub": {
      "travel": "Viajar",
      "hunt": "Cazar",
      "city": "Ciudad",
      "items": "Objetos",
      "profile": "Perfil",
      "quests": "Misiones",
      "ranking": "Clasificación",
      "guild": "Gremio",
      "chat": "Chat",
      "charges": "Cargas"
    },
    "travel": {
      "title": "Viaje",
      "regions": {
        "_self": "Regiones",
        "valedouro": {
          "name": "Valedouro",
          "level": "Nivel 1",
          "desc": "Campos dorados y ruinas antiguas."
        },
        "nythera": {
          "name": "Bosque de Nythera",
          "level": "Nivel 10",
          "desc": "Bosque nocturno de raíces susurrantes."
        },
        "ormara": {
          "name": "Desierto de Ormara",
          "level": "Nivel 20",
          "desc": "Costa de mareas arcanas."
        },
        "abissal": {
          "name": "Costa Abisal",
          "level": "Nivel 30",
          "desc": "Desgarro oscuro entre mundos."
        },
        "ceupartido": {
          "name": "Cielo Partido",
          "level": "Nivel 40",
          "desc": "Islas suspendidas bajo tormentas."
        },
        "fragmento": {
          "name": "???",
          "level": "Nivel 50",
          "desc": "El límite donde la realidad se rompe."
        }
      },
      "dungeons": {
        "_self": "Mazmorras",
        "cripta": {
          "name": "Cripta Velada",
          "level": "Nivel 5",
          "floors": "Pisos",
          "region": "Valedouro"
        },
        "secret": {
          "name": "Mazmorra Secreta",
          "level": "Nivel variable",
          "desc": "Entrada rara revelada por eventos ocultos."
        },
        "bandit_camp": { "name": "Campamento de Bandidos", "desc": "Los bandidos saquean los caminos de Valedouro. Su líder espera en el último piso." },
        "root_crypt": { "name": "Cripta de las Raíces", "desc": "Las raíces del bosque invadieron una cripta antigua. El Guardián despierta." },
        "mirror_sanctum": { "name": "Santuario del Espejo", "desc": "Un espejo maldito atrapa reflejos hambrientos en las profundidades de Nythera." },
        "azhur_pit": { "name": "Foso de Azhur", "desc": "En las dunas de Ormara, la arena tragó un foso donde Azhur devora a los débiles." },
        "velkaryn_spire": { "name": "Pináculo de Velkaryn", "desc": "Sobre las nubes de Cielo Roto, el pináculo guarda los secretos de Velkaryn." },
        "thal_mora_abyss": { "name": "Abismo de Thal'Mora", "desc": "En las profundidades abisales, Thal'Mora canta para ahogar a los incautos." },
        "fragment_nexus": { "name": "Nexo del Fragmento", "desc": "El corazón roto de Eclipsia late tras el velo. Solo los despertados lo encuentran." }
      },
      "enter": "Entrar",
      "go": "Ir",
      "locked": "Bloqueado",
      "requireLevel": "Requiere nivel",
      "requireTitle": "Requiere título",
      "requireQuest": "Requiere misión",
      "requireUnknown": "Requisito desconocido",
      "tabs": {
        "regions": "REGIONES",
        "dungeons": "DUNGEONS"
      },
      "requirements": {
        "portador": "Título Portador",
        "specialQuest": "Misión especial",
        "eclipseAwakened": "Título eclipse_awakened",
        "hidden": "Condición oculta"
      },
      "regionRanges": {
        "valedouro": "Nv 1-10",
        "nythera": "Nv 10-25",
        "ormara": "Nv 25-40",
        "abissal": "Nv 40-55",
        "ceupartido": "Nv 55-70",
        "fragmento": "Nv ???"
      },
      "dungeonInfo": {
        "rootCrypt": {
          "name": "Cripta de la Raíz",
          "level": "Nv 15+",
          "floors": "10 pisos",
          "region": "Nythera"
        },
        "hidden": {
          "name": "???",
          "condition": "Condición oculta"
        }
      },
      "dungeonFloors": "pisos",
      "dungeonBoss": "Jefe",
      "dungeonReward": "Recompensa",

    },
    "combat": {
      "title": "Combate",
      "dungeonCleared": "¡Mazmorra completada!",
      "attack": "Atacar",
      "defend": "Defender",
      "skills": "Habilidades",
      "flee": "Huir",
      "log": {
        "_self": "Registro",
        "title": "Registro de combate",
        "playerUsed": "Usaste {skill}.",
        "enemyUsed": "El enemigo usó {skill}.",
        "playerDealt": "Causaste {damage} de daño.",
        "playerTook": "Recibiste {damage} de daño.",
        "damage": "Daño",
        "critical": "¡Crítico!",
        "missed": "¡Falló!",
        "defended": "Te defendiste.",
        "fled": "Huiste.",
        "victory": "Victoria lograda.",
        "levelUp": "¡Subiste de nivel!"
      },
      "autoFight": "Combate Auto",
      "autoAdvance": "Avance Auto",
      "on": "Activado",
      "off": "Desactivado",
      "floor": "Piso",
      "vs": "contra",
      "victory": "Victoria",
      "defeat": "Derrota",
      "fled": "Huiste.",
      "defeatMsg": "Caíste sin penalización. HP y MP serán restaurados.",
      "tryAgain": "Intentar de nuevo",
      "collectLoot": "Recoger botín",
      "nextFloor": "Siguiente piso",
      "autoConfig": {
        "title": "Configuración automática",
        "mpThreshold": "Límite de MP",
        "stopBoss": "Parar en jefes",
        "stopEvent": "Parar en eventos",
        "lootFilter": "Filtro de botín",
        "lootAll": "Recoger todo",
        "lootUncommon": "Incomún o mejor",
        "lootRare": "Raro o mejor",
        "lootEpic": "Épico o mejor",
        "save": "Guardar"
      },
      "skillsModal": "Habilidades",
      "autoConfigModal": "Configuración automática",
      "lootModal": "Botín",
      "noSkills": "No hay habilidades desbloqueadas.",
      "noLoot": "No hay botín disponible."
    },
    "city": {
      "valedouro": "Valedouro",
      "valedouroDesc": "Ciudad de piedra clara rodeada de campos dorados.",
      "tavern": "Taberna",
      "shop": "Tienda",
      "blacksmith": "Herrero",
      "sage": "Sabio",
      "board": "Tablón",
      "mail": "Correo",
      "tavernQuote": "Todo viaje empieza con una historia.",
      "clickToTalk": "Haz clic para hablar",
      "talk": "Hablar",
      "askMore": "Preguntar más",
      "alreadyKnow": "Ya conoces este rumor.",
      "shopAll": "Todos los objetos",
      "buy": "Comprar",
      "bought": "Comprado",
      "blacksmithTitle": "Forja de Valedouro",
      "blacksmithDesc": "Acero, runas y paciencia crean leyendas.",
      "upgrade": "Mejorar",
      "noEquipment": "Sin equipo.",
      "sageTitle": "Archivo del Sabio",
      "sageDesc": "Conocimiento arcano seguro.",
      "learnSkill": "Aprender habilidad",
      "resetStats": "Restablecer atributos",
      "resetStatsDesc": "Recupera puntos asignados.",
      "reset": "Restablecer",
      "boardTitle": "Tablón de misiones",
      "boardDesc": "Pedidos, cacerías y alertas.",
      "accept": "Aceptar",
      "tabs": {
        "tavern": "🍺 TABERNA",
        "shop": "🏪 TIENDA",
        "blacksmith": "🔨 HERRERO",
        "sage": "🧙 SABIO",
        "board": "📋 TABLÓN"
      },
      "filters": {
        "all": "Todo",
        "weapons": "Armas",
        "armor": "Armadura",
        "accessories": "Accesorios",
        "pet": "Mascota",
        "mount": "Montura"
      },
      "npcs": {
        "old_merchant": {
          "name": "Viejo Mercader"
        },
        "adventurer": {
          "name": "Aventurera"
        },
        "mysterious": {
          "name": "Figura Encapuchada"
        },
        "beast_tamer": {
          "name": "Domador de Bestias"
        }
      },
      "dialogues": {
        "old_merchant": "Las monedas antiguas recuerdan caminos que los mapas olvidan.",
        "adventurer": "Nythera prueba el valor antes que las hojas.",
        "mysterious": "Sigue el velo cuando la luna niegue su sombra.",
        "beast_tamer": "Las bestias respetan la paciencia más que la fuerza."
      },
      "categories": "Categorías",
      "price": "Precio",
      "levelReq": "Nivel mínimo",
      "canBuy": "Comprar",
      "cantBuy": "No disponible",
      "upgradeCost": "Costo de mejora",
      "resetCost": "Costo de reset"
    },
    "tavern": {
      "npcs": {
        "old_merchant": "Mercader antiguo",
        "adventurer": "Aventurera",
        "mysterious": "Figura misteriosa",
        "beast_tamer": "Domador de bestias"
      },
      "rumors": {
        "wolf_tracks": "Huellas de lobo al norte.",
        "cursed_crypt": "La cripta responde a nombres muertos.",
        "nythera_night": "Nythera oscurece pronto.",
        "forbidden_boss": "Jefes prohibidos aceptan desafíos.",
        "azhur_howl": "El aullido de Azhur apaga antorchas.",
        "eclipse_secret": "El eclipse revela puertas invisibles.",
        "spirit_stones": "Las piedras espirituales eligen pacientes.",
        "party_power": "Los grupos avanzan más, pero dividen XP.",
        "pet_secret": "Mascotas revelan caminos ocultos.",
        "rare_pets": "Mascotas raras evitan la prisa.",
        "mount_secret": "Monturas conocen atajos."
      }
    },
    "party": {
      "title": "Grupo",
      "setActive": "Definir activo",
      "remove": "Quitar",
      "empty": "Sin miembros.",
      "levelReq": "Nivel mínimo 10.",
      "xpInfo": "XP reducida por tamaño del grupo.",
      "crossInfo": "Debes alcanzar la misma región.",
      "xpMultiplier": "Multiplicador de XP",
      "activate": "Activar",
      "dead": "Muerto"
    },
    "partyReal": {
      "title": "Grupo de jugadores",
      "namePlaceholder": "Nombre del jugador en línea",
      "invite": "Invitar",
      "invitedBy": "Invitación de grupo de",
      "leave": "Salir del grupo",
      "kick": "Expulsar",
      "kicked": "Te expulsaron del grupo.",
      "declined": "Invitación rechazada.",
      "failed": "No se pudo invitar",
      "reason": { "offline": "jugador desconectado", "busy": "ya está en un grupo", "full": "grupo lleno", "not_leader": "solo el líder invita" }
    },
    "dailyQuests": {
      "claim": "Reclamar",
      "claimed": "Reclamada",
      "cannot": "Misión diaria aún incompleta",
      "rewardReceived": "¡Recompensa diaria reclamada!",
      "daily_kills": { "name": "Cazador del día: derrota 20 enemigos" },
      "daily_explorer": { "name": "Explorador del día: explora 15 veces" },
      "daily_crafts": { "name": "Artesano del día: forja 2 objetos" },
      "daily_dungeon": { "name": "Aventurero del día: avanza 3 pisos de mazmorra" }
    },
    "pet": {
      "title": "Mascota",
      "level": "Nivel",
      "ready": "Lista",
      "reviving": "Reviviendo",
      "noActive": "Sin mascota activa.",
      "abilities": {
        "nibble": "Mordisquito",
        "scout": "Explorar",
        "wolf_bite": "Mordida de lobo",
        "spikes": "Espinas",
        "honey_trail": "Rastro de miel",
        "nature_heal": "Cura natural",
        "shadow_nose": "Olfato sombrío",
        "eagle_dive": "Picado de águila",
        "stone_wall": "Muro de piedra",
        "arcane_wisdom": "Sabiduría arcana",
        "dragon_claw": "Garra de dragón",
        "lucky_paw": "Pata afortunada",
        "eclipse_fang": "Colmillo del eclipse",
        "king_roar": "Rugido real",
        "fragment_strike": "Golpe fragmentado"
      }
    },
    "mount": {
      "title": "Montura",
      "exploreTime": "Tiempo de exploración",
      "noActive": "Sin montura activa."
    },
    "items": {
      "equipped": "Equipado",
      "bag": "Bolsa",
      "crafting": "Fabricación",
      "market": "Mercado",
      "equip": "Equipar",
      "unequip": "Desequipar",
      "discard": "Descartar",
      "compare": "Comparar",
      "slots": {
        "_self": "Espacios",
        "weapon_main": "Arma principal",
        "weapon_off": "Mano secundaria",
        "head": "Cabeza",
        "chest": "Pecho",
        "legs": "Piernas",
        "gloves": "Guantes",
        "boots": "Botas",
        "earring": "Pendiente",
        "necklace": "Collar",
        "belt": "Cinturón",
        "resistance": "Resistencia",
        "amulet": "Amuleto",
        "spirit_stone": "Piedra espiritual",
        "pet": "Mascota",
        "mount": "Montura"
      },
      "empty": "Sin objetos.",
      "confirmDiscard": "¿Confirmar descarte?",
      "storageSlots": "ranuras del baúl",
      "storageEmpty": "Baúl vacío.",
      "storageFull": "Baúl lleno (500).",
      "bagFull": "Mochila llena (60).",
      "deposit": "Depositar",
      "withdraw": "Retirar",
      "twoHanded": "Dos manos",
      "twoHandedWarning": "Retira la mano secundaria.",
      "twoHandedBlocked": "Mano secundaria bloqueada por arma de dos manos.",
      "spiritStoneEffect": "Efecto de piedra espiritual",
      "stoneLevel": "Nivel de la piedra",
      "group": {
        "weapons": "Armas",
        "armor": "Armaduras",
        "accessories": "Accesorios",
        "companions": "Compañeros"
      },
      "rarities": {
        "common": "Común",
        "uncommon": "Incomún",
        "rare": "Raro",
        "epic": "Épico",
        "legendary": "Legendario",
        "relic": "Reliquia"
      },
      "spiritEffects": {
        "burn": "Quemar",
        "freeze": "Congelar",
        "paralyze": "Paralizar",
        "regenerate": "Regenerar",
        "bleed": "Sangrar",
        "mana_drain": "Drenar maná",
        "all_boost": "Impulso total"
      },
      "tabs": {
        "equipped": "EQUIPADO",
        "bag": "MOCHILA",
        "crafting": "CRAFTING",
        "market": "MERCADO",
        "storage": "BAÚL"
      },
      "unknownItem": "Objeto desconocido",
      "genericDesc": "Un objeto encontrado en la frontera arcana.",
      "mainStats": "Stats principales",
      "effects": "Efectos",
      "noEffects": "Sin efectos",
      "itemCode": "Código del objeto",
      "positive": "Positivo",
      "negative": "Negativo",
      "comparison": "Comparación",
      "currentEquipped": "Equipado actual",
      "twoHandedBadge": "2H",
      "slotEmpty": "Espacio vacío",
      "groups": {
        "weapons": "ARMAS",
        "armor": "ARMADURA",
        "accessories": "ACCESORIOS"
      },
      "defaultSlotIcons": {
        "weapon_main": "⚔",
        "weapon_off": "🛡",
        "head": "🎩",
        "chest": "🥋",
        "legs": "👖",
        "gloves": "🧤",
        "boots": "🥾",
        "earring": "💠",
        "necklace": "📿",
        "belt": "🧷",
        "resistance": "🔰",
        "amulet": "🔮",
        "spirit_stone": "💎",
        "pet": "🐾",
        "mount": "🐴"
      },
      "names": {
        "long_sword": "Espada larga",
        "misty_ring": "Anillo nebuloso",
        "fortune_amulet": "Amuleto de la fortuna"
      },
      "itemLinkHint": "Consejo: pega [item:numId|efecto:valor|...] para enlazar un objeto — ej.: [item:1005|1:65|4:5|7:3]",
      "commandHint": "Comandos: /invite <nombre> · /w <nombre> <msg> · /r <msg> · /p <msg> · /help — haz clic en un nombre para acciones",
      "partyPrefix": "Grupo",
      "whisperFrom": "Susurro de",
      "whisperTo": "Susurro a",
      "whisperOffline": "No se pudo susurrar: jugador desconectado",
      "inviteCard": "Invitación de grupo de",
      "inviteAnswered": "Invitación respondida.",
      "inviteSent": "Invitación enviada a",
      "presenceIn": "entró en la frontera",
      "presenceOut": "salió de la frontera",
      "actionInvite": "Invitar al grupo",
      "actionWhisper": "Susurrar",
      "noReplyTarget": "Nadie a quien responder aún — usa /w <nombre> <msg>",
      "badCommand": "Comando inválido"
    },
    "mail": {
      "inbox": "Buzón",
      "unread": "no leídas",
      "empty": "No hay cartas.",
      "compose": "Nueva carta",
      "toPlaceholder": "Nombre del destinatario",
      "subjectPlaceholder": "Asunto",
      "messagePlaceholder": "Mensaje...",
      "noAttachment": "Sin adjunto",
      "goldPlaceholder": "Oro (opcional)",
      "crystalsPlaceholder": "💎 Cristales (opcional)",
      "send": "Enviar",
      "sent": "¡Carta enviada!",
      "claim": "Reclamar",
      "claimed": "¡Adjunto reclamado!",
      "from": "De",
      "noSubject": "(sin asunto)",
      "error": "Error de correo",
      "noRecipient": "Indica el destinatario",
      "offline": "Correo no disponible (servidor offline)."
    },
    "market": {
      "tabs": { "buy": "Comprar", "sell": "Vender", "mine": "Mis ofertas" },
      "empty": "No hay ofertas.",
      "seller": "Vendedor",
      "buy": "Comprar",
      "bought": "¡Compra realizada!",
      "listItem": "Poner a la venta",
      "listed": "¡Oferta creada!",
      "price": "Precio",
      "invalidPrice": "Precio inválido",
      "cancel": "Cancelar",
      "status": { "active": "Activa", "sold": "Vendida", "cancelled": "Cancelada" },
      "offline": "Mercado no disponible (servidor offline).",
      "error": "Error de mercado",
      "taxNote": "Tasas: 2 💎 por listar (no reembolsable) y 5% sobre la venta.",
      "crystalsCurrency": "El mercado mundial usa 💎 Cristales (moneda de pago): el oro del juego queda protegido de la economía entre jugadores.",
    },
    "crafting": {
      "craft": "Forjar",
      "cannot": "Requisitos insuficientes",
      "success": "Forjado",
      "invFull": "Inventario lleno",
      "upgradeTitle": "Mejora (+5% por nivel)",
      "selectItem": "Seleccionar objeto",
      "level": "Nivel",
      "upgrade": "Mejorar",
      "upgraded": "Mejorado",
      "enchantTitle": "Encantamiento",
      "selectStone": "Seleccionar piedra espiritual",
      "enchant": "Encantar",
      "enchanted": "Encantado"
    },
    "trade": {
      "title": "Intercambio entre jugadores",
      "hint": "Intercambia objetos y oro directamente con otro personaje en línea. Máx. 3 objetos por lado.",
      "targetPlaceholder": "Nombre del otro personaje",
      "request": "Pedir intercambio",
      "incoming": "Pedido de intercambio de",
      "with": "Intercambiando con",
      "addItem": "Añadir objeto",
      "confirm": "Confirmar",
      "confirmHint": "Confirma cuando la oferta esté lista.",
      "waitingConfirm": "Esperando al otro jugador...",
      "completed": "¡Intercambio completado!",
      "declined": "Intercambio rechazado.",
      "cancelled": "Intercambio cancelado",
      "failed": "Fallo en el intercambio"
    },

    "profile": {
      "title": "Perfil",
      "status": "Estado",
      "skills": "Habilidades",
      "titles": {
        "_self": "Títulos",
        "locked": "Bloqueado",
        "equipped": "Equipado",
        "equip": "Equipar"
      },
      "freePoints": "Puntos libres",
      "distribute": "Distribuir",
      "equip": "Equipar",
      "equipped": "Equipado",
      "stats": {
        "strength": "Fuerza",
        "agility": "Agilidad",
        "vitality": "Vitalidad",
        "arcana": "Arcana",
        "perception": "Percepción",
        "will": "Voluntad",
        "luck": "Suerte"
      },
      "tabs": {
        "status": "ESTADO",
        "skills": "SKILLS",
        "titles": "TÍTULOS"
      },
      "skillInfo": {
        "mp": "MP",
        "cd": "CD"
      },
      "proficiencies": "Pericias",
      "titleNames": {
        "portador": "Portador",
        "veil_tracker": "Rastreador del Velo",
        "eclipse_awakened": "Despierto del Eclipse"
      }
    },
    "quests": {
      "title": "Misiones",
      "active": "Activas",
      "completed": "Completadas",
      "reward": "Recompensa",
      "progress": "Progreso",
      "details": "Detalles",
      "none": "Sin misiones.",
      "secret": "Secreta",
      "unknown": "Desconocida",
      "hunt_wolves": {
        "name": "Caza de lobos",
        "desc": "Protege los caminos de Valedouro."
      },
      "explore_forest": {
        "name": "Explorar el bosque",
        "desc": "Investiga marcas arcanas."
      },
      "kill_boss": {
        "name": "Derrotar al jefe",
        "desc": "Derrota al líder regional."
      },
      "tabs": {
        "daily": "DIARIAS",
        "active": "ACTIVAS",
        "completed": "COMPLETAS"
      },
      "viewDetails": "Ver detalles",
      "completedAt": "Completada el",
      "secretMystery": "Las sombras de Nythera ocultan un llamado sin nombre.",
      "progressCounter": "Progreso",
      "rewardXp": "XP",
      "rewardGold": "oro",
      "wolf_hunt_1": {
        "name": "Caza de Lobos de Niebla",
        "desc": "Matar 10 Lobos de Niebla."
      },
      "goblin_slayer": {
        "name": "Exterminador de Goblins",
        "desc": "Matar 15 Goblins."
      },
      "forest_explorer": {
        "name": "Explorador de Nythera",
        "desc": "Explorar Nythera 5 veces."
      },
      "shadow_secret": {
        "name": "Secreto de las Sombras",
        "desc": "Misión oculta desbloqueada por 3 descubrimientos en Nythera."
      },
      "mystery": "???"
    },
    "ranking": {
      "title": "Clasificación",
      "level": "Nivel",
      "pvp": "JcJ",
      "discovery": "Descubrimiento",
      "you": "Tú",
      "soon": {
        "pvp": "JcJ próximamente.",
        "discovery": "Descubrimiento próximamente."
      },
      "tabs": {
        "level": "NIVEL",
        "pvp": "PVP",
        "discovery": "DESCUBRIMIENTOS"
      },
      "loading": "Cargando clasificación...",
      "empty": "Sin datos de clasificación.",
      "value": "Valor",
      "position": "Posición",
      "xp": "XP"
    },
    "guild": {
      "title": "Gremio",
      "soon": "Sistema de gremios próximamente",
      "offline": "Gremios no disponibles (servidor offline).",
      "createTitle": "Crear gremio",
      "namePlaceholder": "Nombre del gremio (3-24)",
      "create": "Crear",
      "browse": "Gremios existentes",
      "empty": "Nada por aquí todavía.",
      "leaderLabel": "Líder",
      "membersWord": "miembros",
      "join": "Unirse",
      "yourRole": "Tu cargo",
      "role": { "leader": "Líder", "officer": "Oficial", "member": "Miembro" },
      "disband": "Disolver",
      "leave": "Salir",
      "leaveConfirm": "¿Salir del gremio?",
      "disbandConfirm": "¿Disolver el gremio? Se eliminarán todos los miembros.",
      "motd": "Mensaje del día",
      "motdPlaceholder": "Escribe el mensaje del gremio...",
      "saveMotd": "Guardar",
      "motdSaved": "¡Mensaje guardado!",
      "members": "Miembros",
      "promote": "Ascender a oficial",
      "demote": "Degradar a miembro",
      "kick": "Expulsar",
      "chatTitle": "Chat del gremio",
      "chatPlaceholder": "Mensaje para el gremio...",
      "error": "Error en la operación del gremio",
      "created": "¡Gremio creado!",
      "joined": "¡Te uniste al gremio!",
      "disbanded": "Gremio disuelto.",
      "removed": "Ya no estás en el gremio."
    },
    "chat": {
      "title": "Chat",
      "placeholder": "Escribe tu mensaje...",
      "send": "Enviar",
      "global": "Global",
      "guild": "Gremio",
      "system": "Sistema",
      "systemName": "Sistema",
      "connected": "Conectado al chat.",
      "disconnected": "Desconectado del chat.",
      "messageTooLong": "Mensaje demasiado largo.",
      "empty": "Escribe un mensaje."
    },
    "impulse": {
      "title": "Impulso",
      "absent": "Tiempo ausente",
      "hours": "horas",
      "hour": "hora",
      "minutes": "minutos",
      "charges": "Cargas",
      "hint": "El impulso ayuda sin sustituir progreso.",
      "enter": "Entrar",
      "names": {
        "1": "Brisa Arcana",
        "2": "Llama Reavivada",
        "3": "Ritmo Lunar",
        "4": "Eclipse Parcial",
        "5": "Regreso Legendario"
      },
      "bonuses": {
        "xp": "XP",
        "gold": "Oro",
        "damage": "Daño",
        "defense": "Defensa",
        "luck": "Suerte"
      }
    },
    "loot": {
      "title": "Botín",
      "collectAll": "Recoger todo",
      "collected": "Recogido"
    },
    "settings": {
      "title": "Ajustes",
      "language": "Idioma",
      "sound": "Sonido",
      "music": "Música",
      "notifications": "Notificaciones",
      "save": "Guardar",
      "saved": "Ajustes guardados.",
      "languageButtons": {
        "pt": "🇧🇷PT",
        "en": "🇺🇸EN",
        "es": "🇪🇸ES",
        "ja": "🇯🇵JA"
      }
    },
    "errors": {
      "generic": "Algo salió mal.",
      "connection": "Error de conexión.",
      "session": "Sesión expirada.",
      "inventoryFull": "Inventario lleno.",
      "notEnoughGold": "Oro insuficiente.",
      "levelRequired": "Nivel necesario.",
      "titleRequired": "Título necesario."
    },
    "notifications": {
      "levelUp": "¡Subiste de nivel!",
      "newTitle": "¡Nuevo título!",
      "rareEvent": "¡Evento raro!",
      "colossusSoon": "Un coloso se acerca.",
      "questComplete": "¡Misión completada!",
      "itemFound": "¡Objeto encontrado!"
    },
    "skills": {
      "spin_slash": {
        "name": "Corte giratorio",
        "desc": "Gira la hoja contra el enemigo."
      },
      "dash_cut": {
        "name": "Corte veloz",
        "desc": "Avanza y corta el objetivo."
      },
      "bleed": {
        "name": "Sangrado",
        "desc": "Causa daño por turnos."
      },
      "execute": {
        "name": "Ejecutar",
        "desc": "Daño alto contra objetivos débiles."
      },
      "arcane_burst": {
        "name": "Estallido arcano",
        "desc": "Libera energía arcana."
      },
      "ice_nova": {
        "name": "Nova de hielo",
        "desc": "Congela el aire y causa daño."
      },
      "heal_pulse": {
        "name": "Pulso de curación",
        "desc": "Restaura parte del HP."
      },
      "root": {
        "name": "Enraizar",
        "desc": "Ata con raíces."
      },
      "thousand_cuts": {
        "name": "Mil cortes",
        "desc": "Secuencia de golpes rápidos."
      },
      "blade_storm": {
        "name": "Tormenta de hojas",
        "desc": "Danza de cortes devastadores."
      },
      "chain_lightning": {
        "name": "Relámpago en cadena",
        "desc": "Rayo que salta entre objetivos."
      },
      "void_gate": {
        "name": "Portal del vacío",
        "desc": "Distorsiona defensa y maná."
      },
      "thorns": {
        "name": "Espinas",
        "desc": "Contraataca ataques recibidos."
      },
      "nature_burst": {
        "name": "Estallido natural",
        "desc": "Impacto de energía salvaje."
      },
      "shield_bash": {
        "name": "Golpe de escudo",
        "desc": "Aturde con el escudo."
      },
      "fortress": {
        "name": "Fortaleza",
        "desc": "Aumenta mucho la defensa."
      },
      "piercing_shot": {
        "name": "Disparo perforante",
        "desc": "Ignora parte de la defensa."
      },
      "rain_of_arrows": {
        "name": "Lluvia de flechas",
        "desc": "Dispara varias flechas."
      },
      "death_mark": {
        "name": "Marca de muerte",
        "desc": "Aumenta el daño recibido."
      },
      "shadow_step": {
        "name": "Paso sombrío",
        "desc": "Prepara un ataque crítico."
      }
    },
    "bosses": {
      "bandit_leader": {
        "name": "Líder de los Bandidos",
        "desc": "Saqueador astuto de golpes sucios.",
        "phase2": "Llama refuerzos.",
        "enrage": "Entra en furia."
      },
      "root_guardian": {
        "name": "Guardián de las Raíces",
        "desc": "Protector ancestral de Nythera.",
        "phase2": "Las raíces rodean la arena.",
        "phase3": "El bosque despierta.",
        "enrage": "La savia arcana hierve."
      },
      "void_mirror": {
        "name": "Espejo del Vacío",
        "desc": "Reflejo vivo de miedo y poder.",
        "phase2": "El espejo se duplica."
      },
      "azhur": {
        "name": "Azhur, Lobo del Eclipse",
        "desc": "Bestia legendaria de lunas partidas.",
        "phase2": "Desaparece entre sombras.",
        "phase3": "El eclipse cubre sus colmillos.",
        "enrage": "El aullido sacude el valor.",
        "access": "Acceso por rastros secretos.",
        "worldImpact": "Los caminos quedan en silencio."
      },
      "thal_mora": {
        "name": "Thal Mora, Voz de las Profundidades",
        "desc": "Presencia abisal de las mareas.",
        "phase2": "La arena se hunde.",
        "phase3": "Surgen leviatanes menores.",
        "access": "Acceso por mareas ocultas.",
        "worldImpact": "Las aguas retroceden."
      },
      "velkaryn": {
        "name": "Velkaryn, Caballero del Último Eclipse",
        "desc": "Juramento antiguo en armadura rota.",
        "phase2": "Alza la hoja sin sombra.",
        "access": "Acceso en el Fragmento.",
        "worldImpact": "El cielo recuerda a los supervivientes."
      },
      "skills": {
        "double_slash": "Corte doble",
        "battle_cry": "Grito de batalla",
        "vine_whip": "Látigo de enredaderas",
        "root_slam": "Golpe de raíces",
        "spore_cloud": "Nube de esporas",
        "mirror_image": "Imagen espejo",
        "void_blast": "Explosión del vacío",
        "reflect": "Reflejar",
        "crimson_fang": "Colmillo carmesí",
        "shadow_rush": "Carga sombría",
        "howl_of_ruin": "Aullido de ruina",
        "twin_shadow": "Sombra gemela",
        "abyss_coil": "Espiral abisal",
        "tidal_crush": "Aplastamiento de marea",
        "depth_charge": "Carga de las profundidades",
        "leviathan_roar": "Rugido del leviatán",
        "eclipse_slash": "Corte del eclipse",
        "void_parry": "Parada del vacío",
        "knight_charge": "Carga del caballero",
        "final_eclipse": "Eclipse final"
      }
    },
    "hiddenEvents": {
      "cursed_dungeon": {
        "name": "Mazmorra maldita",
        "desc": "Entrada inestable que cambia de lugar.",
        "found": "Encontraste la mazmorra."
      },
      "ghost_npc": {
        "name": "Fantasma viajero",
        "desc": "Espíritu con pistas de títulos.",
        "hint": "Búscalo en la niebla."
      },
      "hidden_weapon": {
        "name": "Arma oculta",
        "desc": "Hoja sellada por una historia.",
        "hint": "No todo tesoro brilla."
      },
      "forbidden_boss": {
        "name": "Jefe prohibido",
        "desc": "Desafío opcional sin penalización.",
        "found": "El sello se rompió."
      },
      "monthly_eclipse": {
        "name": "Eclipse mensual",
        "desc": "Evento raro con encuentros secretos.",
        "hint": "Mira al cielo."
      },
      "wolf_tracks": {
        "name": "Rastros de lobo",
        "desc": "Huellas hacia una caza legendaria.",
        "found": "Rastros de Azhur encontrados."
      },
      "dungeon_failure": {
        "name": "Fracaso resonante",
        "desc": "La derrota enseña el patrón.",
        "hint": "Intenta de nuevo sin penalización."
      }
    },
    "panels": {
      "selectRegion": "Selecciona una región para iniciar el combate.",
      "goTravel": "Ir a VIAJE",
      "soonDesc": "Este recurso estará disponible próximamente.",
      "current": "Actual",
      "equippedItem": "Objeto equipado",
      "none": "Ninguno",
      "cost": "Costo",
      "free": "Gratis",
      "newRumors": "Nuevos rumores",
      "seen": "Visto",
      "notSeen": "Nuevo",
      "dialogue": "Diálogo",
      "available": "Disponible",
      "requirement": "Requisito",
      "minLevel": "Nivel mínimo",
      "all": "Todo"
    },
    "app": {
      "initializing": "Inicializando Eclipsia..."
    },
    "monsters": {
      "rat": {
        "name": "Rata"
      },
      "goblin": {
        "name": "Goblin"
      },
      "wolf_pup": {
        "name": "Cachorro de Lobo"
      },
      "bandit_leader": {
        "name": "Líder de los Bandidos"
      },
      "mist_wolf": {
        "name": "Lobo de Niebla"
      },
      "shadow_sprite": {
        "name": "Duende Sombrío"
      },
      "forest_golem": {
        "name": "Gólem del Bosque"
      },
      "root_guardian": {
        "name": "Guardián de las Raíces"
      },
      "sand_scorpion": {
        "name": "Escorpión de Arena"
      },
      "mirage_beast": {
        "name": "Bestia de Espejismo"
      },
      "dune_crawler": {
        "name": "Reptador de Dunas"
      },
      "sea_wraith": {
        "name": "Espectro Marino"
      },
      "deep_leviathan_jr": {
        "name": "Leviatán Joven de las Profundidades"
      },
      "storm_harpy": {
        "name": "Arpía de Tormenta"
      },
      "cloud_titan": {
        "name": "Titán de Nubes"
      }
    },
    "sync": {
      "saving": "💾 Guardando...",
      "saved": "✅ Guardado",
      "error": "❌ Error"
    },
    "socket": {
      "bossDefeated": "Jefe derrotado",
      "colossusSpawned": "Coloso apareció",
      "online": "Jugadores online"
    },
    "auth": {
      "invalidUsername": "El usuario debe tener de 3 a 20 caracteres.",
      "invalidEmail": "Email inválido.",
      "invalidPassword": "La contraseña debe tener al menos 6 caracteres."
    }
  },
  "ja-JP": {
    "game": {
      "title": "ECLIPSIA",
      "subtitle": "アルカナの辺境",
      "loading": "読み込み中...",
      "version": "バージョン",
      "confirm": "確認",
      "cancel": "キャンセル",
      "back": "戻る",
      "save": "保存",
      "close": "閉じる",
      "yes": "はい",
      "no": "いいえ",
      "ok": "OK",
      "soon": "近日公開",
      "locked": "ロック中",
      "unknown": "不明",
      "level": "レベル",
      "lvl": "Lv.",
      "rank": "ランク",
      "new": "新規"
    },
    "login": {
      "title": "エクリプシアにログイン",
      "subtitle": "アルカナの辺境が帰還を待っています。",
      "user": "ユーザー",
      "userPlaceholder": "ユーザー名を入力",
      "passPLaceholder": "パスワードを入力",
      "enter": "入場",
      "register": "登録",
      "forgotPass": "パスワードを忘れた",
      "noAccount": "アカウントがありませんか？",
      "hasAccount": "アカウントをお持ちですか？",
      "loginError": "ユーザー名またはパスワードが違います。",
      "registerSuccess": "アカウントを作成しました。",
      "language": "言語",
      "pass": "パスワード",
      "email": "メール",
      "emailPlaceholder": "メールを入力",
      "loginTab": "ログイン",
      "registerTab": "アカウント作成"
    },
    "register": {
      "username": "ユーザー名",
      "usernamePlaceholder": "名前を選択",
      "confirmPass": "パスワード確認",
      "create": "アカウント作成",
      "passwordMismatch": "パスワードが一致しません。"
    },
    "charCreate": {
      "title": "キャラクター作成",
      "subtitle": "アルカナの起源を選びます。",
      "nameLabel": "キャラクター名",
      "namePlaceholder": "名前を入力",
      "nameError": "無効な名前です。",
      "nameTaken": "その名前は使用中です。",
      "archetypeTitle": "アーキタイプ",
      "archetypeHint": "アーキタイプは能力と戦闘を変えます。",
      "confirm": "確認",
      "stats": {
        "atk": "攻撃",
        "def": "防御",
        "arc": "アルカナ"
      },
      "archetypes": {
        "blade": {
          "name": "剣士",
          "desc": "速度と精密さ"
        },
        "arcane": {
          "name": "アルカナ",
          "desc": "魔力と破壊"
        },
        "druid": {
          "name": "ドルイド",
          "desc": "回復と自然操作"
        },
        "vanguard": {
          "name": "ヴァンガード",
          "desc": "防御と保護"
        },
        "ranger": {
          "name": "射手",
          "desc": "射程と機動力"
        },
        "spectre": {
          "name": "スペクター",
          "desc": "隠密と毒"
        }
      },
      "destinyTitle": "運命を選べ",
      "awaken": "エクリプシアで覚醒",
      "nameRequired": "名前は必須で3〜20文字です。",
      "archetypeRequired": "アーキタイプを選んでください。"
    },
    "charSelect": {
      "title": "キャラクター選択",
      "subtitle": "辺境を越える者を選びます。",
      "play": "プレイ",
      "addParty": "パーティに追加",
      "removeParty": "パーティから外す",
      "manageParty": "パーティ管理",
      "cancelParty": "パーティ取消",
      "enterGame": "ゲームに入る",
      "createNew": "新規作成",
      "slotsLeft": "残り枠",
      "confirmDelete": "削除確認",
      "chars": "chars",
      "activeBadge": "アクティブ",
      "partyBadge": "パーティ",
      "delete": "削除",
      "noCharacters": "キャラクターがいません。",
      "partyFull": "パーティが満員です。",
      "selectCharacter": "キャラクターを選択してください。"
    },
    "header": {
      "gold": "ゴールド",
      "crystalsHint": "クリスタル：世界市場とプレイヤー間で使うプレミアム通貨",
      "settings": "設定"
    },
    "nav": {
      "hub": "拠点",
      "travel": "旅",
      "hunt": "狩り",
      "items": "アイテム",
      "profile": "プロフィール"
    },
    "hub": {
      "travel": "旅",
      "hunt": "狩り",
      "city": "街",
      "items": "アイテム",
      "profile": "プロフィール",
      "quests": "クエスト",
      "ranking": "ランキング",
      "guild": "ギルド",
      "chat": "チャット",
      "charges": "チャージ"
    },
    "travel": {
      "title": "旅",
      "regions": {
        "_self": "地域",
        "valedouro": {
          "name": "ヴァレドウロ",
          "level": "レベル1",
          "desc": "黄金の野と古い遺跡。"
        },
        "nythera": {
          "name": "ニセラの森",
          "level": "レベル10",
          "desc": "根がささやく夜の森。"
        },
        "ormara": {
          "name": "オルマラ砂漠",
          "level": "レベル20",
          "desc": "アルカナの潮が満ちる海岸。"
        },
        "abissal": {
          "name": "深淵の海岸",
          "level": "レベル30",
          "desc": "世界の間に開いた暗い裂け目。"
        },
        "ceupartido": {
          "name": "割れた空",
          "level": "レベル40",
          "desc": "嵐の下に浮かぶ島々。"
        },
        "fragmento": {
          "name": "???",
          "level": "レベル50",
          "desc": "現実が砕ける境界。"
        }
      },
      "dungeons": {
        "_self": "ダンジョン",
        "cripta": {
          "name": "覆われた地下墓所",
          "level": "レベル5",
          "floors": "階層",
          "region": "ヴァレドウロ"
        },
        "secret": {
          "name": "秘密のダンジョン",
          "level": "可変レベル",
          "desc": "隠しイベントで現れる入口。"
        },
        "bandit_camp": { "name": "盗賊の野営地", "desc": "ヴァレドウロの街道を荒らす盗賊たち。頭目は最上階で待つ。" },
        "root_crypt": { "name": "根の地下墓所", "desc": "森の根が古代の地下墓所を覆った。守護者が目覚める。" },
        "mirror_sanctum": { "name": "鏡の聖域", "desc": "呪われた鏡がニセラの深奥で飢えた影を閉じ込めている。" },
        "azhur_pit": { "name": "アズールの穴蔵", "desc": "オルマラの砂丘に砂が飲み込んだ穴蔵。アズールが弱き者を貪る。" },
        "velkaryn_spire": { "name": "ヴェルカリンの尖塔", "desc": "割れ空の雲の上に、尖塔はヴェルカリンの秘密を守っている。" },
        "thal_mora_abyss": { "name": "サル＝モーラの深淵", "desc": "深淵の底でサル＝モーラは油断した者を沈める歌を歌う。" },
        "fragment_nexus": { "name": "欠片の中枢", "desc": "エクリプシアの砕けた心臓がヴェールの向こうで脈打つ。目覚めし者だけが辿り着く。" }
      },
      "enter": "入る",
      "go": "行く",
      "locked": "ロック中",
      "requireLevel": "必要レベル",
      "requireTitle": "必要称号",
      "requireQuest": "必要クエスト",
      "requireUnknown": "不明な条件",
      "tabs": {
        "regions": "地域",
        "dungeons": "ダンジョン"
      },
      "requirements": {
        "portador": "運び手の称号",
        "specialQuest": "特別クエスト",
        "eclipseAwakened": "eclipse_awakened称号",
        "hidden": "隠し条件"
      },
      "regionRanges": {
        "valedouro": "Lv 1-10",
        "nythera": "Lv 10-25",
        "ormara": "Lv 25-40",
        "abissal": "Lv 40-55",
        "ceupartido": "Lv 55-70",
        "fragmento": "Lv ???"
      },
      "dungeonInfo": {
        "rootCrypt": {
          "name": "根の地下墓所",
          "level": "Lv 15+",
          "floors": "10階層",
          "region": "ニセラ"
        },
        "hidden": {
          "name": "???",
          "condition": "隠し条件"
        }
      },
      "dungeonFloors": "階",
      "dungeonBoss": "ボス",
      "dungeonReward": "報酬",

    },
    "combat": {
      "title": "戦闘",
      "dungeonCleared": "ダンジョン攻略！",
      "attack": "攻撃",
      "defend": "防御",
      "skills": "スキル",
      "flee": "逃走",
      "log": {
        "_self": "ログ",
        "title": "戦闘ログ",
        "playerUsed": "{skill}を使った。",
        "enemyUsed": "敵が{skill}を使った。",
        "playerDealt": "{damage}ダメージを与えた。",
        "playerTook": "{damage}ダメージを受けた。",
        "damage": "ダメージ",
        "critical": "会心！",
        "missed": "ミス！",
        "defended": "防御した。",
        "fled": "逃走した。",
        "victory": "勝利した。",
        "levelUp": "レベルアップ！"
      },
      "autoFight": "自動戦闘",
      "autoAdvance": "自動進行",
      "on": "オン",
      "off": "オフ",
      "floor": "階",
      "vs": "対",
      "victory": "勝利",
      "defeat": "敗北",
      "fled": "逃走しました。",
      "defeatMsg": "倒れても罰はありません。HPとMPは回復します。",
      "tryAgain": "再挑戦",
      "collectLoot": "戦利品回収",
      "nextFloor": "次の階",
      "autoConfig": {
        "title": "自動設定",
        "mpThreshold": "MPしきい値",
        "stopBoss": "ボスで停止",
        "stopEvent": "イベントで停止",
        "lootFilter": "戦利品フィルター",
        "lootAll": "すべて回収",
        "lootUncommon": "アンコモン以上",
        "lootRare": "レア以上",
        "lootEpic": "エピック以上",
        "save": "保存"
      },
      "skillsModal": "スキル",
      "autoConfigModal": "自動設定",
      "lootModal": "戦利品",
      "noSkills": "解除されたスキルはありません。",
      "noLoot": "戦利品はありません。"
    },
    "city": {
      "valedouro": "ヴァレドウロ",
      "valedouroDesc": "黄金の野に囲まれた淡い石の街。",
      "tavern": "酒場",
      "shop": "店",
      "blacksmith": "鍛冶屋",
      "sage": "賢者",
      "board": "掲示板",
      "mail": "郵便",
      "tavernQuote": "すべての旅は物語から始まる。",
      "clickToTalk": "クリックして話す",
      "talk": "話す",
      "askMore": "さらに聞く",
      "alreadyKnow": "その噂は知っています。",
      "shopAll": "全アイテム",
      "buy": "購入",
      "bought": "購入済み",
      "blacksmithTitle": "ヴァレドウロ鍛冶場",
      "blacksmithDesc": "鋼とルーンと忍耐が伝説を作る。",
      "upgrade": "強化",
      "noEquipment": "装備なし。",
      "sageTitle": "賢者の書庫",
      "sageDesc": "安全なアルカナ知識。",
      "learnSkill": "スキル習得",
      "resetStats": "能力リセット",
      "resetStatsDesc": "割り振ったポイントを戻します。",
      "reset": "リセット",
      "boardTitle": "クエスト掲示板",
      "boardDesc": "依頼、狩り、警告。",
      "accept": "受諾",
      "tabs": {
        "tavern": "🍺 酒場",
        "shop": "🏪 店",
        "blacksmith": "🔨 鍛冶屋",
        "sage": "🧙 賢者",
        "board": "📋 掲示板"
      },
      "filters": {
        "all": "すべて",
        "weapons": "武器",
        "armor": "防具",
        "accessories": "アクセサリー",
        "pet": "ペット",
        "mount": "乗騎"
      },
      "npcs": {
        "old_merchant": {
          "name": "老商人"
        },
        "adventurer": {
          "name": "冒険者"
        },
        "mysterious": {
          "name": "フードの人物"
        },
        "beast_tamer": {
          "name": "獣使い"
        }
      },
      "dialogues": {
        "old_merchant": "古い貨幣は地図が忘れた道を覚えている。",
        "adventurer": "ニセラは刃の前に勇気を試す。",
        "mysterious": "月が自らの影を否定するとき、ヴェールを追え。",
        "beast_tamer": "獣は力より忍耐を尊ぶ。"
      },
      "categories": "カテゴリ",
      "price": "価格",
      "levelReq": "最低レベル",
      "canBuy": "購入",
      "cantBuy": "不可",
      "upgradeCost": "強化コスト",
      "resetCost": "リセット費用"
    },
    "tavern": {
      "npcs": {
        "old_merchant": "老商人",
        "adventurer": "冒険者",
        "mysterious": "謎の人物",
        "beast_tamer": "獣使い"
      },
      "rumors": {
        "wolf_tracks": "北に狼の足跡。",
        "cursed_crypt": "地下墓所は死者の名に応える。",
        "nythera_night": "ニセラは早く暗くなる。",
        "forbidden_boss": "禁じられたボスは挑戦に応える。",
        "azhur_howl": "アズールの遠吠えは松明を消す。",
        "eclipse_secret": "日食は見えない扉を示す。",
        "spirit_stones": "精霊石は忍耐ある者を選ぶ。",
        "party_power": "パーティは遠くへ進むがXPを分ける。",
        "pet_secret": "ペットは隠し道を示す。",
        "rare_pets": "珍しいペットは急ぎを嫌う。",
        "mount_secret": "乗騎は近道を知っている。"
      }
    },
    "party": {
      "title": "パーティ",
      "setActive": "アクティブ設定",
      "remove": "削除",
      "empty": "メンバーなし。",
      "levelReq": "最低レベル10。",
      "xpInfo": "人数でXPが減少します。",
      "crossInfo": "同じ地域に到達が必要です。",
      "xpMultiplier": "XP倍率",
      "activate": "有効化",
      "dead": "死亡"
    },
    "partyReal": {
      "title": "プレイヤーグループ",
      "namePlaceholder": "オンラインプレイヤー名",
      "invite": "招待",
      "invitedBy": "グループ招待：",
      "leave": "グループを抜ける",
      "kick": "追放",
      "kicked": "グループから追放されました。",
      "declined": "招待は拒否されました。",
      "failed": "招待できませんでした",
      "reason": { "offline": "プレイヤーがオフライン", "busy": "既にグループ所属", "full": "グループが満員", "not_leader": "リーダーのみ招待可能" }
    },
    "dailyQuests": {
      "claim": "受取",
      "claimed": "受取済",
      "cannot": "デイリークエストはまだ未達成です",
      "rewardReceived": "デイリー報酬を受け取りました！",
      "daily_kills": { "name": "今日の狩人：敵を20体倒す" },
      "daily_explorer": { "name": "今日の探索者：15回探索する" },
      "daily_crafts": { "name": "今日の職人：アイテムを2個鍛造する" },
      "daily_dungeon": { "name": "今日の冒険者：ダンジョンを3階進める" }
    },
    "pet": {
      "title": "ペット",
      "level": "レベル",
      "ready": "準備完了",
      "reviving": "復活中",
      "noActive": "有効なペットなし。",
      "abilities": {
        "nibble": "かじる",
        "scout": "偵察",
        "wolf_bite": "狼の噛みつき",
        "spikes": "棘",
        "honey_trail": "蜜の跡",
        "nature_heal": "自然の癒し",
        "shadow_nose": "影の嗅覚",
        "eagle_dive": "鷲の急降下",
        "stone_wall": "石の壁",
        "arcane_wisdom": "アルカナの知恵",
        "dragon_claw": "竜の爪",
        "lucky_paw": "幸運の肉球",
        "eclipse_fang": "日食の牙",
        "king_roar": "王の咆哮",
        "fragment_strike": "欠片の一撃"
      }
    },
    "mount": {
      "title": "乗騎",
      "exploreTime": "探索時間",
      "noActive": "有効な乗騎なし。"
    },
    "items": {
      "equipped": "装備中",
      "bag": "バッグ",
      "crafting": "クラフト",
      "market": "市場",
        "storage": "倉庫",
      "equip": "装備",
      "unequip": "外す",
      "discard": "捨てる",
      "compare": "比較",
      "slots": {
        "_self": "枠",
        "weapon_main": "主武器",
        "weapon_off": "副手",
        "head": "頭",
        "chest": "胴",
        "legs": "脚",
        "gloves": "手袋",
        "boots": "靴",
        "earring": "耳飾り",
        "necklace": "首飾り",
        "belt": "ベルト",
        "resistance": "耐性",
        "amulet": "護符",
        "spirit_stone": "精霊石",
        "pet": "ペット",
        "mount": "乗騎"
      },
      "empty": "アイテムなし。",
      "confirmDiscard": "捨てますか？",
      "storageSlots": "倉庫スロット",
      "storageEmpty": "倉庫は空です。",
      "storageFull": "倉庫がいっぱい（500）。",
      "bagFull": "バッグがいっぱい（60）。",
      "deposit": "預ける",
      "withdraw": "引き出す",
      "twoHanded": "両手",
      "twoHandedWarning": "副手装備を外します。",
      "twoHandedBlocked": "両手武器で副手は使えません。",
      "spiritStoneEffect": "精霊石効果",
      "stoneLevel": "石のレベル",
      "group": {
        "weapons": "武器",
        "armor": "防具",
        "accessories": "アクセサリー",
        "companions": "仲間"
      },
      "rarities": {
        "common": "コモン",
        "uncommon": "アンコモン",
        "rare": "レア",
        "epic": "エピック",
        "legendary": "レジェンダリー",
        "relic": "レリック"
      },
      "spiritEffects": {
        "burn": "燃焼",
        "freeze": "凍結",
        "paralyze": "麻痺",
        "regenerate": "再生",
        "bleed": "出血",
        "mana_drain": "マナ吸収",
        "all_boost": "全強化"
      },
      "tabs": {
        "equipped": "装備中",
        "bag": "バッグ",
        "crafting": "クラフト",
        "market": "市場"
      },
      "unknownItem": "不明なアイテム",
      "genericDesc": "アルカナの辺境で見つかったアイテム。",
      "mainStats": "主な能力",
      "effects": "効果",
      "noEffects": "効果なし",
      "itemCode": "アイテムコード",
      "positive": "プラス",
      "negative": "マイナス",
      "comparison": "比較",
      "currentEquipped": "現在装備中",
      "twoHandedBadge": "2H",
      "slotEmpty": "空きスロット",
      "groups": {
        "weapons": "武器",
        "armor": "防具",
        "accessories": "アクセサリー"
      },
      "defaultSlotIcons": {
        "weapon_main": "⚔",
        "weapon_off": "🛡",
        "head": "🎩",
        "chest": "🥋",
        "legs": "👖",
        "gloves": "🧤",
        "boots": "🥾",
        "earring": "💠",
        "necklace": "📿",
        "belt": "🧷",
        "resistance": "🔰",
        "amulet": "🔮",
        "spirit_stone": "💎",
        "pet": "🐾",
        "mount": "🐴"
      },
      "names": {
        "long_sword": "ロングソード",
        "misty_ring": "霧の指輪",
        "fortune_amulet": "幸運の護符"
      },
      "itemLinkHint": "ヒント：[item:numId|効果:値|...] を貼り付けるとアイテムをリンクできます — 例: [item:1005|1:65|4:5|7:3]",
      "commandHint": "コマンド: /invite <名前> · /w <名前> <msg> · /r <msg> · /p <msg> · /help — 名前クリックでアクション",
      "partyPrefix": "パーティ",
      "whisperFrom": "ささやき（受信）：",
      "whisperTo": "ささやき（送信）：",
      "whisperOffline": "ささやき不可 — プレイヤーがオフライン",
      "inviteCard": "グループ招待：",
      "inviteAnswered": "招待に応答しました。",
      "inviteSent": "招待を送りました：",
      "presenceIn": "が辺境に入りました",
      "presenceOut": "が辺境から去りました",
      "actionInvite": "グループに招待",
      "actionWhisper": "ささやく",
      "noReplyTarget": "返信相手がいません — /w <名前> <msg> を使って下さい",
      "badCommand": "無効なコマンド"
    },
    "mail": {
      "inbox": "受信箱",
      "unread": "未読",
      "empty": "手紙はありません。",
      "compose": "新しい手紙",
      "toPlaceholder": "受取人の名前",
      "subjectPlaceholder": "件名",
      "messagePlaceholder": "メッセージ...",
      "noAttachment": "添付なし",
      "goldPlaceholder": "ゴールド（任意）",
      "crystalsPlaceholder": "💎 クリスタル（任意）",
      "send": "送信",
      "sent": "手紙を送信しました！",
      "claim": "受取",
      "claimed": "添付を受け取りました！",
      "from": "差出人",
      "noSubject": "（件名なし）",
      "error": "郵便エラー",
      "noRecipient": "受取人を入力してください",
      "offline": "郵便は利用できません（サーバーオフライン）。"
    },
    "market": {
      "tabs": { "buy": "購入", "sell": "売却", "mine": "出品一覧" },
      "empty": "出品はありません。",
      "seller": "出品者",
      "buy": "購入",
      "bought": "購入しました！",
      "listItem": "出品する",
      "listed": "出品しました！",
      "price": "価格",
      "invalidPrice": "価格が無効です",
      "cancel": "取消",
      "status": { "active": "出品中", "sold": "売却済", "cancelled": "取消済" },
      "offline": "市場は利用できません（サーバーオフライン）。",
      "error": "市場エラー",
      "taxNote": "手数料：出品2💎（返金不可）＋売却額5%の税金。",
      "crystalsCurrency": "世界市場は💎クリスタル（有料通貨）を使用 — ゲーム内ゴールドはプレイヤー間経済から守られます。"
    },
    "crafting": {
      "craft": "鍛造",
      "cannot": "条件不足",
      "success": "鍛造完了",
      "invFull": "インベントリがいっぱい",
      "upgradeTitle": "強化（1レベル+5%）",
      "selectItem": "アイテムを選択",
      "level": "レベル",
      "upgrade": "強化",
      "upgraded": "強化完了",
      "enchantTitle": "エンチャント",
      "selectStone": "霊石を選択",
      "enchant": "エンチャント",
      "enchanted": "エンチャント完了"
    },
    "trade": {
      "title": "プレイヤー間取引",
      "hint": "オンラインの他のキャラクターとアイテム・ゴールドを直接交換します。片側最大3アイテム。",
      "targetPlaceholder": "相手のキャラクター名",
      "request": "取引を申し込む",
      "incoming": "取引依頼：",
      "with": "取引相手",
      "addItem": "アイテムを追加",
      "confirm": "確認",
      "confirmHint": "準備ができたら確認してください。",
      "waitingConfirm": "相手を待っています...",
      "completed": "取引成立！",
      "declined": "取引は拒否されました。",
      "cancelled": "取引はキャンセルされました",
      "failed": "取引に失敗しました"
    },

    "profile": {
      "title": "プロフィール",
      "status": "状態",
      "skills": "スキル",
      "titles": {
        "_self": "称号",
        "locked": "ロック中",
        "equipped": "装備中",
        "equip": "装備"
      },
      "freePoints": "自由ポイント",
      "distribute": "割り振る",
      "equip": "装備",
      "equipped": "装備中",
      "stats": {
        "strength": "筋力",
        "agility": "敏捷",
        "vitality": "生命力",
        "arcana": "アルカナ",
        "perception": "知覚",
        "will": "意志",
        "luck": "幸運"
      },
      "tabs": {
        "status": "状態",
        "skills": "スキル",
        "titles": "称号"
      },
      "skillInfo": {
        "mp": "MP",
        "cd": "CD"
      },
      "proficiencies": "熟練度",
      "titleNames": {
        "portador": "運び手",
        "veil_tracker": "ヴェール追跡者",
        "eclipse_awakened": "日食の覚醒者"
      }
    },
    "quests": {
      "title": "クエスト",
      "active": "進行中",
      "completed": "完了",
      "reward": "報酬",
      "progress": "進行度",
      "details": "詳細",
      "none": "クエストなし。",
      "secret": "秘密",
      "unknown": "不明",
      "hunt_wolves": {
        "name": "狼狩り",
        "desc": "ヴァレドウロの道を守る。"
      },
      "explore_forest": {
        "name": "森の探索",
        "desc": "アルカナの印を調べる。"
      },
      "kill_boss": {
        "name": "ボス討伐",
        "desc": "地域のリーダーを倒す。"
      },
      "tabs": {
        "daily": "デイリー",
        "active": "進行中",
        "completed": "完了"
      },
      "viewDetails": "詳細を見る",
      "completedAt": "完了日",
      "secretMystery": "ニセラの影には名もなき呼び声が隠れている。",
      "progressCounter": "進行度",
      "rewardXp": "XP",
      "rewardGold": "ゴールド",
      "wolf_hunt_1": {
        "name": "霧狼狩り",
        "desc": "霧の狼を10体倒す。"
      },
      "goblin_slayer": {
        "name": "ゴブリン討伐者",
        "desc": "ゴブリンを15体倒す。"
      },
      "forest_explorer": {
        "name": "ニセラ探索者",
        "desc": "ニセラを5回探索する。"
      },
      "shadow_secret": {
        "name": "影の秘密",
        "desc": "ニセラで3つの発見をすると解放される隠しクエスト。"
      },
      "mystery": "???"
    },
    "ranking": {
      "title": "ランキング",
      "level": "レベル",
      "pvp": "PvP",
      "discovery": "発見",
      "you": "あなた",
      "soon": {
        "pvp": "PvPは近日公開。",
        "discovery": "発見は近日公開。"
      },
      "tabs": {
        "level": "レベル",
        "pvp": "PVP",
        "discovery": "発見"
      },
      "loading": "ランキング読み込み中...",
      "empty": "ランキングデータなし。",
      "value": "値",
      "position": "順位",
      "xp": "XP"
    },
    "guild": {
      "title": "ギルド",
      "soon": "ギルドシステムは近日公開です",
      "offline": "ギルドは利用できません（サーバーオフライン）。",
      "createTitle": "ギルドを作成",
      "namePlaceholder": "ギルド名（3-24）",
      "create": "作成",
      "browse": "ギルド一覧",
      "empty": "まだ何もありません。",
      "leaderLabel": "リーダー",
      "membersWord": "メンバー",
      "join": "加入",
      "yourRole": "あなたの役職",
      "role": { "leader": "リーダー", "officer": "オフィサー", "member": "メンバー" },
      "disband": "解散",
      "leave": "脱退",
      "leaveConfirm": "ギルドを脱退しますか？",
      "disbandConfirm": "ギルドを解散しますか？全メンバーが削除されます。",
      "motd": "本日のメッセージ",
      "motdPlaceholder": "ギルドのメッセージを書く...",
      "saveMotd": "保存",
      "motdSaved": "メッセージを保存しました！",
      "members": "メンバー",
      "promote": "オフィサーに昇格",
      "demote": "メンバーに降格",
      "kick": "追放",
      "chatTitle": "ギルドチャット",
      "chatPlaceholder": "ギルドへのメッセージ...",
      "error": "ギルド操作エラー",
      "created": "ギルドを作成しました！",
      "joined": "ギルドに加入しました！",
      "disbanded": "ギルドは解散しました。",
      "removed": "ギルドから退出しました。"
    },
    "chat": {
      "title": "チャット",
      "placeholder": "メッセージを入力...",
      "send": "送信",
      "global": "全体",
      "guild": "ギルド",
      "system": "システム",
      "systemName": "システム",
      "connected": "チャットに接続しました。",
      "disconnected": "チャットから切断されました。",
      "messageTooLong": "メッセージが長すぎます。",
      "empty": "メッセージを入力してください。"
    },
    "impulse": {
      "title": "インパルス",
      "absent": "不在時間",
      "hours": "時間",
      "hour": "時間",
      "minutes": "分",
      "charges": "チャージ",
      "hint": "進行を置き換えず助けます。",
      "enter": "入る",
      "names": {
        "1": "アルカナの微風",
        "2": "再燃の炎",
        "3": "月の律動",
        "4": "部分日食",
        "5": "伝説の帰還"
      },
      "bonuses": {
        "xp": "XP",
        "gold": "ゴールド",
        "damage": "ダメージ",
        "defense": "防御",
        "luck": "幸運"
      }
    },
    "loot": {
      "title": "戦利品",
      "collectAll": "すべて回収",
      "collected": "回収済み"
    },
    "settings": {
      "title": "設定",
      "language": "言語",
      "sound": "効果音",
      "music": "音楽",
      "notifications": "通知",
      "save": "保存",
      "saved": "設定を保存しました。",
      "languageButtons": {
        "pt": "🇧🇷PT",
        "en": "🇺🇸EN",
        "es": "🇪🇸ES",
        "ja": "🇯🇵JA"
      }
    },
    "errors": {
      "generic": "問題が発生しました。",
      "connection": "接続エラー。",
      "session": "セッションが切れました。",
      "inventoryFull": "インベントリが満杯です。",
      "notEnoughGold": "ゴールドが足りません。",
      "levelRequired": "レベルが必要です。",
      "titleRequired": "称号が必要です。"
    },
    "notifications": {
      "levelUp": "レベルアップ！",
      "newTitle": "新しい称号！",
      "rareEvent": "レアイベント！",
      "colossusSoon": "巨像が近づいています。",
      "questComplete": "クエスト完了！",
      "itemFound": "アイテム発見！"
    },
    "skills": {
      "spin_slash": {
        "name": "回転斬り",
        "desc": "刃を回して敵を斬る。"
      },
      "dash_cut": {
        "name": "疾走斬り",
        "desc": "素早く接近して斬る。"
      },
      "bleed": {
        "name": "出血",
        "desc": "数ターンのダメージ。"
      },
      "execute": {
        "name": "処刑",
        "desc": "弱った敵に大ダメージ。"
      },
      "arcane_burst": {
        "name": "アルカナバースト",
        "desc": "アルカナの力を放つ。"
      },
      "ice_nova": {
        "name": "氷の新星",
        "desc": "空気を凍らせて攻撃。"
      },
      "heal_pulse": {
        "name": "回復パルス",
        "desc": "HPを少し回復。"
      },
      "root": {
        "name": "根縛り",
        "desc": "根で標的を縛る。"
      },
      "thousand_cuts": {
        "name": "千斬り",
        "desc": "素早い連続攻撃。"
      },
      "blade_storm": {
        "name": "刃の嵐",
        "desc": "破壊的な斬撃の舞。"
      },
      "chain_lightning": {
        "name": "連鎖稲妻",
        "desc": "標的へ跳ぶ雷。"
      },
      "void_gate": {
        "name": "虚無の門",
        "desc": "防御とマナを歪める。"
      },
      "thorns": {
        "name": "棘",
        "desc": "攻撃に反撃する。"
      },
      "nature_burst": {
        "name": "自然爆発",
        "desc": "野生の力の衝撃。"
      },
      "shield_bash": {
        "name": "盾打ち",
        "desc": "盾で気絶させる。"
      },
      "fortress": {
        "name": "要塞",
        "desc": "防御を大きく上げる。"
      },
      "piercing_shot": {
        "name": "貫通射撃",
        "desc": "防御を一部無視。"
      },
      "rain_of_arrows": {
        "name": "矢の雨",
        "desc": "多数の矢を放つ。"
      },
      "death_mark": {
        "name": "死の印",
        "desc": "受けるダメージを増やす。"
      },
      "shadow_step": {
        "name": "影歩き",
        "desc": "会心攻撃を準備する。"
      }
    },
    "bosses": {
      "bandit_leader": {
        "name": "盗賊の頭領",
        "desc": "卑劣な一撃を使う狡猾な略奪者。",
        "phase2": "増援を呼ぶ。",
        "enrage": "怒り狂う。"
      },
      "root_guardian": {
        "name": "根の守護者",
        "desc": "ニセラの古き守護者。",
        "phase2": "根が闘技場を囲む。",
        "phase3": "森が目覚める。",
        "enrage": "アルカナの樹液が沸く。"
      },
      "void_mirror": {
        "name": "虚無の鏡",
        "desc": "恐怖と力を映す生きた反射。",
        "phase2": "鏡が分裂する。"
      },
      "azhur": {
        "name": "アズール、日食の狼",
        "desc": "砕けた月の伝説の獣。",
        "phase2": "影に消える。",
        "phase3": "日食が牙を覆う。",
        "enrage": "遠吠えが勇気を揺らす。",
        "access": "秘密の足跡からアクセス。",
        "worldImpact": "道は静まり返る。"
      },
      "thal_mora": {
        "name": "タル・モラ、深淵の声",
        "desc": "潮に宿る深淵の存在。",
        "phase2": "闘技場が沈む。",
        "phase3": "小さなリヴァイアサンが現れる。",
        "access": "隠れた潮からアクセス。",
        "worldImpact": "水が引いていく。"
      },
      "velkaryn": {
        "name": "ヴェルカリン、最後の日食の騎士",
        "desc": "壊れた鎧をまとう古い誓い。",
        "phase2": "影なき刃を掲げる。",
        "access": "欠片でアクセス。",
        "worldImpact": "空が生存者を記憶する。"
      },
      "skills": {
        "double_slash": "二連斬り",
        "battle_cry": "戦いの叫び",
        "vine_whip": "蔦の鞭",
        "root_slam": "根の強打",
        "spore_cloud": "胞子雲",
        "mirror_image": "鏡像",
        "void_blast": "虚無爆発",
        "reflect": "反射",
        "crimson_fang": "深紅の牙",
        "shadow_rush": "影の突進",
        "howl_of_ruin": "破滅の遠吠え",
        "twin_shadow": "双影",
        "abyss_coil": "深淵の輪",
        "tidal_crush": "潮の圧砕",
        "depth_charge": "深海突撃",
        "leviathan_roar": "リヴァイアサンの咆哮",
        "eclipse_slash": "日食斬り",
        "void_parry": "虚無受け",
        "knight_charge": "騎士の突撃",
        "final_eclipse": "最後の日食"
      }
    },
    "hiddenEvents": {
      "cursed_dungeon": {
        "name": "呪われたダンジョン",
        "desc": "場所を変える不安定な入口。",
        "found": "ダンジョンを発見しました。"
      },
      "ghost_npc": {
        "name": "旅する幽霊",
        "desc": "称号の手がかりを持つ霊。",
        "hint": "霧の中を探してください。"
      },
      "hidden_weapon": {
        "name": "隠された武器",
        "desc": "物語に封じられた刃。",
        "hint": "すべての宝が輝くとは限りません。"
      },
      "forbidden_boss": {
        "name": "禁じられたボス",
        "desc": "罰なしの任意挑戦。",
        "found": "封印が破られました。"
      },
      "monthly_eclipse": {
        "name": "月例日食",
        "desc": "秘密の遭遇が起こるレアイベント。",
        "hint": "空を見上げてください。"
      },
      "wolf_tracks": {
        "name": "狼の足跡",
        "desc": "伝説の狩りへ続く足跡。",
        "found": "アズールの足跡を発見。"
      },
      "dungeon_failure": {
        "name": "響く敗北",
        "desc": "敗北が型を教える。",
        "hint": "罰なしで再挑戦できます。"
      }
    },
    "panels": {
      "selectRegion": "戦闘を始める地域を選択してください。",
      "goTravel": "旅へ移動",
      "soonDesc": "この機能は近日公開です。",
      "current": "現在",
      "equippedItem": "装備中アイテム",
      "none": "なし",
      "cost": "コスト",
      "free": "無料",
      "newRumors": "新しい噂",
      "seen": "既読",
      "notSeen": "新規",
      "dialogue": "会話",
      "available": "利用可能",
      "requirement": "条件",
      "minLevel": "最低レベル",
      "all": "すべて"
    },
    "app": {
      "initializing": "エクリプシアを初期化中..."
    },
    "monsters": {
      "rat": {
        "name": "鼠"
      },
      "goblin": {
        "name": "ゴブリン"
      },
      "wolf_pup": {
        "name": "狼の子"
      },
      "bandit_leader": {
        "name": "盗賊の頭領"
      },
      "mist_wolf": {
        "name": "霧の狼"
      },
      "shadow_sprite": {
        "name": "影の精"
      },
      "forest_golem": {
        "name": "森のゴーレム"
      },
      "root_guardian": {
        "name": "根の守護者"
      },
      "sand_scorpion": {
        "name": "砂サソリ"
      },
      "mirage_beast": {
        "name": "蜃気楼の獣"
      },
      "dune_crawler": {
        "name": "砂丘の這うもの"
      },
      "sea_wraith": {
        "name": "海の亡霊"
      },
      "deep_leviathan_jr": {
        "name": "若き深海リヴァイアサン"
      },
      "storm_harpy": {
        "name": "嵐のハーピー"
      },
      "cloud_titan": {
        "name": "雲の巨人"
      }
    },
    "sync": {
      "saving": "💾 保存中...",
      "saved": "✅ 保存済み",
      "error": "❌ エラー"
    },
    "socket": {
      "bossDefeated": "ボス撃破",
      "colossusSpawned": "巨像出現",
      "online": "オンラインプレイヤー"
    },
    "auth": {
      "invalidUsername": "ユーザー名は3〜20文字です。",
      "invalidEmail": "無効なメールです。",
      "invalidPassword": "パスワードは6文字以上です。"
    }
  }
};
