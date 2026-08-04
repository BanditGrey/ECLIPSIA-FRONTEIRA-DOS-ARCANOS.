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
    "combos": {
      "sword_one_none": { "name": "Lâmina" },
      "sword_one_sword_one": { "name": "Lâminas Gêmeas" },
      "sword_one_sword_two": { "name": "Dançarino da Espada" },
      "sword_one_great_sword": { "name": "Vanguarda" },
      "sword_one_dagger": { "name": "Duelista" },
      "sword_one_dagger_off": { "name": "Esgrimista" },
      "sword_one_bow_short": { "name": "Escaramuçador" },
      "sword_one_bow_long": { "name": "Desbravador" },
      "sword_one_staff_one": { "name": "Lâmina Arcana" },
      "sword_one_staff_two": { "name": "Cavaleiro Arcano" },
      "sword_one_orb": { "name": "Cavaleiro Rúnico" },
      "sword_one_tome": { "name": "Mago de Batalha" },
      "sword_one_hammer": { "name": "Belicista" },
      "sword_one_spear": { "name": "Hoplista" },
      "sword_one_shield": { "name": "Paladino" },
      "sword_two_none": { "name": "Lâmina Longa" },
      "sword_two_sword_one": { "name": "Dançarino da Espada" },
      "sword_two_sword_two": { "name": "Lâminas Longas Gêmeas" },
      "sword_two_great_sword": { "name": "Mestre das Lâminas" },
      "sword_two_dagger": { "name": "Dançarino de Lâminas" },
      "sword_two_dagger_off": { "name": "Mestre da Apara" },
      "sword_two_bow_short": { "name": "Cavaleiro Patrulheiro" },
      "sword_two_bow_long": { "name": "Olho de Falcão" },
      "sword_two_staff_one": { "name": "Lâmina Rúnica" },
      "sword_two_staff_two": { "name": "Mestre Arcano das Lâminas" },
      "sword_two_orb": { "name": "Cavaleiro Eldritch" },
      "sword_two_tome": { "name": "Lâmina Hex" },
      "sword_two_hammer": { "name": "Lâmina de Guerra" },
      "sword_two_spear": { "name": "Lanceiro de Lâminas" },
      "sword_two_shield": { "name": "Sábio da Espada" },
      "great_sword_none": { "name": "Berserker" },
      "great_sword_sword_one": { "name": "Ceifador" },
      "great_sword_sword_two": { "name": "Mestre da Guerra" },
      "great_sword_great_sword": { "name": "Colosso" },
      "great_sword_dagger": { "name": "Ceifador de Sangue" },
      "great_sword_dagger_off": { "name": "Frenesi" },
      "great_sword_bow_short": { "name": "Saqueador da Tempestade" },
      "great_sword_bow_long": { "name": "Mestre da Caça" },
      "great_sword_staff_one": { "name": "Guerreiro do Caos" },
      "great_sword_staff_two": { "name": "Berserker da Fenda" },
      "great_sword_orb": { "name": "Berserker do Vazio" },
      "great_sword_tome": { "name": "Cavaleiro da Ruína" },
      "great_sword_hammer": { "name": "Juggernaut" },
      "great_sword_spear": { "name": "Senhor da Guerra" },
      "great_sword_shield": { "name": "Vanguarda de Ferro" },
      "dagger_none": { "name": "Assassino" },
      "dagger_sword_one": { "name": "Ladino" },
      "dagger_sword_two": { "name": "Duelista Sombrio" },
      "dagger_great_sword": { "name": "Ceifador Noturno" },
      "dagger_dagger": { "name": "Sombras Gêmeas" },
      "dagger_dagger_off": { "name": "Fantasma" },
      "dagger_bow_short": { "name": "Espreitador" },
      "dagger_bow_long": { "name": "Caçador Noturno" },
      "dagger_staff_one": { "name": "Assassino Hex" },
      "dagger_staff_two": { "name": "Arcanista Sombrio" },
      "dagger_orb": { "name": "Devorador de Almas" },
      "dagger_tome": { "name": "Sábio das Trevas" },
      "dagger_hammer": { "name": "Quebra-Costas" },
      "dagger_spear": { "name": "Lanceiro Sombrio" },
      "dagger_shield": { "name": "Cavaleiro do Terror" },
      "dagger_off_none": { "name": "Lâmina Lateral" },
      "dagger_off_sword_one": { "name": "Esgrimista" },
      "dagger_off_sword_two": { "name": "Mestre da Apara" },
      "dagger_off_great_sword": { "name": "Ceifador Veloz" },
      "dagger_off_dagger": { "name": "Sombras Gêmeas" },
      "dagger_off_dagger_off": { "name": "Lâminas Laterais Gêmeas" },
      "dagger_off_bow_short": { "name": "Espreitador Veloz" },
      "dagger_off_bow_long": { "name": "Arqueiro Fantasma" },
      "dagger_off_staff_one": { "name": "Esgrimista Arcano" },
      "dagger_off_staff_two": { "name": "Mago do Véu" },
      "dagger_off_orb": { "name": "Esgrimista de Almas" },
      "dagger_off_tome": { "name": "Esgrimista Amaldiçoado" },
      "dagger_off_hammer": { "name": "Esmagador Veloz" },
      "dagger_off_spear": { "name": "Lanceiro Leve" },
      "dagger_off_shield": { "name": "Sentinela Veloz" },
      "bow_short_none": { "name": "Patrulheiro" },
      "bow_short_sword_one": { "name": "Escaramuçador" },
      "bow_short_sword_two": { "name": "Cavaleiro Patrulheiro" },
      "bow_short_great_sword": { "name": "Saqueador da Tempestade" },
      "bow_short_dagger": { "name": "Espreitador" },
      "bow_short_dagger_off": { "name": "Espreitador Veloz" },
      "bow_short_bow_short": { "name": "Arcos Gêmeos" },
      "bow_short_bow_long": { "name": "Arqueiro do Vento" },
      "bow_short_staff_one": { "name": "Mago da Natureza" },
      "bow_short_staff_two": { "name": "Invocador de Tempestades" },
      "bow_short_orb": { "name": "Observador de Estrelas" },
      "bow_short_tome": { "name": "Mestre das Feras" },
      "bow_short_hammer": { "name": "Caçador de Trovões" },
      "bow_short_spear": { "name": "Caçador de Lança" },
      "bow_short_shield": { "name": "Guardião da Floresta" },
      "bow_long_none": { "name": "Caçador" },
      "bow_long_sword_one": { "name": "Desbravador" },
      "bow_long_sword_two": { "name": "Olho de Falcão" },
      "bow_long_great_sword": { "name": "Mestre da Caça" },
      "bow_long_dagger": { "name": "Caçador Noturno" },
      "bow_long_dagger_off": { "name": "Arqueiro Fantasma" },
      "bow_long_bow_short": { "name": "Arqueiro do Vento" },
      "bow_long_bow_long": { "name": "Arcos Longos Gêmeos" },
      "bow_long_staff_one": { "name": "Mago da Visão Distante" },
      "bow_long_staff_two": { "name": "Arqueiro do Eclipse" },
      "bow_long_orb": { "name": "Vidente do Vazio" },
      "bow_long_tome": { "name": "Caçador Oráculo" },
      "bow_long_hammer": { "name": "Caçador Pesado" },
      "bow_long_spear": { "name": "Alcance Longo" },
      "bow_long_shield": { "name": "Arqueiro Sentinela" },
      "staff_one_none": { "name": "Mago" },
      "staff_one_sword_one": { "name": "Lâmina Arcana" },
      "staff_one_sword_two": { "name": "Lâmina Rúnica" },
      "staff_one_great_sword": { "name": "Guerreiro do Caos" },
      "staff_one_dagger": { "name": "Assassino Hex" },
      "staff_one_dagger_off": { "name": "Esgrimista Arcano" },
      "staff_one_bow_short": { "name": "Mago da Natureza" },
      "staff_one_bow_long": { "name": "Mago da Visão Distante" },
      "staff_one_staff_one": { "name": "Cajados Gêmeos" },
      "staff_one_staff_two": { "name": "Arquimago" },
      "staff_one_orb": { "name": "Mago Estelar" },
      "staff_one_tome": { "name": "Erudito" },
      "staff_one_hammer": { "name": "Mago da Terra" },
      "staff_one_spear": { "name": "Mago das Tempestades" },
      "staff_one_shield": { "name": "Templário Arcano" },
      "staff_two_none": { "name": "Arcanista" },
      "staff_two_sword_one": { "name": "Cavaleiro Arcano" },
      "staff_two_sword_two": { "name": "Mestre Arcano das Lâminas" },
      "staff_two_great_sword": { "name": "Berserker da Fenda" },
      "staff_two_dagger": { "name": "Arcanista Sombrio" },
      "staff_two_dagger_off": { "name": "Mago do Véu" },
      "staff_two_bow_short": { "name": "Invocador de Tempestades" },
      "staff_two_bow_long": { "name": "Arqueiro do Eclipse" },
      "staff_two_staff_one": { "name": "Arquimago" },
      "staff_two_staff_two": { "name": "Cajados Arcanos Gêmeos" },
      "staff_two_orb": { "name": "Arcanista do Vazio" },
      "staff_two_tome": { "name": "Erudito do Vazio" },
      "staff_two_hammer": { "name": "Esmagador Rúnico" },
      "staff_two_spear": { "name": "Lanceiro das Linhas" },
      "staff_two_shield": { "name": "Guardião de Sigilos" },
      "orb_none": { "name": "Feiticeiro" },
      "orb_sword_one": { "name": "Cavaleiro Rúnico" },
      "orb_sword_two": { "name": "Cavaleiro Eldritch" },
      "orb_great_sword": { "name": "Berserker do Vazio" },
      "orb_dagger": { "name": "Devorador de Almas" },
      "orb_dagger_off": { "name": "Esgrimista de Almas" },
      "orb_bow_short": { "name": "Observador de Estrelas" },
      "orb_bow_long": { "name": "Vidente do Vazio" },
      "orb_staff_one": { "name": "Mago Estelar" },
      "orb_staff_two": { "name": "Arcanista do Vazio" },
      "orb_orb": { "name": "Orbes Gêmeos" },
      "orb_tome": { "name": "Erudito Rúnico" },
      "orb_hammer": { "name": "Esmagador Astral" },
      "orb_spear": { "name": "Lanceiro Astral" },
      "orb_shield": { "name": "Guardião Astral" },
      "tome_none": { "name": "Erudito" },
      "tome_sword_one": { "name": "Mago de Batalha" },
      "tome_sword_two": { "name": "Lâmina Hex" },
      "tome_great_sword": { "name": "Cavaleiro da Ruína" },
      "tome_dagger": { "name": "Sábio das Trevas" },
      "tome_dagger_off": { "name": "Esgrimista Amaldiçoado" },
      "tome_bow_short": { "name": "Mestre das Feras" },
      "tome_bow_long": { "name": "Caçador Oráculo" },
      "tome_staff_one": { "name": "Erudito" },
      "tome_staff_two": { "name": "Erudito do Vazio" },
      "tome_orb": { "name": "Erudito Rúnico" },
      "tome_tome": { "name": "Grimórios Gêmeos" },
      "tome_hammer": { "name": "Guardião Rúnico" },
      "tome_spear": { "name": "Lanceiro do Destino" },
      "tome_shield": { "name": "Erudito de Égide" },
      "hammer_none": { "name": "Cruzado" },
      "hammer_sword_one": { "name": "Belicista" },
      "hammer_sword_two": { "name": "Lâmina de Guerra" },
      "hammer_great_sword": { "name": "Juggernaut" },
      "hammer_dagger": { "name": "Quebra-Costas" },
      "hammer_dagger_off": { "name": "Esmagador Veloz" },
      "hammer_bow_short": { "name": "Caçador de Trovões" },
      "hammer_bow_long": { "name": "Caçador Pesado" },
      "hammer_staff_one": { "name": "Mago da Terra" },
      "hammer_staff_two": { "name": "Esmagador Rúnico" },
      "hammer_orb": { "name": "Esmagador Astral" },
      "hammer_tome": { "name": "Guardião Rúnico" },
      "hammer_hammer": { "name": "Martelos Gêmeos" },
      "hammer_spear": { "name": "Lanceiro de Guerra" },
      "hammer_shield": { "name": "Baluarte" },
      "spear_none": { "name": "Lanceiro" },
      "spear_sword_one": { "name": "Hoplista" },
      "spear_sword_two": { "name": "Lanceiro de Lâminas" },
      "spear_great_sword": { "name": "Senhor da Guerra" },
      "spear_dagger": { "name": "Lanceiro Sombrio" },
      "spear_dagger_off": { "name": "Lanceiro Leve" },
      "spear_bow_short": { "name": "Caçador de Lança" },
      "spear_bow_long": { "name": "Alcance Longo" },
      "spear_staff_one": { "name": "Mago das Tempestades" },
      "spear_staff_two": { "name": "Lanceiro das Linhas" },
      "spear_orb": { "name": "Lanceiro Astral" },
      "spear_tome": { "name": "Lanceiro do Destino" },
      "spear_hammer": { "name": "Lanceiro de Guerra" },
      "spear_spear": { "name": "Lanças Gêmeas" },
      "spear_shield": { "name": "Falange" },
      "shield_none": { "name": "Sentinela" },
      "shield_sword_one": { "name": "Paladino" },
      "shield_sword_two": { "name": "Sábio da Espada" },
      "shield_great_sword": { "name": "Vanguarda de Ferro" },
      "shield_dagger": { "name": "Cavaleiro do Terror" },
      "shield_dagger_off": { "name": "Sentinela Veloz" },
      "shield_bow_short": { "name": "Guardião da Floresta" },
      "shield_bow_long": { "name": "Arqueiro Sentinela" },
      "shield_staff_one": { "name": "Templário Arcano" },
      "shield_staff_two": { "name": "Guardião de Sigilos" },
      "shield_orb": { "name": "Guardião Astral" },
      "shield_tome": { "name": "Erudito de Égide" },
      "shield_hammer": { "name": "Baluarte" },
      "shield_spear": { "name": "Falange" },
      "shield_shield": { "name": "Baluarte de Ferro" }
    },    "login": {
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
      "registerTab": "CRIAR CONTA",
      "originTitle": "Origem",
      "originHint": "Sua origem é cosmética — não altera atributos. O personagem é moldado pelas armas que empunha.",
      "weaponTitle": "Arma inicial",
      "weaponHint": "Você começa com proficiência nesta arma — troque de arma quando quiser.",
      "originRequired": "Escolha sua origem.",
      "weaponRequired": "Escolha sua arma inicial.",
      "luckHint": "+0,1% de XP por ponto de sorte",
      "proficiencyHint": "Suba usando a arma — ataques, skills e abates dão proficiência.",
      "nextSkill": "Próxima skill",
    "proficiencies": {
      "sword_one": "Espada de uma mão",
      "sword_two": "Espada longa",
      "great_sword": "Espadão",
      "dagger": "Adaga",
      "dagger_off": "Adaga de apoio",
      "bow_short": "Arco curto",
      "bow_long": "Arco longo",
      "staff_one": "Cajado",
      "staff_two": "Cajado arcano",
      "orb": "Orbe",
      "tome": "Grimório",
      "hammer": "Martelo",
      "spear": "Lança",
      "shield": "Escudo"
    },
      "onlineLabel": "Aventureiros na fronteira",
      "onlineJoin": "e"
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
    "partyCombat": {
      "started": "Caçada de grupo iniciada",
      "ended": "Caçada encerrada — bônus de equipe:",
      "aborted": "Caçada de grupo cancelada.",
      "failed": "Não foi possível iniciar a caçada",
      "activeHunt": "Caçada de grupo",
      "round": "Turno",
      "startHunt": "Caçar em grupo",
      "endHunt": "Encerrar caçada",
      "waitLeader": "O líder inicia a caçada",
      "membersWord": "membros",
      "sizeBonusHint": "Bônus por membro na caçada: +10% XP · +5% ouro · +3% loot",
      "startDungeon": "Dungeon em grupo",
      "enterFloor": "Entrar no andar",
      "floor": "Andar",
      "regionMismatch": "lute na região da caçada p/ receber auras",
      "reason": { "not_leader": "apenas o líder inicia", "already": "já existe caçada ativa" }
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
      "equipMain": "Equipar (mão principal)",
      "equipOff": "Equipar (mão secundária)",
      "sameWeaponCategory": "Você já usa essa categoria de arma na outra mão.",
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
      "badCommand": "Comando inválido",
      "whoOnline": "Jogadores online",
      "offlineWhispers": "sussurros recebidos enquanto você estava offline",
      "whisperQueued": "Sussurro guardado para entrega quando o jogador conectar",
      "muted": " silenciado",
      "unmuted": " desbloqueado",
      "actionMute": "Silenciar"
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
      "tabs": { "buy": "Comprar", "sell": "Vender", "mine": "Minhas ofertas", "auctions": "Leilões" },
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
      "searchPlaceholder": "🔎 Buscar item por nome...",
      "crystalsCurrency": "O mercado mundial usa 💎 Cristais (moeda paga) — o ouro do jogo fica protegido da economia entre jogadores."
    },
    "auction": {
      "createTitle": "Criar leilão",
      "feeNote": "Taxa de listagem: 3 💎 (não reembolsável). Imposto de 5% sobre o valor final.",
      "startPrice": "Preço inicial (💎)",
      "duration": "Duração:",
      "create": "Leiloar",
      "created": "Leilão criado!",
      "activeTitle": "Leilões ativos",
      "empty": "Nenhum leilão ativo.",
      "seller": "Vendedor",
      "bidsWord": "lances",
      "startAbbr": "início",
      "minBid": "Lance mínimo",
      "bid": "Dar lance",
      "bidPlaced": "Lance registrado!",
      "bidTooLow": "Lance abaixo do mínimo",
      "yours": "Seu leilão",
      "expired": "encerrado",
      "error": "Erro no leilão","myBidsTitle": "Meus lances","won": "VENCEU! 🎉","lost": "perdeu","winning": "ganhando","outbidState": "coberto"
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
        "name": "Corte Giratório",
        "desc": "Causa 150% do ATK físico."
      },
      "slash": {
        "name": "Corte Rápido",
        "desc": "Causa 130% do ATK físico."
      },
      "dash_cut": {
        "name": "Corte Veloz",
        "desc": "Causa 200% do ATK físico."
      },
      "parry_counter": {
        "name": "Contra-Apara",
        "desc": "Causa 120% do ATK físico. Atordoa o alvo por 1 turno(s)."
      },
      "war_cry": {
        "name": "Grito de Guerra",
        "desc": "Aumenta a defesa em 25% por 3 turnos. e restaura 10% do hp máximo."
      },
      "blade_flurry": {
        "name": "Flurry de Lâminas",
        "desc": "Causa 4 golpes de 45% do ATK físico."
      },
      "thousand_cuts": {
        "name": "Mil Cortes",
        "desc": "Causa 5 golpes de 40% do ATK físico."
      },
      "long_swipe": {
        "name": "Golpe Largo",
        "desc": "Causa 140% do ATK físico."
      },
      "bleed": {
        "name": "Sangramento",
        "desc": "Causa 40 de dano por 3 turnos."
      },
      "iron_will": {
        "name": "Vontade de Ferro",
        "desc": "Aumenta a defesa em 35% por 3 turnos."
      },
      "deep_wound": {
        "name": "Ferida Profunda",
        "desc": "Causa 60 de dano por 3 turnos."
      },
      "counter_gambit": {
        "name": "Gambito Contra",
        "desc": "Causa 180% do ATK físico. Esquiva o próximo golpe."
      },
      "cross_slash": {
        "name": "Corte Cruzado",
        "desc": "Causa 180% do ATK físico."
      },
      "crescent_slash": {
        "name": "Corte Crescente",
        "desc": "Causa 3 golpes de 60% do ATK físico."
      },
      "brutal_slam": {
        "name": "Golpe Brutal",
        "desc": "Causa 170% do ATK físico. Atordoa o alvo por 1 turno(s)."
      },
      "cleave": {
        "name": "Fender",
        "desc": "Causa 2 golpes de 110% do ATK físico."
      },
      "battle_fury": {
        "name": "Fúria de Batalha",
        "desc": "Aumenta a defesa em 25% por 3 turnos. e restaura 15% do hp máximo."
      },
      "execute": {
        "name": "Executar",
        "desc": "Causa 400% do ATK físico. Executa alvos abaixo de 20% de HP."
      },
      "colossus_smash": {
        "name": "Esmagada do Colosso",
        "desc": "Causa 300% do ATK físico."
      },
      "blade_storm": {
        "name": "Tempestade de Lâminas",
        "desc": "Causa 3 golpes de 90% do ATK físico."
      },
      "onslaught": {
        "name": "Investida",
        "desc": "Causa 5 golpes de 35% do ATK físico."
      },
      "stab": {
        "name": "Estocada",
        "desc": "Causa 120% do ATK físico. Causa 25 de dano por 2 turnos."
      },
      "smoke_bomb": {
        "name": "Bomba de Fumaça",
        "desc": "Aumenta a defesa em 20% por 2 turnos. Esquiva o próximo golpe."
      },
      "death_mark": {
        "name": "Marca da Morte",
        "desc": "Marca o alvo: +50% de dano recebido por 3 turnos."
      },
      "eviscerate": {
        "name": "Eviscerar",
        "desc": "Causa 200% do ATK físico."
      },
      "shadow_step": {
        "name": "Passo Sombrio",
        "desc": "Causa 180% do ATK físico. Esquiva o próximo golpe."
      },
      "fan_of_knives": {
        "name": "Leque de Adagas",
        "desc": "Causa 3 golpes de 50% do ATK físico."
      },
      "assassinate": {
        "name": "Assassinar",
        "desc": "Causa 320% do ATK físico. Executa alvos abaixo de 25% de HP."
      },
      "feint": {
        "name": "Finta",
        "desc": "Causa 100% do ATK físico. Retarda o alvo por 2 turno(s)."
      },
      "double_slash": {
        "name": "Corte Duplo",
        "desc": "Causa 2 golpes de 90% do ATK físico."
      },
      "riposte": {
        "name": "Riposta",
        "desc": "Causa 140% do ATK físico. Esquiva o próximo golpe."
      },
      "lacerate": {
        "name": "Lacerar",
        "desc": "Causa 100% do ATK físico. Causa 50 de dano por 3 turnos."
      },
      "twin_fang": {
        "name": "Presas Gêmeas",
        "desc": "Causa 2 golpes de 80% do ATK físico."
      },
      "whirl_dagger": {
        "name": "Adaga Giratória",
        "desc": "Causa 4 golpes de 45% do ATK físico."
      },
      "shadow_parry": {
        "name": "Apara Sombria",
        "desc": "Causa 160% do ATK físico. Atordoa o alvo por 1 turno(s). Esquiva o próximo golpe."
      },
      "piercing_shot": {
        "name": "Disparo Perfurante",
        "desc": "Causa 160% do ATK físico. Ignora a defesa do inimigo."
      },
      "aimed_shot": {
        "name": "Disparo Mirado",
        "desc": "Causa 170% do ATK físico. Ignora a defesa do inimigo."
      },
      "quick_shot": {
        "name": "Disparo Rápido",
        "desc": "Causa 100% do ATK físico. Retarda o alvo por 1 turno(s)."
      },
      "hunters_mark": {
        "name": "Marca do Caçador",
        "desc": "Marca o alvo: +40% de dano recebido por 3 turnos."
      },
      "scatter_shot": {
        "name": "Disparo Disperso",
        "desc": "Causa 3 golpes de 40% do ATK físico."
      },
      "kiting_shot": {
        "name": "Disparo de Fuga",
        "desc": "Causa 110% do ATK físico. Retarda o alvo por 2 turno(s)."
      },
      "rapid_fire": {
        "name": "Fogo Rápido",
        "desc": "Causa 5 golpes de 35% do ATK físico."
      },
      "precision_shot": {
        "name": "Tiro de Precisão",
        "desc": "Causa 180% do ATK físico. Ignora a defesa do inimigo."
      },
      "rain_of_arrows": {
        "name": "Chuva de Flechas",
        "desc": "Causa 4 golpes de 55% do ATK físico."
      },
      "volley": {
        "name": "Rajada",
        "desc": "Causa 3 golpes de 55% do ATK físico."
      },
      "eagle_eye": {
        "name": "Olho de Águia",
        "desc": "Marca o alvo: +45% de dano recebido por 3 turnos."
      },
      "sniper_shot": {
        "name": "Tiro de Sniper",
        "desc": "Causa 220% do ATK físico. Ignora a defesa do inimigo."
      },
      "wind_arrow": {
        "name": "Flecha do Vento",
        "desc": "Causa 140% do ATK físico. Retarda o alvo por 1 turno(s)."
      },
      "dead_eye": {
        "name": "Olho Morto",
        "desc": "Causa 260% do ATK físico. Executa alvos abaixo de 30% de HP."
      },
      "arcane_burst": {
        "name": "Rajada Arcana",
        "desc": "Causa 150% do ATK mágico."
      },
      "arcane_missile": {
        "name": "Míssil Arcano",
        "desc": "Causa 130% do ATK mágico."
      },
      "heal_pulse": {
        "name": "Pulso de Cura",
        "desc": "Restaura 45% do HP máximo."
      },
      "arcane_bind": {
        "name": "Ligação Arcana",
        "desc": "Causa 80% do ATK mágico. Atordoa o alvo por 1 turno(s)."
      },
      "mana_shield": {
        "name": "Escudo de Mana",
        "desc": "Aumenta a defesa em 30% por 3 turnos. e restaura 15% do hp máximo."
      },
      "greater_heal": {
        "name": "Cura Maior",
        "desc": "Restaura 70% do HP máximo."
      },
      "arcane_blast": {
        "name": "Explosão Arcana",
        "desc": "Causa 3 golpes de 60% do ATK mágico."
      },
      "frost_bolt": {
        "name": "Projétil de Gelo",
        "desc": "Causa 140% do ATK mágico. Retarda o alvo por 1 turno(s)."
      },
      "ice_nova": {
        "name": "Nova de Gelo",
        "desc": "Causa 130% do ATK mágico. Retarda o alvo por 2 turno(s)."
      },
      "blizzard": {
        "name": "Nevasca",
        "desc": "Causa 4 golpes de 40% do ATK mágico. Retarda o alvo por 1 turno(s)."
      },
      "arcane_armor": {
        "name": "Armadura Arcana",
        "desc": "Aumenta a defesa em 40% por 3 turnos."
      },
      "chain_lightning": {
        "name": "Raio em Cadeia",
        "desc": "Causa 170% do ATK mágico."
      },
      "elemental_chaos": {
        "name": "Caos Elemental",
        "desc": "Causa 240% do ATK mágico."
      },
      "time_warp": {
        "name": "Distorção Temporal",
        "desc": "Marca o alvo: +50% de dano recebido por 3 turnos."
      },
      "void_bolt": {
        "name": "Projétil do Vazio",
        "desc": "Causa 150% do ATK do vazio."
      },
      "void_rupture": {
        "name": "Ruptura do Vazio",
        "desc": "Causa 120% do ATK do vazio. Causa 45 de dano por 3 turnos."
      },
      "astral_barrier": {
        "name": "Barreira Astral",
        "desc": "Aumenta a defesa em 35% por 3 turnos."
      },
      "gravity_well": {
        "name": "Poço Gravitacional",
        "desc": "Causa 100% do ATK do vazio. Atordoa o alvo por 1 turno(s)."
      },
      "void_armor": {
        "name": "Armadura do Vazio",
        "desc": "Aumenta a defesa em 35% por 3 turnos. e restaura 10% do hp máximo."
      },
      "void_gate": {
        "name": "Portal do Vazio",
        "desc": "Causa 300% do ATK do vazio."
      },
      "cosmic_burst": {
        "name": "Explosão Cósmica",
        "desc": "Causa 5 golpes de 40% do ATK do vazio."
      },
      "arcane_mark": {
        "name": "Marca Arcana",
        "desc": "Marca o alvo: +40% de dano recebido por 3 turnos."
      },
      "root": {
        "name": "Raízes",
        "desc": "Causa 60% do ATK mágico. Atordoa o alvo por 1 turno(s)."
      },
      "petrify": {
        "name": "Petrificar",
        "desc": "Causa 90% do ATK mágico. Atordoa o alvo por 1 turno(s)."
      },
      "arcane_ward": {
        "name": "Guarda Arcano",
        "desc": "Aumenta a defesa em 30% por 3 turnos. e restaura 25% do hp máximo."
      },
      "rune_shield": {
        "name": "Escudo Rúnico",
        "desc": "Aumenta a defesa em 45% por 2 turnos."
      },
      "draining_tome": {
        "name": "Grimório Drenante",
        "desc": "Causa 100% do ATK mágico. Restaura 30% do HP máximo."
      },
      "forbidden_knowledge": {
        "name": "Conhecimento Proibido",
        "desc": "Causa 300% do ATK mágico."
      },
      "crushing_blow": {
        "name": "Golpe Esmagador",
        "desc": "Causa 160% do ATK físico."
      },
      "fortress": {
        "name": "Fortaleza",
        "desc": "Aumenta a defesa em 40% por 3 turnos."
      },
      "earth_shake": {
        "name": "Tremor de Terra",
        "desc": "Causa 3 golpes de 50% do ATK físico. Retarda o alvo por 1 turno(s)."
      },
      "unbreakable": {
        "name": "Inquebrável",
        "desc": "Aumenta a defesa em 50% por 2 turnos."
      },
      "war_stomp": {
        "name": "Pisão de Guerra",
        "desc": "Causa 90% do ATK físico. Atordoa o alvo por 1 turno(s)."
      },
      "seismic_slam": {
        "name": "Impacto Sísmico",
        "desc": "Causa 250% do ATK físico. Atordoa o alvo por 1 turno(s)."
      },
      "titan_fall": {
        "name": "Queda do Titã",
        "desc": "Causa 280% do ATK físico."
      },
      "precise_thrust": {
        "name": "Estocada Precisa",
        "desc": "Causa 150% do ATK físico. Ignora a defesa do inimigo."
      },
      "thorns": {
        "name": "Espinhos",
        "desc": "Reflete 35% do dano recebido por 3 turnos."
      },
      "sweeping_strike": {
        "name": "Golpe Varrente",
        "desc": "Causa 2 golpes de 85% do ATK físico."
      },
      "serpent_spike": {
        "name": "Espinho de Serpente",
        "desc": "Causa 100% do ATK físico. Causa 40 de dano por 3 turnos."
      },
      "nature_burst": {
        "name": "Explosão Natural",
        "desc": "Causa 200% do ATK mágico."
      },
      "phalanx_ward": {
        "name": "Guarda Falange",
        "desc": "Aumenta a defesa em 35% por 3 turnos."
      },
      "dragon_lance": {
        "name": "Lança do Dragão",
        "desc": "Causa 260% do ATK físico. Retarda o alvo por 1 turno(s)."
      },
      "shield_bash": {
        "name": "Investida de Escudo",
        "desc": "Causa 120% do ATK físico. Atordoa o alvo por 1 turno(s)."
      },
      "shield_slam": {
        "name": "Esmagada de Escudo",
        "desc": "Causa 130% do ATK físico. Retarda o alvo por 1 turno(s)."
      },
      "provoke": {
        "name": "Provocar",
        "desc": "Marca o alvo: +30% de dano recebido por 3 turnos."
      },
      "bastion": {
        "name": "Bastião",
        "desc": "Aumenta a defesa em 60% por 2 turnos."
      },
      "aegis_guard": {
        "name": "Guarda de Égide",
        "desc": "Aumenta a defesa em 50% por 2 turnos. e restaura 15% do hp máximo."
      },
      "shield_charge": {
        "name": "Carga de Escudo",
        "desc": "Causa 180% do ATK físico. Atordoa o alvo por 1 turno(s)."
      },
      "holy_aegis": {
        "name": "Égide Sagrada",
        "desc": "Aumenta a defesa em 20% por 2 turnos. e restaura 50% do hp máximo."
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
    "combos": {
      "sword_one_none": { "name": "Blade" },
      "sword_one_sword_one": { "name": "Twin Blades" },
      "sword_one_sword_two": { "name": "Sword Dancer" },
      "sword_one_great_sword": { "name": "Vanguard" },
      "sword_one_dagger": { "name": "Duelist" },
      "sword_one_dagger_off": { "name": "Fencer" },
      "sword_one_bow_short": { "name": "Skirmisher" },
      "sword_one_bow_long": { "name": "Pathfinder" },
      "sword_one_staff_one": { "name": "Spellblade" },
      "sword_one_staff_two": { "name": "Arcane Knight" },
      "sword_one_orb": { "name": "Rune Knight" },
      "sword_one_tome": { "name": "Battle Mage" },
      "sword_one_hammer": { "name": "Warmonger" },
      "sword_one_spear": { "name": "Hoplite" },
      "sword_one_shield": { "name": "Paladin" },
      "sword_two_none": { "name": "Longblade" },
      "sword_two_sword_one": { "name": "Sword Dancer" },
      "sword_two_sword_two": { "name": "Twin Longblades" },
      "sword_two_great_sword": { "name": "Blade Master" },
      "sword_two_dagger": { "name": "Blade Dancer" },
      "sword_two_dagger_off": { "name": "Parrymaster" },
      "sword_two_bow_short": { "name": "Ranger Knight" },
      "sword_two_bow_long": { "name": "Hawkeye" },
      "sword_two_staff_one": { "name": "Rune Blader" },
      "sword_two_staff_two": { "name": "Arcane Blademaster" },
      "sword_two_orb": { "name": "Eldritch Knight" },
      "sword_two_tome": { "name": "Hexblade" },
      "sword_two_hammer": { "name": "Warblade" },
      "sword_two_spear": { "name": "Blade Lancer" },
      "sword_two_shield": { "name": "Sword Sage" },
      "great_sword_none": { "name": "Berserker" },
      "great_sword_sword_one": { "name": "Reaver" },
      "great_sword_sword_two": { "name": "War Master" },
      "great_sword_great_sword": { "name": "Colossus" },
      "great_sword_dagger": { "name": "Blood Reaver" },
      "great_sword_dagger_off": { "name": "Frenzy" },
      "great_sword_bow_short": { "name": "Storm Raider" },
      "great_sword_bow_long": { "name": "Huntmaster" },
      "great_sword_staff_one": { "name": "Chaos Warrior" },
      "great_sword_staff_two": { "name": "Rift Berserker" },
      "great_sword_orb": { "name": "Void Berserker" },
      "great_sword_tome": { "name": "Ruin Knight" },
      "great_sword_hammer": { "name": "Juggernaut" },
      "great_sword_spear": { "name": "Warlord" },
      "great_sword_shield": { "name": "Iron Vanguard" },
      "dagger_none": { "name": "Assassin" },
      "dagger_sword_one": { "name": "Rogue" },
      "dagger_sword_two": { "name": "Shadow Duelist" },
      "dagger_great_sword": { "name": "Night Reaver" },
      "dagger_dagger": { "name": "Twin Shadows" },
      "dagger_dagger_off": { "name": "Phantom" },
      "dagger_bow_short": { "name": "Stalker" },
      "dagger_bow_long": { "name": "Night Hunter" },
      "dagger_staff_one": { "name": "Hex Assassin" },
      "dagger_staff_two": { "name": "Shadow Arcanist" },
      "dagger_orb": { "name": "Soul Eater" },
      "dagger_tome": { "name": "Dark Sage" },
      "dagger_hammer": { "name": "Backbreaker" },
      "dagger_spear": { "name": "Shadow Lancer" },
      "dagger_shield": { "name": "Dread Knight" },
      "dagger_off_none": { "name": "Sideblade" },
      "dagger_off_sword_one": { "name": "Fencer" },
      "dagger_off_sword_two": { "name": "Parrymaster" },
      "dagger_off_great_sword": { "name": "Swift Reaver" },
      "dagger_off_dagger": { "name": "Twin Shadows" },
      "dagger_off_dagger_off": { "name": "Twin Sideblades" },
      "dagger_off_bow_short": { "name": "Quick Stalker" },
      "dagger_off_bow_long": { "name": "Ghost Archer" },
      "dagger_off_staff_one": { "name": "Arcane Fencer" },
      "dagger_off_staff_two": { "name": "Veil Mage" },
      "dagger_off_orb": { "name": "Soul Fencer" },
      "dagger_off_tome": { "name": "Cursed Fencer" },
      "dagger_off_hammer": { "name": "Swift Crusher" },
      "dagger_off_spear": { "name": "Light Lancer" },
      "dagger_off_shield": { "name": "Swift Sentinel" },
      "bow_short_none": { "name": "Ranger" },
      "bow_short_sword_one": { "name": "Skirmisher" },
      "bow_short_sword_two": { "name": "Ranger Knight" },
      "bow_short_great_sword": { "name": "Storm Raider" },
      "bow_short_dagger": { "name": "Stalker" },
      "bow_short_dagger_off": { "name": "Quick Stalker" },
      "bow_short_bow_short": { "name": "Twin Bows" },
      "bow_short_bow_long": { "name": "Wind Archer" },
      "bow_short_staff_one": { "name": "Nature Mage" },
      "bow_short_staff_two": { "name": "Stormcaller" },
      "bow_short_orb": { "name": "Star Gazer" },
      "bow_short_tome": { "name": "Beast Master" },
      "bow_short_hammer": { "name": "Thunder Hunter" },
      "bow_short_spear": { "name": "Spear Hunter" },
      "bow_short_shield": { "name": "Forest Guardian" },
      "bow_long_none": { "name": "Hunter" },
      "bow_long_sword_one": { "name": "Pathfinder" },
      "bow_long_sword_two": { "name": "Hawkeye" },
      "bow_long_great_sword": { "name": "Huntmaster" },
      "bow_long_dagger": { "name": "Night Hunter" },
      "bow_long_dagger_off": { "name": "Ghost Archer" },
      "bow_long_bow_short": { "name": "Wind Archer" },
      "bow_long_bow_long": { "name": "Twin Longbows" },
      "bow_long_staff_one": { "name": "Farsight Mage" },
      "bow_long_staff_two": { "name": "Eclipse Archer" },
      "bow_long_orb": { "name": "Void Seer" },
      "bow_long_tome": { "name": "Oracle Hunter" },
      "bow_long_hammer": { "name": "Heavy Hunter" },
      "bow_long_spear": { "name": "Long Reach" },
      "bow_long_shield": { "name": "Sentinel Archer" },
      "staff_one_none": { "name": "Mage" },
      "staff_one_sword_one": { "name": "Spellblade" },
      "staff_one_sword_two": { "name": "Rune Blader" },
      "staff_one_great_sword": { "name": "Chaos Warrior" },
      "staff_one_dagger": { "name": "Hex Assassin" },
      "staff_one_dagger_off": { "name": "Arcane Fencer" },
      "staff_one_bow_short": { "name": "Nature Mage" },
      "staff_one_bow_long": { "name": "Farsight Mage" },
      "staff_one_staff_one": { "name": "Twin Staves" },
      "staff_one_staff_two": { "name": "Archmage" },
      "staff_one_orb": { "name": "Star Mage" },
      "staff_one_tome": { "name": "Scholar" },
      "staff_one_hammer": { "name": "Earth Mage" },
      "staff_one_spear": { "name": "Storm Mage" },
      "staff_one_shield": { "name": "Arcane Templar" },
      "staff_two_none": { "name": "Arcanist" },
      "staff_two_sword_one": { "name": "Arcane Knight" },
      "staff_two_sword_two": { "name": "Arcane Blademaster" },
      "staff_two_great_sword": { "name": "Rift Berserker" },
      "staff_two_dagger": { "name": "Shadow Arcanist" },
      "staff_two_dagger_off": { "name": "Veil Mage" },
      "staff_two_bow_short": { "name": "Stormcaller" },
      "staff_two_bow_long": { "name": "Eclipse Archer" },
      "staff_two_staff_one": { "name": "Archmage" },
      "staff_two_staff_two": { "name": "Twin Arcane Staves" },
      "staff_two_orb": { "name": "Void Arcanist" },
      "staff_two_tome": { "name": "Void Scholar" },
      "staff_two_hammer": { "name": "Rune Crusher" },
      "staff_two_spear": { "name": "Ley Lancer" },
      "staff_two_shield": { "name": "Sigil Guardian" },
      "orb_none": { "name": "Sorcerer" },
      "orb_sword_one": { "name": "Rune Knight" },
      "orb_sword_two": { "name": "Eldritch Knight" },
      "orb_great_sword": { "name": "Void Berserker" },
      "orb_dagger": { "name": "Soul Eater" },
      "orb_dagger_off": { "name": "Soul Fencer" },
      "orb_bow_short": { "name": "Star Gazer" },
      "orb_bow_long": { "name": "Void Seer" },
      "orb_staff_one": { "name": "Star Mage" },
      "orb_staff_two": { "name": "Void Arcanist" },
      "orb_orb": { "name": "Twin Orbs" },
      "orb_tome": { "name": "Rune Scholar" },
      "orb_hammer": { "name": "Astral Crusher" },
      "orb_spear": { "name": "Astral Lancer" },
      "orb_shield": { "name": "Astral Guardian" },
      "tome_none": { "name": "Scholar" },
      "tome_sword_one": { "name": "Battle Mage" },
      "tome_sword_two": { "name": "Hexblade" },
      "tome_great_sword": { "name": "Ruin Knight" },
      "tome_dagger": { "name": "Dark Sage" },
      "tome_dagger_off": { "name": "Cursed Fencer" },
      "tome_bow_short": { "name": "Beast Master" },
      "tome_bow_long": { "name": "Oracle Hunter" },
      "tome_staff_one": { "name": "Scholar" },
      "tome_staff_two": { "name": "Void Scholar" },
      "tome_orb": { "name": "Rune Scholar" },
      "tome_tome": { "name": "Twin Tomes" },
      "tome_hammer": { "name": "Rune Warden" },
      "tome_spear": { "name": "Fate Lancer" },
      "tome_shield": { "name": "Aegis Scholar" },
      "hammer_none": { "name": "Crusader" },
      "hammer_sword_one": { "name": "Warmonger" },
      "hammer_sword_two": { "name": "Warblade" },
      "hammer_great_sword": { "name": "Juggernaut" },
      "hammer_dagger": { "name": "Backbreaker" },
      "hammer_dagger_off": { "name": "Swift Crusher" },
      "hammer_bow_short": { "name": "Thunder Hunter" },
      "hammer_bow_long": { "name": "Heavy Hunter" },
      "hammer_staff_one": { "name": "Earth Mage" },
      "hammer_staff_two": { "name": "Rune Crusher" },
      "hammer_orb": { "name": "Astral Crusher" },
      "hammer_tome": { "name": "Rune Warden" },
      "hammer_hammer": { "name": "Twin Hammers" },
      "hammer_spear": { "name": "War Lancer" },
      "hammer_shield": { "name": "Bulwark" },
      "spear_none": { "name": "Lancer" },
      "spear_sword_one": { "name": "Hoplite" },
      "spear_sword_two": { "name": "Blade Lancer" },
      "spear_great_sword": { "name": "Warlord" },
      "spear_dagger": { "name": "Shadow Lancer" },
      "spear_dagger_off": { "name": "Light Lancer" },
      "spear_bow_short": { "name": "Spear Hunter" },
      "spear_bow_long": { "name": "Long Reach" },
      "spear_staff_one": { "name": "Storm Mage" },
      "spear_staff_two": { "name": "Ley Lancer" },
      "spear_orb": { "name": "Astral Lancer" },
      "spear_tome": { "name": "Fate Lancer" },
      "spear_hammer": { "name": "War Lancer" },
      "spear_spear": { "name": "Twin Spears" },
      "spear_shield": { "name": "Phalanx" },
      "shield_none": { "name": "Sentinel" },
      "shield_sword_one": { "name": "Paladin" },
      "shield_sword_two": { "name": "Sword Sage" },
      "shield_great_sword": { "name": "Iron Vanguard" },
      "shield_dagger": { "name": "Dread Knight" },
      "shield_dagger_off": { "name": "Swift Sentinel" },
      "shield_bow_short": { "name": "Forest Guardian" },
      "shield_bow_long": { "name": "Sentinel Archer" },
      "shield_staff_one": { "name": "Arcane Templar" },
      "shield_staff_two": { "name": "Sigil Guardian" },
      "shield_orb": { "name": "Astral Guardian" },
      "shield_tome": { "name": "Aegis Scholar" },
      "shield_hammer": { "name": "Bulwark" },
      "shield_spear": { "name": "Phalanx" },
      "shield_shield": { "name": "Iron Bulwark" }
    },    "login": {
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
      "registerTab": "CREATE ACCOUNT",
      "originTitle": "Origin",
      "originHint": "Your origin is cosmetic — it doesn't change attributes. Your character is shaped by the weapons you wield.",
      "weaponTitle": "Starting weapon",
      "weaponHint": "You begin with proficiency in this weapon — switch weapons whenever you want.",
      "originRequired": "Choose your origin.",
      "weaponRequired": "Choose your starting weapon.",
      "luckHint": "+0.1% XP per luck point",
      "proficiencyHint": "Level it up by using the weapon — attacks, skills and kills grant proficiency.",
      "nextSkill": "Next skill",
    "proficiencies": {
      "sword_one": "One-Handed Sword",
      "sword_two": "Long Sword",
      "great_sword": "Greatsword",
      "dagger": "Dagger",
      "dagger_off": "Off-Hand Dagger",
      "bow_short": "Short Bow",
      "bow_long": "Long Bow",
      "staff_one": "Staff",
      "staff_two": "Arcane Staff",
      "orb": "Orb",
      "tome": "Tome",
      "hammer": "Hammer",
      "spear": "Spear",
      "shield": "Shield"
    },
      "onlineLabel": "Adventurers at the frontier",
      "onlineJoin": "and"
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
    "partyCombat": {
      "started": "Party hunt started",
      "ended": "Hunt ended — team bonus:",
      "aborted": "Party hunt cancelled.",
      "failed": "Could not start the hunt",
      "activeHunt": "Party hunt",
      "round": "Round",
      "startHunt": "Hunt as a party",
      "endHunt": "End hunt",
      "waitLeader": "The leader starts the hunt",
      "membersWord": "members",
      "sizeBonusHint": "Bonus per member in the hunt: +10% XP · +5% gold · +3% loot",
      "startDungeon": "Party dungeon",
      "enterFloor": "Enter floor",
      "floor": "Floor",
      "regionMismatch": "fight in the hunt region to receive auras",
      "reason": { "not_leader": "only the leader starts it", "already": "a hunt is already active" }
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
      "equipMain": "Equip (main hand)",
      "equipOff": "Equip (off hand)",
      "sameWeaponCategory": "You already use this weapon category in the other hand.",
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
      "itemLinkHint": "Tip: paste [item:numId|effect:value|...] to link an item — e.g. [item:1005|1:65|4:5|7:3]"
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
      "tabs": { "buy": "Buy", "sell": "Sell", "mine": "My listings", "auctions": "Auctions" },
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
      "searchPlaceholder": "🔎 Search item by name...",
      "crystalsCurrency": "The world market uses 💎 Crystals (paid currency) — in-game gold stays protected from the player economy."
    },
    "auction": {
      "createTitle": "Create auction",
      "feeNote": "Listing fee: 3 💎 (non-refundable). 5% tax on the final amount.",
      "startPrice": "Starting price (💎)",
      "duration": "Duration:",
      "create": "Auction",
      "created": "Auction created!",
      "activeTitle": "Active auctions",
      "empty": "No active auctions.",
      "seller": "Seller",
      "bidsWord": "bids",
      "startAbbr": "start",
      "minBid": "Minimum bid",
      "bid": "Bid",
      "bidPlaced": "Bid placed!",
      "bidTooLow": "Bid below the minimum",
      "yours": "Your auction",
      "expired": "ended",
      "error": "Auction error","myBidsTitle": "My bids","won": "WON! 🎉","lost": "lost","winning": "winning","outbidState": "outbid"
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
      "empty": "Type a message.",
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
      "badCommand": "Invalid command",
      "whoOnline": "Players online",
      "offlineWhispers": "whispers received while you were offline",
      "whisperQueued": "Whisper saved for delivery when the player connects",
      "muted": " muted",
      "unmuted": " unmuted",
      "actionMute": "Mute"
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
        "desc": "Deals 150% of physical ATK damage."
      },
      "slash": {
        "name": "Quick Slash",
        "desc": "Deals 130% of physical ATK damage."
      },
      "dash_cut": {
        "name": "Dash Cut",
        "desc": "Deals 200% of physical ATK damage."
      },
      "parry_counter": {
        "name": "Parry Counter",
        "desc": "Deals 120% of physical ATK damage. Stuns the target for 1 turn(s)."
      },
      "war_cry": {
        "name": "War Cry",
        "desc": "Increases defense by 25% for 3 turns. e restores 10% of max hp."
      },
      "blade_flurry": {
        "name": "Blade Flurry",
        "desc": "Deals 4 hits of 45% physical ATK damage."
      },
      "thousand_cuts": {
        "name": "Thousand Cuts",
        "desc": "Deals 5 hits of 40% physical ATK damage."
      },
      "long_swipe": {
        "name": "Long Swipe",
        "desc": "Deals 140% of physical ATK damage."
      },
      "bleed": {
        "name": "Bleed",
        "desc": "Deals 40 damage per turn for 3 turns."
      },
      "iron_will": {
        "name": "Iron Will",
        "desc": "Increases defense by 35% for 3 turns."
      },
      "deep_wound": {
        "name": "Deep Wound",
        "desc": "Deals 60 damage per turn for 3 turns."
      },
      "counter_gambit": {
        "name": "Counter Gambit",
        "desc": "Deals 180% of physical ATK damage. Dodges the next incoming hit."
      },
      "cross_slash": {
        "name": "Cross Slash",
        "desc": "Deals 180% of physical ATK damage."
      },
      "crescent_slash": {
        "name": "Crescent Slash",
        "desc": "Deals 3 hits of 60% physical ATK damage."
      },
      "brutal_slam": {
        "name": "Brutal Slam",
        "desc": "Deals 170% of physical ATK damage. Stuns the target for 1 turn(s)."
      },
      "cleave": {
        "name": "Cleave",
        "desc": "Deals 2 hits of 110% physical ATK damage."
      },
      "battle_fury": {
        "name": "Battle Fury",
        "desc": "Increases defense by 25% for 3 turns. e restores 15% of max hp."
      },
      "execute": {
        "name": "Execute",
        "desc": "Deals 400% of physical ATK damage. Executes targets below 20% HP."
      },
      "colossus_smash": {
        "name": "Colossus Smash",
        "desc": "Deals 300% of physical ATK damage."
      },
      "blade_storm": {
        "name": "Blade Storm",
        "desc": "Deals 3 hits of 90% physical ATK damage."
      },
      "onslaught": {
        "name": "Onslaught",
        "desc": "Deals 5 hits of 35% physical ATK damage."
      },
      "stab": {
        "name": "Stab",
        "desc": "Deals 120% of physical ATK damage. Deals 25 damage per turn for 2 turns."
      },
      "smoke_bomb": {
        "name": "Smoke Bomb",
        "desc": "Increases defense by 20% for 2 turns. Dodges the next incoming hit."
      },
      "death_mark": {
        "name": "Death Mark",
        "desc": "Marks the target: +50% damage taken for 3 turns."
      },
      "eviscerate": {
        "name": "Eviscerate",
        "desc": "Deals 200% of physical ATK damage."
      },
      "shadow_step": {
        "name": "Shadow Step",
        "desc": "Deals 180% of physical ATK damage. Dodges the next incoming hit."
      },
      "fan_of_knives": {
        "name": "Fan of Knives",
        "desc": "Deals 3 hits of 50% physical ATK damage."
      },
      "assassinate": {
        "name": "Assassinate",
        "desc": "Deals 320% of physical ATK damage. Executes targets below 25% HP."
      },
      "feint": {
        "name": "Feint",
        "desc": "Deals 100% of physical ATK damage. Slows the target for 2 turn(s)."
      },
      "double_slash": {
        "name": "Double Slash",
        "desc": "Deals 2 hits of 90% physical ATK damage."
      },
      "riposte": {
        "name": "Riposte",
        "desc": "Deals 140% of physical ATK damage. Dodges the next incoming hit."
      },
      "lacerate": {
        "name": "Lacerate",
        "desc": "Deals 100% of physical ATK damage. Deals 50 damage per turn for 3 turns."
      },
      "twin_fang": {
        "name": "Twin Fang",
        "desc": "Deals 2 hits of 80% physical ATK damage."
      },
      "whirl_dagger": {
        "name": "Whirl Dagger",
        "desc": "Deals 4 hits of 45% physical ATK damage."
      },
      "shadow_parry": {
        "name": "Shadow Parry",
        "desc": "Deals 160% of physical ATK damage. Stuns the target for 1 turn(s). Dodges the next incoming hit."
      },
      "piercing_shot": {
        "name": "Piercing Shot",
        "desc": "Deals 160% of physical ATK damage. Ignores enemy defense."
      },
      "aimed_shot": {
        "name": "Aimed Shot",
        "desc": "Deals 170% of physical ATK damage. Ignores enemy defense."
      },
      "quick_shot": {
        "name": "Quick Shot",
        "desc": "Deals 100% of physical ATK damage. Slows the target for 1 turn(s)."
      },
      "hunters_mark": {
        "name": "Hunter's Mark",
        "desc": "Marks the target: +40% damage taken for 3 turns."
      },
      "scatter_shot": {
        "name": "Scatter Shot",
        "desc": "Deals 3 hits of 40% physical ATK damage."
      },
      "kiting_shot": {
        "name": "Kiting Shot",
        "desc": "Deals 110% of physical ATK damage. Slows the target for 2 turn(s)."
      },
      "rapid_fire": {
        "name": "Rapid Fire",
        "desc": "Deals 5 hits of 35% physical ATK damage."
      },
      "precision_shot": {
        "name": "Precision Shot",
        "desc": "Deals 180% of physical ATK damage. Ignores enemy defense."
      },
      "rain_of_arrows": {
        "name": "Rain of Arrows",
        "desc": "Deals 4 hits of 55% physical ATK damage."
      },
      "volley": {
        "name": "Volley",
        "desc": "Deals 3 hits of 55% physical ATK damage."
      },
      "eagle_eye": {
        "name": "Eagle Eye",
        "desc": "Marks the target: +45% damage taken for 3 turns."
      },
      "sniper_shot": {
        "name": "Sniper Shot",
        "desc": "Deals 220% of physical ATK damage. Ignores enemy defense."
      },
      "wind_arrow": {
        "name": "Wind Arrow",
        "desc": "Deals 140% of physical ATK damage. Slows the target for 1 turn(s)."
      },
      "dead_eye": {
        "name": "Dead Eye",
        "desc": "Deals 260% of physical ATK damage. Executes targets below 30% HP."
      },
      "arcane_burst": {
        "name": "Arcane Burst",
        "desc": "Deals 150% of magic ATK damage."
      },
      "arcane_missile": {
        "name": "Arcane Missile",
        "desc": "Deals 130% of magic ATK damage."
      },
      "heal_pulse": {
        "name": "Heal Pulse",
        "desc": "Restores 45% of max HP."
      },
      "arcane_bind": {
        "name": "Arcane Bind",
        "desc": "Deals 80% of magic ATK damage. Stuns the target for 1 turn(s)."
      },
      "mana_shield": {
        "name": "Mana Shield",
        "desc": "Increases defense by 30% for 3 turns. e restores 15% of max hp."
      },
      "greater_heal": {
        "name": "Greater Heal",
        "desc": "Restores 70% of max HP."
      },
      "arcane_blast": {
        "name": "Arcane Blast",
        "desc": "Deals 3 hits of 60% magic ATK damage."
      },
      "frost_bolt": {
        "name": "Frost Bolt",
        "desc": "Deals 140% of magic ATK damage. Slows the target for 1 turn(s)."
      },
      "ice_nova": {
        "name": "Ice Nova",
        "desc": "Deals 130% of magic ATK damage. Slows the target for 2 turn(s)."
      },
      "blizzard": {
        "name": "Blizzard",
        "desc": "Deals 4 hits of 40% magic ATK damage. Slows the target for 1 turn(s)."
      },
      "arcane_armor": {
        "name": "Arcane Armor",
        "desc": "Increases defense by 40% for 3 turns."
      },
      "chain_lightning": {
        "name": "Chain Lightning",
        "desc": "Deals 170% of magic ATK damage."
      },
      "elemental_chaos": {
        "name": "Elemental Chaos",
        "desc": "Deals 240% of magic ATK damage."
      },
      "time_warp": {
        "name": "Time Warp",
        "desc": "Marks the target: +50% damage taken for 3 turns."
      },
      "void_bolt": {
        "name": "Void Bolt",
        "desc": "Deals 150% of void ATK damage."
      },
      "void_rupture": {
        "name": "Void Rupture",
        "desc": "Deals 120% of void ATK damage. Deals 45 damage per turn for 3 turns."
      },
      "astral_barrier": {
        "name": "Astral Barrier",
        "desc": "Increases defense by 35% for 3 turns."
      },
      "gravity_well": {
        "name": "Gravity Well",
        "desc": "Deals 100% of void ATK damage. Stuns the target for 1 turn(s)."
      },
      "void_armor": {
        "name": "Void Armor",
        "desc": "Increases defense by 35% for 3 turns. e restores 10% of max hp."
      },
      "void_gate": {
        "name": "Void Gate",
        "desc": "Deals 300% of void ATK damage."
      },
      "cosmic_burst": {
        "name": "Cosmic Burst",
        "desc": "Deals 5 hits of 40% void ATK damage."
      },
      "arcane_mark": {
        "name": "Arcane Mark",
        "desc": "Marks the target: +40% damage taken for 3 turns."
      },
      "root": {
        "name": "Root",
        "desc": "Deals 60% of magic ATK damage. Stuns the target for 1 turn(s)."
      },
      "petrify": {
        "name": "Petrify",
        "desc": "Deals 90% of magic ATK damage. Stuns the target for 1 turn(s)."
      },
      "arcane_ward": {
        "name": "Arcane Ward",
        "desc": "Increases defense by 30% for 3 turns. e restores 25% of max hp."
      },
      "rune_shield": {
        "name": "Rune Shield",
        "desc": "Increases defense by 45% for 2 turns."
      },
      "draining_tome": {
        "name": "Draining Tome",
        "desc": "Deals 100% of magic ATK damage. Restores 30% of max HP."
      },
      "forbidden_knowledge": {
        "name": "Forbidden Knowledge",
        "desc": "Deals 300% of magic ATK damage."
      },
      "crushing_blow": {
        "name": "Crushing Blow",
        "desc": "Deals 160% of physical ATK damage."
      },
      "fortress": {
        "name": "Fortress",
        "desc": "Increases defense by 40% for 3 turns."
      },
      "earth_shake": {
        "name": "Earth Shake",
        "desc": "Deals 3 hits of 50% physical ATK damage. Slows the target for 1 turn(s)."
      },
      "unbreakable": {
        "name": "Unbreakable",
        "desc": "Increases defense by 50% for 2 turns."
      },
      "war_stomp": {
        "name": "War Stomp",
        "desc": "Deals 90% of physical ATK damage. Stuns the target for 1 turn(s)."
      },
      "seismic_slam": {
        "name": "Seismic Slam",
        "desc": "Deals 250% of physical ATK damage. Stuns the target for 1 turn(s)."
      },
      "titan_fall": {
        "name": "Titan Fall",
        "desc": "Deals 280% of physical ATK damage."
      },
      "precise_thrust": {
        "name": "Precise Thrust",
        "desc": "Deals 150% of physical ATK damage. Ignores enemy defense."
      },
      "thorns": {
        "name": "Thorns",
        "desc": "Reflects 35% of damage taken for 3 turns."
      },
      "sweeping_strike": {
        "name": "Sweeping Strike",
        "desc": "Deals 2 hits of 85% physical ATK damage."
      },
      "serpent_spike": {
        "name": "Serpent Spike",
        "desc": "Deals 100% of physical ATK damage. Deals 40 damage per turn for 3 turns."
      },
      "nature_burst": {
        "name": "Nature Burst",
        "desc": "Deals 200% of magic ATK damage."
      },
      "phalanx_ward": {
        "name": "Phalanx Ward",
        "desc": "Increases defense by 35% for 3 turns."
      },
      "dragon_lance": {
        "name": "Dragon Lance",
        "desc": "Deals 260% of physical ATK damage. Slows the target for 1 turn(s)."
      },
      "shield_bash": {
        "name": "Shield Bash",
        "desc": "Deals 120% of physical ATK damage. Stuns the target for 1 turn(s)."
      },
      "shield_slam": {
        "name": "Shield Slam",
        "desc": "Deals 130% of physical ATK damage. Slows the target for 1 turn(s)."
      },
      "provoke": {
        "name": "Provoke",
        "desc": "Marks the target: +30% damage taken for 3 turns."
      },
      "bastion": {
        "name": "Bastion",
        "desc": "Increases defense by 60% for 2 turns."
      },
      "aegis_guard": {
        "name": "Aegis Guard",
        "desc": "Increases defense by 50% for 2 turns. e restores 15% of max hp."
      },
      "shield_charge": {
        "name": "Shield Charge",
        "desc": "Deals 180% of physical ATK damage. Stuns the target for 1 turn(s)."
      },
      "holy_aegis": {
        "name": "Holy Aegis",
        "desc": "Increases defense by 20% for 2 turns. e restores 50% of max hp."
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
    "combos": {
      "sword_one_none": { "name": "Hoja" },
      "sword_one_sword_one": { "name": "Hojas Gemelas" },
      "sword_one_sword_two": { "name": "Bailarín de la Espada" },
      "sword_one_great_sword": { "name": "Vanguardia" },
      "sword_one_dagger": { "name": "Duelista" },
      "sword_one_dagger_off": { "name": "Esgrimista" },
      "sword_one_bow_short": { "name": "Escaramuzador" },
      "sword_one_bow_long": { "name": "Pionero" },
      "sword_one_staff_one": { "name": "Hoja Arcana" },
      "sword_one_staff_two": { "name": "Caballero Arcano" },
      "sword_one_orb": { "name": "Caballero Rúnico" },
      "sword_one_tome": { "name": "Mago de Batalla" },
      "sword_one_hammer": { "name": "Belicista" },
      "sword_one_spear": { "name": "Hoplita" },
      "sword_one_shield": { "name": "Paladín" },
      "sword_two_none": { "name": "Hoja Larga" },
      "sword_two_sword_one": { "name": "Bailarín de la Espada" },
      "sword_two_sword_two": { "name": "Hojas Largas Gemelas" },
      "sword_two_great_sword": { "name": "Maestro de las Hojas" },
      "sword_two_dagger": { "name": "Bailarín de Hojas" },
      "sword_two_dagger_off": { "name": "Maestro de la Parada" },
      "sword_two_bow_short": { "name": "Caballero Guardián" },
      "sword_two_bow_long": { "name": "Ojo de Halcón" },
      "sword_two_staff_one": { "name": "Hoja Rúnica" },
      "sword_two_staff_two": { "name": "Maestro Arcano de Hojas" },
      "sword_two_orb": { "name": "Caballero Arcano Antiguo" },
      "sword_two_tome": { "name": "Hoja Maldita" },
      "sword_two_hammer": { "name": "Hoja de Guerra" },
      "sword_two_spear": { "name": "Lancero de Hojas" },
      "sword_two_shield": { "name": "Sabio de la Espada" },
      "great_sword_none": { "name": "Berserker" },
      "great_sword_sword_one": { "name": "Segador" },
      "great_sword_sword_two": { "name": "Maestro de la Guerra" },
      "great_sword_great_sword": { "name": "Coloso" },
      "great_sword_dagger": { "name": "Segador de Sangre" },
      "great_sword_dagger_off": { "name": "Frenesí" },
      "great_sword_bow_short": { "name": "Saqueador de la Tormenta" },
      "great_sword_bow_long": { "name": "Maestro de la Caza" },
      "great_sword_staff_one": { "name": "Guerrero del Caos" },
      "great_sword_staff_two": { "name": "Berserker de la Grieta" },
      "great_sword_orb": { "name": "Berserker del Vacío" },
      "great_sword_tome": { "name": "Caballero de la Ruina" },
      "great_sword_hammer": { "name": "Juggernaut" },
      "great_sword_spear": { "name": "Señor de la Guerra" },
      "great_sword_shield": { "name": "Vanguardia de Hierro" },
      "dagger_none": { "name": "Asesino" },
      "dagger_sword_one": { "name": "Pícaro" },
      "dagger_sword_two": { "name": "Duelista Sombrío" },
      "dagger_great_sword": { "name": "Segador Nocturno" },
      "dagger_dagger": { "name": "Sombras Gemelas" },
      "dagger_dagger_off": { "name": "Fantasma" },
      "dagger_bow_short": { "name": "Acechador" },
      "dagger_bow_long": { "name": "Cazador Nocturno" },
      "dagger_staff_one": { "name": "Asesino Maldito" },
      "dagger_staff_two": { "name": "Arcanista Sombrío" },
      "dagger_orb": { "name": "Devorador de Almas" },
      "dagger_tome": { "name": "Sabio Oscuro" },
      "dagger_hammer": { "name": "Rompeespaldas" },
      "dagger_spear": { "name": "Lancero Sombrío" },
      "dagger_shield": { "name": "Caballero del Terror" },
      "dagger_off_none": { "name": "Hoja Lateral" },
      "dagger_off_sword_one": { "name": "Esgrimista" },
      "dagger_off_sword_two": { "name": "Maestro de la Parada" },
      "dagger_off_great_sword": { "name": "Segador Veloz" },
      "dagger_off_dagger": { "name": "Sombras Gemelas" },
      "dagger_off_dagger_off": { "name": "Hojas Laterales Gemelas" },
      "dagger_off_bow_short": { "name": "Acechador Veloz" },
      "dagger_off_bow_long": { "name": "Arquero Fantasma" },
      "dagger_off_staff_one": { "name": "Esgrimista Arcano" },
      "dagger_off_staff_two": { "name": "Mago del Velo" },
      "dagger_off_orb": { "name": "Esgrimista de Almas" },
      "dagger_off_tome": { "name": "Esgrimista Maldito" },
      "dagger_off_hammer": { "name": "Aplastador Veloz" },
      "dagger_off_spear": { "name": "Lancero Ligero" },
      "dagger_off_shield": { "name": "Centinela Veloz" },
      "bow_short_none": { "name": "Guardabosques" },
      "bow_short_sword_one": { "name": "Escaramuzador" },
      "bow_short_sword_two": { "name": "Caballero Guardián" },
      "bow_short_great_sword": { "name": "Saqueador de la Tormenta" },
      "bow_short_dagger": { "name": "Acechador" },
      "bow_short_dagger_off": { "name": "Acechador Veloz" },
      "bow_short_bow_short": { "name": "Arcos Gemelos" },
      "bow_short_bow_long": { "name": "Arquero del Viento" },
      "bow_short_staff_one": { "name": "Mago de la Naturaleza" },
      "bow_short_staff_two": { "name": "Invocador de Tormentas" },
      "bow_short_orb": { "name": "Observador de Estrellas" },
      "bow_short_tome": { "name": "Maestro de Bestias" },
      "bow_short_hammer": { "name": "Cazador de Truenos" },
      "bow_short_spear": { "name": "Cazador de Lanza" },
      "bow_short_shield": { "name": "Guardián del Bosque" },
      "bow_long_none": { "name": "Cazador" },
      "bow_long_sword_one": { "name": "Pionero" },
      "bow_long_sword_two": { "name": "Ojo de Halcón" },
      "bow_long_great_sword": { "name": "Maestro de la Caza" },
      "bow_long_dagger": { "name": "Cazador Nocturno" },
      "bow_long_dagger_off": { "name": "Arquero Fantasma" },
      "bow_long_bow_short": { "name": "Arquero del Viento" },
      "bow_long_bow_long": { "name": "Arcos Largos Gemelos" },
      "bow_long_staff_one": { "name": "Mago de Visión Lejana" },
      "bow_long_staff_two": { "name": "Arquero del Eclipse" },
      "bow_long_orb": { "name": "Vidente del Vacío" },
      "bow_long_tome": { "name": "Cazador Oráculo" },
      "bow_long_hammer": { "name": "Cazador Pesado" },
      "bow_long_spear": { "name": "Alcance Largo" },
      "bow_long_shield": { "name": "Arquero Centinela" },
      "staff_one_none": { "name": "Mago" },
      "staff_one_sword_one": { "name": "Hoja Arcana" },
      "staff_one_sword_two": { "name": "Hoja Rúnica" },
      "staff_one_great_sword": { "name": "Guerrero del Caos" },
      "staff_one_dagger": { "name": "Asesino Maldito" },
      "staff_one_dagger_off": { "name": "Esgrimista Arcano" },
      "staff_one_bow_short": { "name": "Mago de la Naturaleza" },
      "staff_one_bow_long": { "name": "Mago de Visión Lejana" },
      "staff_one_staff_one": { "name": "Báculos Gemelos" },
      "staff_one_staff_two": { "name": "Archimago" },
      "staff_one_orb": { "name": "Mago Estelar" },
      "staff_one_tome": { "name": "Erudito" },
      "staff_one_hammer": { "name": "Mago de la Tierra" },
      "staff_one_spear": { "name": "Mago de las Tormentas" },
      "staff_one_shield": { "name": "Templario Arcano" },
      "staff_two_none": { "name": "Arcanista" },
      "staff_two_sword_one": { "name": "Caballero Arcano" },
      "staff_two_sword_two": { "name": "Maestro Arcano de Hojas" },
      "staff_two_great_sword": { "name": "Berserker de la Grieta" },
      "staff_two_dagger": { "name": "Arcanista Sombrío" },
      "staff_two_dagger_off": { "name": "Mago del Velo" },
      "staff_two_bow_short": { "name": "Invocador de Tormentas" },
      "staff_two_bow_long": { "name": "Arquero del Eclipse" },
      "staff_two_staff_one": { "name": "Archimago" },
      "staff_two_staff_two": { "name": "Báculos Arcanos Gemelos" },
      "staff_two_orb": { "name": "Arcanista del Vacío" },
      "staff_two_tome": { "name": "Erudito del Vacío" },
      "staff_two_hammer": { "name": "Aplastador Rúnico" },
      "staff_two_spear": { "name": "Lancero de las Líneas" },
      "staff_two_shield": { "name": "Guardián de Sigilos" },
      "orb_none": { "name": "Hechicero" },
      "orb_sword_one": { "name": "Caballero Rúnico" },
      "orb_sword_two": { "name": "Caballero Arcano Antiguo" },
      "orb_great_sword": { "name": "Berserker del Vacío" },
      "orb_dagger": { "name": "Devorador de Almas" },
      "orb_dagger_off": { "name": "Esgrimista de Almas" },
      "orb_bow_short": { "name": "Observador de Estrellas" },
      "orb_bow_long": { "name": "Vidente del Vacío" },
      "orb_staff_one": { "name": "Mago Estelar" },
      "orb_staff_two": { "name": "Arcanista del Vacío" },
      "orb_orb": { "name": "Orbes Gemelos" },
      "orb_tome": { "name": "Erudito Rúnico" },
      "orb_hammer": { "name": "Aplastador Astral" },
      "orb_spear": { "name": "Lancero Astral" },
      "orb_shield": { "name": "Guardián Astral" },
      "tome_none": { "name": "Erudito" },
      "tome_sword_one": { "name": "Mago de Batalla" },
      "tome_sword_two": { "name": "Hoja Maldita" },
      "tome_great_sword": { "name": "Caballero de la Ruina" },
      "tome_dagger": { "name": "Sabio Oscuro" },
      "tome_dagger_off": { "name": "Esgrimista Maldito" },
      "tome_bow_short": { "name": "Maestro de Bestias" },
      "tome_bow_long": { "name": "Cazador Oráculo" },
      "tome_staff_one": { "name": "Erudito" },
      "tome_staff_two": { "name": "Erudito del Vacío" },
      "tome_orb": { "name": "Erudito Rúnico" },
      "tome_tome": { "name": "Grimorios Gemelos" },
      "tome_hammer": { "name": "Guardián Rúnico" },
      "tome_spear": { "name": "Lancero del Destino" },
      "tome_shield": { "name": "Erudito de Égida" },
      "hammer_none": { "name": "Cruzado" },
      "hammer_sword_one": { "name": "Belicista" },
      "hammer_sword_two": { "name": "Hoja de Guerra" },
      "hammer_great_sword": { "name": "Juggernaut" },
      "hammer_dagger": { "name": "Rompeespaldas" },
      "hammer_dagger_off": { "name": "Aplastador Veloz" },
      "hammer_bow_short": { "name": "Cazador de Truenos" },
      "hammer_bow_long": { "name": "Cazador Pesado" },
      "hammer_staff_one": { "name": "Mago de la Tierra" },
      "hammer_staff_two": { "name": "Aplastador Rúnico" },
      "hammer_orb": { "name": "Aplastador Astral" },
      "hammer_tome": { "name": "Guardián Rúnico" },
      "hammer_hammer": { "name": "Martillos Gemelos" },
      "hammer_spear": { "name": "Lancero de Guerra" },
      "hammer_shield": { "name": "Baluarte" },
      "spear_none": { "name": "Lancero" },
      "spear_sword_one": { "name": "Hoplita" },
      "spear_sword_two": { "name": "Lancero de Hojas" },
      "spear_great_sword": { "name": "Señor de la Guerra" },
      "spear_dagger": { "name": "Lancero Sombrío" },
      "spear_dagger_off": { "name": "Lancero Ligero" },
      "spear_bow_short": { "name": "Cazador de Lanza" },
      "spear_bow_long": { "name": "Alcance Largo" },
      "spear_staff_one": { "name": "Mago de las Tormentas" },
      "spear_staff_two": { "name": "Lancero de las Líneas" },
      "spear_orb": { "name": "Lancero Astral" },
      "spear_tome": { "name": "Lancero del Destino" },
      "spear_hammer": { "name": "Lancero de Guerra" },
      "spear_spear": { "name": "Lanzas Gemelas" },
      "spear_shield": { "name": "Falange" },
      "shield_none": { "name": "Centinela" },
      "shield_sword_one": { "name": "Paladín" },
      "shield_sword_two": { "name": "Sabio de la Espada" },
      "shield_great_sword": { "name": "Vanguardia de Hierro" },
      "shield_dagger": { "name": "Caballero del Terror" },
      "shield_dagger_off": { "name": "Centinela Veloz" },
      "shield_bow_short": { "name": "Guardián del Bosque" },
      "shield_bow_long": { "name": "Arquero Centinela" },
      "shield_staff_one": { "name": "Templario Arcano" },
      "shield_staff_two": { "name": "Guardián de Sigilos" },
      "shield_orb": { "name": "Guardián Astral" },
      "shield_tome": { "name": "Erudito de Égida" },
      "shield_hammer": { "name": "Baluarte" },
      "shield_spear": { "name": "Falange" },
      "shield_shield": { "name": "Baluarte de Hierro" }
    },    "login": {
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
      "registerTab": "CREAR CUENTA",
      "originTitle": "Origen",
      "originHint": "Tu origen es cosmético — no altera atributos. Tu personaje se moldea con las armas que empuñas.",
      "weaponTitle": "Arma inicial",
      "weaponHint": "Empiezas con competencia en esta arma — cambia de arma cuando quieras.",
      "originRequired": "Elige tu origen.",
      "weaponRequired": "Elige tu arma inicial.",
      "luckHint": "+0,1% de XP por punto de suerte",
      "proficiencyHint": "Súbela usando el arma — ataques, habilidades y derrotas dan competencia.",
      "nextSkill": "Siguiente habilidad",
    "proficiencies": {
      "sword_one": "Espada de una mano",
      "sword_two": "Espada larga",
      "great_sword": "Espadón",
      "dagger": "Daga",
      "dagger_off": "Daga de apoyo",
      "bow_short": "Arco corto",
      "bow_long": "Arco largo",
      "staff_one": "Bastón",
      "staff_two": "Bastón arcano",
      "orb": "Orbe",
      "tome": "Grimorio",
      "hammer": "Martillo",
      "spear": "Lanza",
      "shield": "Escudo"
    },
      "onlineLabel": "Aventureros en la frontera",
      "onlineJoin": "y"
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
    "partyCombat": {
      "started": "Cacería de grupo iniciada",
      "ended": "Cacería terminada — bono de equipo:",
      "aborted": "Cacería de grupo cancelada.",
      "failed": "No se pudo iniciar la cacería",
      "activeHunt": "Cacería de grupo",
      "round": "Ronda",
      "startHunt": "Cazar en grupo",
      "endHunt": "Terminar cacería",
      "waitLeader": "El líder inicia la cacería",
      "membersWord": "miembros",
      "sizeBonusHint": "Bono por miembro en la cacería: +10% XP · +5% oro · +3% botín",
      "startDungeon": "Mazmorra en grupo",
      "enterFloor": "Entrar al piso",
      "floor": "Piso",
      "regionMismatch": "lucha en la región de la cacería para recibir auras",
      "reason": { "not_leader": "solo el líder la inicia", "already": "ya hay una cacería activa" }
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
      "equipMain": "Equipar (mano principal)",
      "equipOff": "Equipar (mano secundaria)",
      "sameWeaponCategory": "Ya usas esta categoría de arma en la otra mano.",
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
      "itemLinkHint": "Consejo: pega [item:numId|efecto:valor|...] para enlazar un objeto — ej.: [item:1005|1:65|4:5|7:3]"
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
      "tabs": { "buy": "Comprar", "sell": "Vender", "mine": "Mis ofertas", "auctions": "Subastas" },
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
      "searchPlaceholder": "🔎 Buscar objeto por nombre...",
      "crystalsCurrency": "El mercado mundial usa 💎 Cristales (moneda de pago): el oro del juego queda protegido de la economía entre jugadores."
    },
    "auction": {
      "createTitle": "Crear subasta",
      "feeNote": "Tarifa de listado: 3 💎 (no reembolsable). Impuesto del 5% sobre el valor final.",
      "startPrice": "Precio inicial (💎)",
      "duration": "Duración:",
      "create": "Subastar",
      "created": "¡Subasta creada!",
      "activeTitle": "Subastas activas",
      "empty": "No hay subastas activas.",
      "seller": "Vendedor",
      "bidsWord": "pujas",
      "startAbbr": "inicio",
      "minBid": "Puja mínima",
      "bid": "Pujar",
      "bidPlaced": "¡Puja registrada!",
      "bidTooLow": "Puja por debajo del mínimo",
      "yours": "Tu subasta",
      "expired": "terminada",
      "error": "Error en la subasta","myBidsTitle": "Mis pujas","won": "¡GANASTE! 🎉","lost": "perdiste","winning": "ganando","outbidState": "superado"
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
      "empty": "Escribe un mensaje.",
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
      "badCommand": "Comando inválido",
      "whoOnline": "Jugadores en línea",
      "offlineWhispers": "susurros recibidos mientras estabas desconectado",
      "whisperQueued": "Susurro guardado para entregar cuando el jugador se conecte",
      "muted": " silenciado",
      "unmuted": " desbloqueado",
      "actionMute": "Silenciar"
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
        "name": "Tajo Giratorio",
        "desc": "Causa 150% de ATQ físico."
      },
      "slash": {
        "name": "Tajo Rápido",
        "desc": "Causa 130% de ATQ físico."
      },
      "dash_cut": {
        "name": "Corte Veloz",
        "desc": "Causa 200% de ATQ físico."
      },
      "parry_counter": {
        "name": "Contraparada",
        "desc": "Causa 120% de ATQ físico. Aturde al objetivo por 1 turno(s)."
      },
      "war_cry": {
        "name": "Grito de Guerra",
        "desc": "Aumenta la defensa un 25% por 3 turnos. e restaura 10% del hp máximo."
      },
      "blade_flurry": {
        "name": "Ráfaga de Hojas",
        "desc": "Causa 4 golpes de 45% de ATQ físico."
      },
      "thousand_cuts": {
        "name": "Mil Cortes",
        "desc": "Causa 5 golpes de 40% de ATQ físico."
      },
      "long_swipe": {
        "name": "Golpe Largo",
        "desc": "Causa 140% de ATQ físico."
      },
      "bleed": {
        "name": "Sangrado",
        "desc": "Causa 40 de daño por 3 turnos."
      },
      "iron_will": {
        "name": "Voluntad de Hierro",
        "desc": "Aumenta la defensa un 35% por 3 turnos."
      },
      "deep_wound": {
        "name": "Herida Profunda",
        "desc": "Causa 60 de daño por 3 turnos."
      },
      "counter_gambit": {
        "name": "Gambito Contra",
        "desc": "Causa 180% de ATQ físico. Esquiva el próximo golpe."
      },
      "cross_slash": {
        "name": "Tajo Cruzado",
        "desc": "Causa 180% de ATQ físico."
      },
      "crescent_slash": {
        "name": "Tajo Creciente",
        "desc": "Causa 3 golpes de 60% de ATQ físico."
      },
      "brutal_slam": {
        "name": "Golpe Brutal",
        "desc": "Causa 170% de ATQ físico. Aturde al objetivo por 1 turno(s)."
      },
      "cleave": {
        "name": "Tajo Amplio",
        "desc": "Causa 2 golpes de 110% de ATQ físico."
      },
      "battle_fury": {
        "name": "Furia de Batalla",
        "desc": "Aumenta la defensa un 25% por 3 turnos. e restaura 15% del hp máximo."
      },
      "execute": {
        "name": "Ejecutar",
        "desc": "Causa 400% de ATQ físico. Ejecuta objetivos con menos de 20% de HP."
      },
      "colossus_smash": {
        "name": "Golpe del Coloso",
        "desc": "Causa 300% de ATQ físico."
      },
      "blade_storm": {
        "name": "Tormenta de Hojas",
        "desc": "Causa 3 golpes de 90% de ATQ físico."
      },
      "onslaught": {
        "name": "Asalto",
        "desc": "Causa 5 golpes de 35% de ATQ físico."
      },
      "stab": {
        "name": "Estocada",
        "desc": "Causa 120% de ATQ físico. Causa 25 de daño por 2 turnos."
      },
      "smoke_bomb": {
        "name": "Bomba de Humo",
        "desc": "Aumenta la defensa un 20% por 2 turnos. Esquiva el próximo golpe."
      },
      "death_mark": {
        "name": "Marca de Muerte",
        "desc": "Marca al objetivo: +50% de daño recibido por 3 turnos."
      },
      "eviscerate": {
        "name": "Eviscerar",
        "desc": "Causa 200% de ATQ físico."
      },
      "shadow_step": {
        "name": "Paso Sombrío",
        "desc": "Causa 180% de ATQ físico. Esquiva el próximo golpe."
      },
      "fan_of_knives": {
        "name": "Abanico de Dagas",
        "desc": "Causa 3 golpes de 50% de ATQ físico."
      },
      "assassinate": {
        "name": "Asesinar",
        "desc": "Causa 320% de ATQ físico. Ejecuta objetivos con menos de 25% de HP."
      },
      "feint": {
        "name": "Finta",
        "desc": "Causa 100% de ATQ físico. Ralentiza al objetivo por 2 turno(s)."
      },
      "double_slash": {
        "name": "Tajo Doble",
        "desc": "Causa 2 golpes de 90% de ATQ físico."
      },
      "riposte": {
        "name": "Riposta",
        "desc": "Causa 140% de ATQ físico. Esquiva el próximo golpe."
      },
      "lacerate": {
        "name": "Lacerar",
        "desc": "Causa 100% de ATQ físico. Causa 50 de daño por 3 turnos."
      },
      "twin_fang": {
        "name": "Colmillos Gemelos",
        "desc": "Causa 2 golpes de 80% de ATQ físico."
      },
      "whirl_dagger": {
        "name": "Daga Giratoria",
        "desc": "Causa 4 golpes de 45% de ATQ físico."
      },
      "shadow_parry": {
        "name": "Parada Sombría",
        "desc": "Causa 160% de ATQ físico. Aturde al objetivo por 1 turno(s). Esquiva el próximo golpe."
      },
      "piercing_shot": {
        "name": "Disparo Perforante",
        "desc": "Causa 160% de ATQ físico. Ignora la defensa del enemigo."
      },
      "aimed_shot": {
        "name": "Disparo Apuntado",
        "desc": "Causa 170% de ATQ físico. Ignora la defensa del enemigo."
      },
      "quick_shot": {
        "name": "Disparo Rápido",
        "desc": "Causa 100% de ATQ físico. Ralentiza al objetivo por 1 turno(s)."
      },
      "hunters_mark": {
        "name": "Marca del Cazador",
        "desc": "Marca al objetivo: +40% de daño recibido por 3 turnos."
      },
      "scatter_shot": {
        "name": "Disparo Disperso",
        "desc": "Causa 3 golpes de 40% de ATQ físico."
      },
      "kiting_shot": {
        "name": "Disparo de Fuga",
        "desc": "Causa 110% de ATQ físico. Ralentiza al objetivo por 2 turno(s)."
      },
      "rapid_fire": {
        "name": "Fuego Rápido",
        "desc": "Causa 5 golpes de 35% de ATQ físico."
      },
      "precision_shot": {
        "name": "Tiro de Precisión",
        "desc": "Causa 180% de ATQ físico. Ignora la defensa del enemigo."
      },
      "rain_of_arrows": {
        "name": "Lluvia de Flechas",
        "desc": "Causa 4 golpes de 55% de ATQ físico."
      },
      "volley": {
        "name": "Ráfaga",
        "desc": "Causa 3 golpes de 55% de ATQ físico."
      },
      "eagle_eye": {
        "name": "Ojo de Águila",
        "desc": "Marca al objetivo: +45% de daño recibido por 3 turnos."
      },
      "sniper_shot": {
        "name": "Disparo de Francotirador",
        "desc": "Causa 220% de ATQ físico. Ignora la defensa del enemigo."
      },
      "wind_arrow": {
        "name": "Flecha de Viento",
        "desc": "Causa 140% de ATQ físico. Ralentiza al objetivo por 1 turno(s)."
      },
      "dead_eye": {
        "name": "Ojo Muerto",
        "desc": "Causa 260% de ATQ físico. Ejecuta objetivos con menos de 30% de HP."
      },
      "arcane_burst": {
        "name": "Ráfaga Arcana",
        "desc": "Causa 150% de ATQ mágico."
      },
      "arcane_missile": {
        "name": "Misil Arcano",
        "desc": "Causa 130% de ATQ mágico."
      },
      "heal_pulse": {
        "name": "Pulso de Cura",
        "desc": "Restaura 45% del HP máximo."
      },
      "arcane_bind": {
        "name": "Vínculo Arcano",
        "desc": "Causa 80% de ATQ mágico. Aturde al objetivo por 1 turno(s)."
      },
      "mana_shield": {
        "name": "Escudo de Maná",
        "desc": "Aumenta la defensa un 30% por 3 turnos. e restaura 15% del hp máximo."
      },
      "greater_heal": {
        "name": "Cura Mayor",
        "desc": "Restaura 70% del HP máximo."
      },
      "arcane_blast": {
        "name": "Explosión Arcana",
        "desc": "Causa 3 golpes de 60% de ATQ mágico."
      },
      "frost_bolt": {
        "name": "Proyectil de Hielo",
        "desc": "Causa 140% de ATQ mágico. Ralentiza al objetivo por 1 turno(s)."
      },
      "ice_nova": {
        "name": "Nova de Hielo",
        "desc": "Causa 130% de ATQ mágico. Ralentiza al objetivo por 2 turno(s)."
      },
      "blizzard": {
        "name": "Ventisca",
        "desc": "Causa 4 golpes de 40% de ATQ mágico. Ralentiza al objetivo por 1 turno(s)."
      },
      "arcane_armor": {
        "name": "Armadura Arcana",
        "desc": "Aumenta la defensa un 40% por 3 turnos."
      },
      "chain_lightning": {
        "name": "Cadena de Rayos",
        "desc": "Causa 170% de ATQ mágico."
      },
      "elemental_chaos": {
        "name": "Caos Elemental",
        "desc": "Causa 240% de ATQ mágico."
      },
      "time_warp": {
        "name": "Distorsión Temporal",
        "desc": "Marca al objetivo: +50% de daño recibido por 3 turnos."
      },
      "void_bolt": {
        "name": "Proyectil del Vacío",
        "desc": "Causa 150% de ATQ del vacío."
      },
      "void_rupture": {
        "name": "Ruptura del Vacío",
        "desc": "Causa 120% de ATQ del vacío. Causa 45 de daño por 3 turnos."
      },
      "astral_barrier": {
        "name": "Barrera Astral",
        "desc": "Aumenta la defensa un 35% por 3 turnos."
      },
      "gravity_well": {
        "name": "Pozo Gravitatorio",
        "desc": "Causa 100% de ATQ del vacío. Aturde al objetivo por 1 turno(s)."
      },
      "void_armor": {
        "name": "Armadura del Vacío",
        "desc": "Aumenta la defensa un 35% por 3 turnos. e restaura 10% del hp máximo."
      },
      "void_gate": {
        "name": "Portal del Vacío",
        "desc": "Causa 300% de ATQ del vacío."
      },
      "cosmic_burst": {
        "name": "Explosión Cósmica",
        "desc": "Causa 5 golpes de 40% de ATQ del vacío."
      },
      "arcane_mark": {
        "name": "Marca Arcana",
        "desc": "Marca al objetivo: +40% de daño recibido por 3 turnos."
      },
      "root": {
        "name": "Raíces",
        "desc": "Causa 60% de ATQ mágico. Aturde al objetivo por 1 turno(s)."
      },
      "petrify": {
        "name": "Petrificar",
        "desc": "Causa 90% de ATQ mágico. Aturde al objetivo por 1 turno(s)."
      },
      "arcane_ward": {
        "name": "Guardia Arcana",
        "desc": "Aumenta la defensa un 30% por 3 turnos. e restaura 25% del hp máximo."
      },
      "rune_shield": {
        "name": "Escudo Rúnico",
        "desc": "Aumenta la defensa un 45% por 2 turnos."
      },
      "draining_tome": {
        "name": "Grimorio Drenante",
        "desc": "Causa 100% de ATQ mágico. Restaura 30% del HP máximo."
      },
      "forbidden_knowledge": {
        "name": "Conocimiento Prohibido",
        "desc": "Causa 300% de ATQ mágico."
      },
      "crushing_blow": {
        "name": "Golpe Aplastante",
        "desc": "Causa 160% de ATQ físico."
      },
      "fortress": {
        "name": "Fortaleza",
        "desc": "Aumenta la defensa un 40% por 3 turnos."
      },
      "earth_shake": {
        "name": "Sacudida de Tierra",
        "desc": "Causa 3 golpes de 50% de ATQ físico. Ralentiza al objetivo por 1 turno(s)."
      },
      "unbreakable": {
        "name": "Inquebrantable",
        "desc": "Aumenta la defensa un 50% por 2 turnos."
      },
      "war_stomp": {
        "name": "Pisotón de Guerra",
        "desc": "Causa 90% de ATQ físico. Aturde al objetivo por 1 turno(s)."
      },
      "seismic_slam": {
        "name": "Impacto Sísmico",
        "desc": "Causa 250% de ATQ físico. Aturde al objetivo por 1 turno(s)."
      },
      "titan_fall": {
        "name": "Caída del Titán",
        "desc": "Causa 280% de ATQ físico."
      },
      "precise_thrust": {
        "name": "Estocada Precisa",
        "desc": "Causa 150% de ATQ físico. Ignora la defensa del enemigo."
      },
      "thorns": {
        "name": "Espinas",
        "desc": "Refleja 35% del daño recibido por 3 turnos."
      },
      "sweeping_strike": {
        "name": "Golpe Barrido",
        "desc": "Causa 2 golpes de 85% de ATQ físico."
      },
      "serpent_spike": {
        "name": "Espina de Serpiente",
        "desc": "Causa 100% de ATQ físico. Causa 40 de daño por 3 turnos."
      },
      "nature_burst": {
        "name": "Explosión Natural",
        "desc": "Causa 200% de ATQ mágico."
      },
      "phalanx_ward": {
        "name": "Guardia Falange",
        "desc": "Aumenta la defensa un 35% por 3 turnos."
      },
      "dragon_lance": {
        "name": "Lanza del Dragón",
        "desc": "Causa 260% de ATQ físico. Ralentiza al objetivo por 1 turno(s)."
      },
      "shield_bash": {
        "name": "Embestida de Escudo",
        "desc": "Causa 120% de ATQ físico. Aturde al objetivo por 1 turno(s)."
      },
      "shield_slam": {
        "name": "Golpe de Escudo",
        "desc": "Causa 130% de ATQ físico. Ralentiza al objetivo por 1 turno(s)."
      },
      "provoke": {
        "name": "Provocar",
        "desc": "Marca al objetivo: +30% de daño recibido por 3 turnos."
      },
      "bastion": {
        "name": "Bastión",
        "desc": "Aumenta la defensa un 60% por 2 turnos."
      },
      "aegis_guard": {
        "name": "Guardia de Égida",
        "desc": "Aumenta la defensa un 50% por 2 turnos. e restaura 15% del hp máximo."
      },
      "shield_charge": {
        "name": "Carga de Escudo",
        "desc": "Causa 180% de ATQ físico. Aturde al objetivo por 1 turno(s)."
      },
      "holy_aegis": {
        "name": "Égida Sagrada",
        "desc": "Aumenta la defensa un 20% por 2 turnos. e restaura 50% del hp máximo."
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
    "combos": {
      "sword_one_none": { "name": "ブレード" },
      "sword_one_sword_one": { "name": "ツインブレード" },
      "sword_one_sword_two": { "name": "ソードダンサー" },
      "sword_one_great_sword": { "name": "ヴァンガード" },
      "sword_one_dagger": { "name": "デュエリスト" },
      "sword_one_dagger_off": { "name": "フェンサー" },
      "sword_one_bow_short": { "name": "スカーミッシャー" },
      "sword_one_bow_long": { "name": "パスファインダー" },
      "sword_one_staff_one": { "name": "スペルブレード" },
      "sword_one_staff_two": { "name": "アーケインナイト" },
      "sword_one_orb": { "name": "ルーンナイト" },
      "sword_one_tome": { "name": "バトルメイジ" },
      "sword_one_hammer": { "name": "ウォーモンガー" },
      "sword_one_spear": { "name": "ホプリテス" },
      "sword_one_shield": { "name": "パラディン" },
      "sword_two_none": { "name": "ロングブレード" },
      "sword_two_sword_one": { "name": "ソードダンサー" },
      "sword_two_sword_two": { "name": "ツインロングブレード" },
      "sword_two_great_sword": { "name": "ブレードマスター" },
      "sword_two_dagger": { "name": "ブレードダンサー" },
      "sword_two_dagger_off": { "name": "パリーマスター" },
      "sword_two_bow_short": { "name": "レンジャーナイト" },
      "sword_two_bow_long": { "name": "ホークアイ" },
      "sword_two_staff_one": { "name": "ルーンブレイダー" },
      "sword_two_staff_two": { "name": "アーケインブレードマスター" },
      "sword_two_orb": { "name": "エルドリッチナイト" },
      "sword_two_tome": { "name": "ヘックスブレード" },
      "sword_two_hammer": { "name": "ウォーブレード" },
      "sword_two_spear": { "name": "ブレードランサー" },
      "sword_two_shield": { "name": "ソードセージ" },
      "great_sword_none": { "name": "バーサーカー" },
      "great_sword_sword_one": { "name": "リーバー" },
      "great_sword_sword_two": { "name": "ウォーマスター" },
      "great_sword_great_sword": { "name": "コロッサス" },
      "great_sword_dagger": { "name": "ブラッドリーバー" },
      "great_sword_dagger_off": { "name": "フレンジー" },
      "great_sword_bow_short": { "name": "ストームレイダー" },
      "great_sword_bow_long": { "name": "ハントマスター" },
      "great_sword_staff_one": { "name": "カオスウォリアー" },
      "great_sword_staff_two": { "name": "リフトバーサーカー" },
      "great_sword_orb": { "name": "ヴォイドバーサーカー" },
      "great_sword_tome": { "name": "ルインナイト" },
      "great_sword_hammer": { "name": "ジャガーノート" },
      "great_sword_spear": { "name": "ウォーロード" },
      "great_sword_shield": { "name": "アイアンヴァンガード" },
      "dagger_none": { "name": "アサシン" },
      "dagger_sword_one": { "name": "ローグ" },
      "dagger_sword_two": { "name": "シャドウデュエリスト" },
      "dagger_great_sword": { "name": "ナイトリーバー" },
      "dagger_dagger": { "name": "ツインシャドウ" },
      "dagger_dagger_off": { "name": "ファントム" },
      "dagger_bow_short": { "name": "ストーカー" },
      "dagger_bow_long": { "name": "ナイトハンター" },
      "dagger_staff_one": { "name": "ヘックスアサシン" },
      "dagger_staff_two": { "name": "シャドウアーカニスト" },
      "dagger_orb": { "name": "ソウルイーター" },
      "dagger_tome": { "name": "ダークセージ" },
      "dagger_hammer": { "name": "バックブレイカー" },
      "dagger_spear": { "name": "シャドウランサー" },
      "dagger_shield": { "name": "ドレッドナイト" },
      "dagger_off_none": { "name": "サイドブレード" },
      "dagger_off_sword_one": { "name": "フェンサー" },
      "dagger_off_sword_two": { "name": "パリーマスター" },
      "dagger_off_great_sword": { "name": "スウィフトリーバー" },
      "dagger_off_dagger": { "name": "ツインシャドウ" },
      "dagger_off_dagger_off": { "name": "ツインサイドブレード" },
      "dagger_off_bow_short": { "name": "クイックストーカー" },
      "dagger_off_bow_long": { "name": "ゴーストアーチャー" },
      "dagger_off_staff_one": { "name": "アーケインフェンサー" },
      "dagger_off_staff_two": { "name": "ヴェイルメイジ" },
      "dagger_off_orb": { "name": "ソウルフェンサー" },
      "dagger_off_tome": { "name": "カースドフェンサー" },
      "dagger_off_hammer": { "name": "スウィフトクラッシャー" },
      "dagger_off_spear": { "name": "ライトランサー" },
      "dagger_off_shield": { "name": "スウィフトセンチネル" },
      "bow_short_none": { "name": "レンジャー" },
      "bow_short_sword_one": { "name": "スカーミッシャー" },
      "bow_short_sword_two": { "name": "レンジャーナイト" },
      "bow_short_great_sword": { "name": "ストームレイダー" },
      "bow_short_dagger": { "name": "ストーカー" },
      "bow_short_dagger_off": { "name": "クイックストーカー" },
      "bow_short_bow_short": { "name": "ツインボウ" },
      "bow_short_bow_long": { "name": "ウィンドアーチャー" },
      "bow_short_staff_one": { "name": "ネイチャーメイジ" },
      "bow_short_staff_two": { "name": "ストームコーラー" },
      "bow_short_orb": { "name": "スターゲイザー" },
      "bow_short_tome": { "name": "ビーストマスター" },
      "bow_short_hammer": { "name": "サンダーハンター" },
      "bow_short_spear": { "name": "スピアハンター" },
      "bow_short_shield": { "name": "フォレストガーディアン" },
      "bow_long_none": { "name": "ハンター" },
      "bow_long_sword_one": { "name": "パスファインダー" },
      "bow_long_sword_two": { "name": "ホークアイ" },
      "bow_long_great_sword": { "name": "ハントマスター" },
      "bow_long_dagger": { "name": "ナイトハンター" },
      "bow_long_dagger_off": { "name": "ゴーストアーチャー" },
      "bow_long_bow_short": { "name": "ウィンドアーチャー" },
      "bow_long_bow_long": { "name": "ツインロングボウ" },
      "bow_long_staff_one": { "name": "ファーサイトメイジ" },
      "bow_long_staff_two": { "name": "エクリプスアーチャー" },
      "bow_long_orb": { "name": "ヴォイドシーア" },
      "bow_long_tome": { "name": "オラクルハンター" },
      "bow_long_hammer": { "name": "ヘビーハンター" },
      "bow_long_spear": { "name": "ロングリーチ" },
      "bow_long_shield": { "name": "センチネルアーチャー" },
      "staff_one_none": { "name": "メイジ" },
      "staff_one_sword_one": { "name": "スペルブレード" },
      "staff_one_sword_two": { "name": "ルーンブレイダー" },
      "staff_one_great_sword": { "name": "カオスウォリアー" },
      "staff_one_dagger": { "name": "ヘックスアサシン" },
      "staff_one_dagger_off": { "name": "アーケインフェンサー" },
      "staff_one_bow_short": { "name": "ネイチャーメイジ" },
      "staff_one_bow_long": { "name": "ファーサイトメイジ" },
      "staff_one_staff_one": { "name": "ツインスタッフ" },
      "staff_one_staff_two": { "name": "アークメイジ" },
      "staff_one_orb": { "name": "スターメイジ" },
      "staff_one_tome": { "name": "スカラー" },
      "staff_one_hammer": { "name": "アースメイジ" },
      "staff_one_spear": { "name": "ストームメイジ" },
      "staff_one_shield": { "name": "アーケインテンプラー" },
      "staff_two_none": { "name": "アーカニスト" },
      "staff_two_sword_one": { "name": "アーケインナイト" },
      "staff_two_sword_two": { "name": "アーケインブレードマスター" },
      "staff_two_great_sword": { "name": "リフトバーサーカー" },
      "staff_two_dagger": { "name": "シャドウアーカニスト" },
      "staff_two_dagger_off": { "name": "ヴェイルメイジ" },
      "staff_two_bow_short": { "name": "ストームコーラー" },
      "staff_two_bow_long": { "name": "エクリプスアーチャー" },
      "staff_two_staff_one": { "name": "アークメイジ" },
      "staff_two_staff_two": { "name": "ツインアーケインスタッフ" },
      "staff_two_orb": { "name": "ヴォイドアーカニスト" },
      "staff_two_tome": { "name": "ヴォイドスカラー" },
      "staff_two_hammer": { "name": "ルーンクラッシャー" },
      "staff_two_spear": { "name": "レイランサー" },
      "staff_two_shield": { "name": "シジルガーディアン" },
      "orb_none": { "name": "ソーサラー" },
      "orb_sword_one": { "name": "ルーンナイト" },
      "orb_sword_two": { "name": "エルドリッチナイト" },
      "orb_great_sword": { "name": "ヴォイドバーサーカー" },
      "orb_dagger": { "name": "ソウルイーター" },
      "orb_dagger_off": { "name": "ソウルフェンサー" },
      "orb_bow_short": { "name": "スターゲイザー" },
      "orb_bow_long": { "name": "ヴォイドシーア" },
      "orb_staff_one": { "name": "スターメイジ" },
      "orb_staff_two": { "name": "ヴォイドアーカニスト" },
      "orb_orb": { "name": "ツインオーブ" },
      "orb_tome": { "name": "ルーンスカラー" },
      "orb_hammer": { "name": "アストラルクラッシャー" },
      "orb_spear": { "name": "アストラルランサー" },
      "orb_shield": { "name": "アストラルガーディアン" },
      "tome_none": { "name": "スカラー" },
      "tome_sword_one": { "name": "バトルメイジ" },
      "tome_sword_two": { "name": "ヘックスブレード" },
      "tome_great_sword": { "name": "ルインナイト" },
      "tome_dagger": { "name": "ダークセージ" },
      "tome_dagger_off": { "name": "カースドフェンサー" },
      "tome_bow_short": { "name": "ビーストマスター" },
      "tome_bow_long": { "name": "オラクルハンター" },
      "tome_staff_one": { "name": "スカラー" },
      "tome_staff_two": { "name": "ヴォイドスカラー" },
      "tome_orb": { "name": "ルーンスカラー" },
      "tome_tome": { "name": "ツイントーム" },
      "tome_hammer": { "name": "ルーンウォーデン" },
      "tome_spear": { "name": "フェイトランサー" },
      "tome_shield": { "name": "イージススカラー" },
      "hammer_none": { "name": "クルセイダー" },
      "hammer_sword_one": { "name": "ウォーモンガー" },
      "hammer_sword_two": { "name": "ウォーブレード" },
      "hammer_great_sword": { "name": "ジャガーノート" },
      "hammer_dagger": { "name": "バックブレイカー" },
      "hammer_dagger_off": { "name": "スウィフトクラッシャー" },
      "hammer_bow_short": { "name": "サンダーハンター" },
      "hammer_bow_long": { "name": "ヘビーハンター" },
      "hammer_staff_one": { "name": "アースメイジ" },
      "hammer_staff_two": { "name": "ルーンクラッシャー" },
      "hammer_orb": { "name": "アストラルクラッシャー" },
      "hammer_tome": { "name": "ルーンウォーデン" },
      "hammer_hammer": { "name": "ツインハンマー" },
      "hammer_spear": { "name": "ウォーランサー" },
      "hammer_shield": { "name": "バルワーク" },
      "spear_none": { "name": "ランサー" },
      "spear_sword_one": { "name": "ホプリテス" },
      "spear_sword_two": { "name": "ブレードランサー" },
      "spear_great_sword": { "name": "ウォーロード" },
      "spear_dagger": { "name": "シャドウランサー" },
      "spear_dagger_off": { "name": "ライトランサー" },
      "spear_bow_short": { "name": "スピアハンター" },
      "spear_bow_long": { "name": "ロングリーチ" },
      "spear_staff_one": { "name": "ストームメイジ" },
      "spear_staff_two": { "name": "レイランサー" },
      "spear_orb": { "name": "アストラルランサー" },
      "spear_tome": { "name": "フェイトランサー" },
      "spear_hammer": { "name": "ウォーランサー" },
      "spear_spear": { "name": "ツインスピア" },
      "spear_shield": { "name": "ファランクス" },
      "shield_none": { "name": "センチネル" },
      "shield_sword_one": { "name": "パラディン" },
      "shield_sword_two": { "name": "ソードセージ" },
      "shield_great_sword": { "name": "アイアンヴァンガード" },
      "shield_dagger": { "name": "ドレッドナイト" },
      "shield_dagger_off": { "name": "スウィフトセンチネル" },
      "shield_bow_short": { "name": "フォレストガーディアン" },
      "shield_bow_long": { "name": "センチネルアーチャー" },
      "shield_staff_one": { "name": "アーケインテンプラー" },
      "shield_staff_two": { "name": "シジルガーディアン" },
      "shield_orb": { "name": "アストラルガーディアン" },
      "shield_tome": { "name": "イージススカラー" },
      "shield_hammer": { "name": "バルワーク" },
      "shield_spear": { "name": "ファランクス" },
      "shield_shield": { "name": "アイアンバルワーク" }
    },    "login": {
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
      "registerTab": "アカウント作成",
      "originTitle": "出自",
      "originHint": "出自は見た目のみで、ステータスには影響しません。キャラクターは装備する武器によって成長します。",
      "weaponTitle": "初期武器",
      "weaponHint": "この武器の熟練度から始まります。武器はいつでも変更可能です。",
      "originRequired": "出自を選択してください。",
      "weaponRequired": "初期武器を選択してください。",
      "luckHint": "幸運1ごとにXP+0.1%",
      "proficiencyHint": "武器を使うと熟練度が上がります（攻撃・スキル・撃破）。",
      "nextSkill": "次のスキル",
    "proficiencies": {
      "sword_one": "片手剣",
      "sword_two": "長剣",
      "great_sword": "大剣",
      "dagger": "短剣",
      "dagger_off": "サブ短剣",
      "bow_short": "短弓",
      "bow_long": "長弓",
      "staff_one": "杖",
      "staff_two": "秘術の杖",
      "orb": "オーブ",
      "tome": "魔導書",
      "hammer": "ハンマー",
      "spear": "槍",
      "shield": "盾"
    },
      "onlineLabel": "辺境の冒険者",
      "onlineJoin": "と"
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
    "partyCombat": {
      "started": "パーティハント開始",
      "ended": "ハント終了 — チームボーナス：",
      "aborted": "パーティハントは中止されました。",
      "failed": "ハントを開始できませんでした",
      "activeHunt": "パーティハント",
      "round": "ラウンド",
      "startHunt": "パーティで狩る",
      "endHunt": "ハント終了",
      "waitLeader": "リーダーがハントを開始します",
      "membersWord": "メンバー",
      "sizeBonusHint": "ハントのメンバー1人ごと：XP+10%・ゴールド+5%・ルート+3%",
      "startDungeon": "パーティダンジョン",
      "enterFloor": "階に入る",
      "floor": "階",
      "regionMismatch": "オーラを得るにはハント地域で戦って下さい",
      "reason": { "not_leader": "リーダーのみ開始可能", "already": "既にハントが進行中" }
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
      "equipMain": "装備（主手）",
      "equipOff": "装備（副手）",
      "sameWeaponCategory": "もう片方の手で同じ武器カテゴリを使用しています。",
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
      "itemLinkHint": "ヒント：[item:numId|効果:値|...] を貼り付けるとアイテムをリンクできます — 例: [item:1005|1:65|4:5|7:3]"
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
      "tabs": { "buy": "購入", "sell": "売却", "mine": "出品一覧", "auctions": "オークション" },
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
      "searchPlaceholder": "🔎 アイテムを名前で検索...",
      "crystalsCurrency": "世界市場は💎クリスタル（有料通貨）を使用 — ゲーム内ゴールドはプレイヤー間経済から守られます。"
    },
    "auction": {
      "createTitle": "オークションを作成",
      "feeNote": "出品料：3💎（返金不可）。落札額に5%の税金。",
      "startPrice": "開始価格（💎）",
      "duration": "期間：",
      "create": "出品する",
      "created": "オークションを作成しました！",
      "activeTitle": "開催中のオークション",
      "empty": "開催中のオークションはありません。",
      "seller": "出品者",
      "bidsWord": "件の入札",
      "startAbbr": "開始",
      "minBid": "最低入札額",
      "bid": "入札する",
      "bidPlaced": "入札しました！",
      "bidTooLow": "最低入札額未満です",
      "yours": "あなたのオークション",
      "expired": "終了",
      "error": "オークションエラー","myBidsTitle": "私の入札","won": "落札！🎉","lost": "負け","winning": "現在最高額","outbidState": "上書き済み"
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
      "empty": "メッセージを入力してください。",
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
      "badCommand": "無効なコマンド",
      "whoOnline": "オンラインのプレイヤー",
      "offlineWhispers": "件のオフライン中に受けたささやき",
      "whisperQueued": "相手が接続した時に届くようささやきを保存しました",
      "muted": " をミュートしました",
      "unmuted": " のミュートを解除しました",
      "actionMute": "ミュート"
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
        "name": "スピンスラッシュ",
        "desc": "物理ATKの150%のダメージ。"
      },
      "slash": {
        "name": "クイックスラッシュ",
        "desc": "物理ATKの130%のダメージ。"
      },
      "dash_cut": {
        "name": "ダッシュカット",
        "desc": "物理ATKの200%のダメージ。"
      },
      "parry_counter": {
        "name": "パリーカウンター",
        "desc": "物理ATKの120%のダメージ。 1ターン気絶させる。"
      },
      "war_cry": {
        "name": "ウォークライ",
        "desc": "3ターンの間、防御力+25%。 e 最大hpの10%を回復。"
      },
      "blade_flurry": {
        "name": "ブレイドフラリー",
        "desc": "物理ATKの45%で4回攻撃。"
      },
      "thousand_cuts": {
        "name": "サウザンドカッツ",
        "desc": "物理ATKの40%で5回攻撃。"
      },
      "long_swipe": {
        "name": "ロングスワイプ",
        "desc": "物理ATKの140%のダメージ。"
      },
      "bleed": {
        "name": "ブリード",
        "desc": "3ターンの間、毎ターン40のダメージ。"
      },
      "iron_will": {
        "name": "アイアンウィル",
        "desc": "3ターンの間、防御力+35%。"
      },
      "deep_wound": {
        "name": "ディープワウンド",
        "desc": "3ターンの間、毎ターン60のダメージ。"
      },
      "counter_gambit": {
        "name": "カウンターギャンビット",
        "desc": "物理ATKの180%のダメージ。 次の攻撃を回避する。"
      },
      "cross_slash": {
        "name": "クロススラッシュ",
        "desc": "物理ATKの180%のダメージ。"
      },
      "crescent_slash": {
        "name": "クレセントスラッシュ",
        "desc": "物理ATKの60%で3回攻撃。"
      },
      "brutal_slam": {
        "name": "ブルータルスラム",
        "desc": "物理ATKの170%のダメージ。 1ターン気絶させる。"
      },
      "cleave": {
        "name": "クリーブ",
        "desc": "物理ATKの110%で2回攻撃。"
      },
      "battle_fury": {
        "name": "バトルフューリー",
        "desc": "3ターンの間、防御力+25%。 e 最大hpの15%を回復。"
      },
      "execute": {
        "name": "エグゼキュート",
        "desc": "物理ATKの400%のダメージ。 HPが20%以下の敵を即死させる。"
      },
      "colossus_smash": {
        "name": "コロッサススマッシュ",
        "desc": "物理ATKの300%のダメージ。"
      },
      "blade_storm": {
        "name": "ブレイドストーム",
        "desc": "物理ATKの90%で3回攻撃。"
      },
      "onslaught": {
        "name": "オンズロート",
        "desc": "物理ATKの35%で5回攻撃。"
      },
      "stab": {
        "name": "スタブ",
        "desc": "物理ATKの120%のダメージ。 2ターンの間、毎ターン25のダメージ。"
      },
      "smoke_bomb": {
        "name": "スモークボム",
        "desc": "2ターンの間、防御力+20%。 次の攻撃を回避する。"
      },
      "death_mark": {
        "name": "デスマーク",
        "desc": "目標をマーク：3ターンの間、受けるダメージ+50%。"
      },
      "eviscerate": {
        "name": "エビセレイト",
        "desc": "物理ATKの200%のダメージ。"
      },
      "shadow_step": {
        "name": "シャドウステップ",
        "desc": "物理ATKの180%のダメージ。 次の攻撃を回避する。"
      },
      "fan_of_knives": {
        "name": "ファンオブナイフ",
        "desc": "物理ATKの50%で3回攻撃。"
      },
      "assassinate": {
        "name": "アサシネイト",
        "desc": "物理ATKの320%のダメージ。 HPが25%以下の敵を即死させる。"
      },
      "feint": {
        "name": "フェイント",
        "desc": "物理ATKの100%のダメージ。 2ターン鈍足にする。"
      },
      "double_slash": {
        "name": "ダブルスラッシュ",
        "desc": "物理ATKの90%で2回攻撃。"
      },
      "riposte": {
        "name": "リポスト",
        "desc": "物理ATKの140%のダメージ。 次の攻撃を回避する。"
      },
      "lacerate": {
        "name": "ラセレイト",
        "desc": "物理ATKの100%のダメージ。 3ターンの間、毎ターン50のダメージ。"
      },
      "twin_fang": {
        "name": "ツインファング",
        "desc": "物理ATKの80%で2回攻撃。"
      },
      "whirl_dagger": {
        "name": "ワールダガー",
        "desc": "物理ATKの45%で4回攻撃。"
      },
      "shadow_parry": {
        "name": "シャドウパリー",
        "desc": "物理ATKの160%のダメージ。 1ターン気絶させる。 次の攻撃を回避する。"
      },
      "piercing_shot": {
        "name": "ピアシングショット",
        "desc": "物理ATKの160%のダメージ。 敵の防御を無視する。"
      },
      "aimed_shot": {
        "name": "エイムドショット",
        "desc": "物理ATKの170%のダメージ。 敵の防御を無視する。"
      },
      "quick_shot": {
        "name": "クイックショット",
        "desc": "物理ATKの100%のダメージ。 1ターン鈍足にする。"
      },
      "hunters_mark": {
        "name": "ハンターズマーク",
        "desc": "目標をマーク：3ターンの間、受けるダメージ+40%。"
      },
      "scatter_shot": {
        "name": "スキャッターショット",
        "desc": "物理ATKの40%で3回攻撃。"
      },
      "kiting_shot": {
        "name": "キティングショット",
        "desc": "物理ATKの110%のダメージ。 2ターン鈍足にする。"
      },
      "rapid_fire": {
        "name": "ラピッドファイア",
        "desc": "物理ATKの35%で5回攻撃。"
      },
      "precision_shot": {
        "name": "プレシジョンショット",
        "desc": "物理ATKの180%のダメージ。 敵の防御を無視する。"
      },
      "rain_of_arrows": {
        "name": "レインオブアローズ",
        "desc": "物理ATKの55%で4回攻撃。"
      },
      "volley": {
        "name": "ボレー",
        "desc": "物理ATKの55%で3回攻撃。"
      },
      "eagle_eye": {
        "name": "イーグルアイ",
        "desc": "目標をマーク：3ターンの間、受けるダメージ+45%。"
      },
      "sniper_shot": {
        "name": "スナイプショット",
        "desc": "物理ATKの220%のダメージ。 敵の防御を無視する。"
      },
      "wind_arrow": {
        "name": "ウィンドアロー",
        "desc": "物理ATKの140%のダメージ。 1ターン鈍足にする。"
      },
      "dead_eye": {
        "name": "デッドアイ",
        "desc": "物理ATKの260%のダメージ。 HPが30%以下の敵を即死させる。"
      },
      "arcane_burst": {
        "name": "アーケインバースト",
        "desc": "魔法ATKの150%のダメージ。"
      },
      "arcane_missile": {
        "name": "アーケインミサイル",
        "desc": "魔法ATKの130%のダメージ。"
      },
      "heal_pulse": {
        "name": "ヒールパルス",
        "desc": "最大HPの45%を回復。"
      },
      "arcane_bind": {
        "name": "アーケインバインド",
        "desc": "魔法ATKの80%のダメージ。 1ターン気絶させる。"
      },
      "mana_shield": {
        "name": "マナシールド",
        "desc": "3ターンの間、防御力+30%。 e 最大hpの15%を回復。"
      },
      "greater_heal": {
        "name": "グレーターヒール",
        "desc": "最大HPの70%を回復。"
      },
      "arcane_blast": {
        "name": "アーケインブラスト",
        "desc": "魔法ATKの60%で3回攻撃。"
      },
      "frost_bolt": {
        "name": "フロストボルト",
        "desc": "魔法ATKの140%のダメージ。 1ターン鈍足にする。"
      },
      "ice_nova": {
        "name": "アイスノヴァ",
        "desc": "魔法ATKの130%のダメージ。 2ターン鈍足にする。"
      },
      "blizzard": {
        "name": "ブリザード",
        "desc": "魔法ATKの40%で4回攻撃。 1ターン鈍足にする。"
      },
      "arcane_armor": {
        "name": "アーケインアーマー",
        "desc": "3ターンの間、防御力+40%。"
      },
      "chain_lightning": {
        "name": "チェーンライトニング",
        "desc": "魔法ATKの170%のダメージ。"
      },
      "elemental_chaos": {
        "name": "エレメンタルカオス",
        "desc": "魔法ATKの240%のダメージ。"
      },
      "time_warp": {
        "name": "タイムワープ",
        "desc": "目標をマーク：3ターンの間、受けるダメージ+50%。"
      },
      "void_bolt": {
        "name": "ヴォイドボルト",
        "desc": "虚無ATKの150%のダメージ。"
      },
      "void_rupture": {
        "name": "ヴォイドラプチャー",
        "desc": "虚無ATKの120%のダメージ。 3ターンの間、毎ターン45のダメージ。"
      },
      "astral_barrier": {
        "name": "アストラルバリア",
        "desc": "3ターンの間、防御力+35%。"
      },
      "gravity_well": {
        "name": "グラビティウェル",
        "desc": "虚無ATKの100%のダメージ。 1ターン気絶させる。"
      },
      "void_armor": {
        "name": "ヴォイドアーマー",
        "desc": "3ターンの間、防御力+35%。 e 最大hpの10%を回復。"
      },
      "void_gate": {
        "name": "ヴォイドゲート",
        "desc": "虚無ATKの300%のダメージ。"
      },
      "cosmic_burst": {
        "name": "コズミックバースト",
        "desc": "虚無ATKの40%で5回攻撃。"
      },
      "arcane_mark": {
        "name": "アーケインマーク",
        "desc": "目標をマーク：3ターンの間、受けるダメージ+40%。"
      },
      "root": {
        "name": "ルート",
        "desc": "魔法ATKの60%のダメージ。 1ターン気絶させる。"
      },
      "petrify": {
        "name": "ペトリファイ",
        "desc": "魔法ATKの90%のダメージ。 1ターン気絶させる。"
      },
      "arcane_ward": {
        "name": "アーケインウォード",
        "desc": "3ターンの間、防御力+30%。 e 最大hpの25%を回復。"
      },
      "rune_shield": {
        "name": "ルーンシールド",
        "desc": "2ターンの間、防御力+45%。"
      },
      "draining_tome": {
        "name": "ドレイニングトーム",
        "desc": "魔法ATKの100%のダメージ。 最大HPの30%を回復。"
      },
      "forbidden_knowledge": {
        "name": "フォービドゥンナレッジ",
        "desc": "魔法ATKの300%のダメージ。"
      },
      "crushing_blow": {
        "name": "クラッシングブロウ",
        "desc": "物理ATKの160%のダメージ。"
      },
      "fortress": {
        "name": "フォートレス",
        "desc": "3ターンの間、防御力+40%。"
      },
      "earth_shake": {
        "name": "アースシェイク",
        "desc": "物理ATKの50%で3回攻撃。 1ターン鈍足にする。"
      },
      "unbreakable": {
        "name": "アンブレイカブル",
        "desc": "2ターンの間、防御力+50%。"
      },
      "war_stomp": {
        "name": "ウォースタンプ",
        "desc": "物理ATKの90%のダメージ。 1ターン気絶させる。"
      },
      "seismic_slam": {
        "name": "サイズミックスラム",
        "desc": "物理ATKの250%のダメージ。 1ターン気絶させる。"
      },
      "titan_fall": {
        "name": "タイタンフォール",
        "desc": "物理ATKの280%のダメージ。"
      },
      "precise_thrust": {
        "name": "プレサイズスラスト",
        "desc": "物理ATKの150%のダメージ。 敵の防御を無視する。"
      },
      "thorns": {
        "name": "ソーンズ",
        "desc": "3ターンの間、受けたダメージの35%を反射。"
      },
      "sweeping_strike": {
        "name": "スウィーピングストライク",
        "desc": "物理ATKの85%で2回攻撃。"
      },
      "serpent_spike": {
        "name": "サーペントスパイク",
        "desc": "物理ATKの100%のダメージ。 3ターンの間、毎ターン40のダメージ。"
      },
      "nature_burst": {
        "name": "ネイチャーバースト",
        "desc": "魔法ATKの200%のダメージ。"
      },
      "phalanx_ward": {
        "name": "ファランクスウォード",
        "desc": "3ターンの間、防御力+35%。"
      },
      "dragon_lance": {
        "name": "ドラゴンランス",
        "desc": "物理ATKの260%のダメージ。 1ターン鈍足にする。"
      },
      "shield_bash": {
        "name": "シールドバッシュ",
        "desc": "物理ATKの120%のダメージ。 1ターン気絶させる。"
      },
      "shield_slam": {
        "name": "シールドスラム",
        "desc": "物理ATKの130%のダメージ。 1ターン鈍足にする。"
      },
      "provoke": {
        "name": "プロヴォーク",
        "desc": "目標をマーク：3ターンの間、受けるダメージ+30%。"
      },
      "bastion": {
        "name": "バスティオン",
        "desc": "2ターンの間、防御力+60%。"
      },
      "aegis_guard": {
        "name": "イージスガード",
        "desc": "2ターンの間、防御力+50%。 e 最大hpの15%を回復。"
      },
      "shield_charge": {
        "name": "シールドチャージ",
        "desc": "物理ATKの180%のダメージ。 1ターン気絶させる。"
      },
      "holy_aegis": {
        "name": "ホーリーイージス",
        "desc": "2ターンの間、防御力+20%。 e 最大hpの50%を回復。"
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
