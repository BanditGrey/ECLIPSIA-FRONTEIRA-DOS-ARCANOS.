=== FASE 1 — RAIO-X COMPLETO DO PROJETO ===
Repositório analisado: ECLIPSIA-FRONTEIRA-DOS-ARCANOS
Branch: arena/019fcaa6-eclipsia-fronteira-dos-arcanos
Data: 2026-08-04

=== TABELA COMPLETA DE ELEMENTOS VISUAIS ===
| ID | Sistema | Arquivo | Elemento Atual | Implementação Atual | Problema Visual | Asset Necessário | Tipo | Prioridade |
| A01 | Player | CombatPanel.tsx, Profile, CharCreate | ⚔ / 🛡 como ícone de classe/sigilo | Emoji como sigilo de arquétipo | Sem vida, estático, sem animação | Sigilo animado por classe (SVG) | SVG + animação | CRÍTICA |
| A02 | Player | App, Profile | Nome/texto como representação | Sem sprite real | Sem identidade visual | Sprite base do player (idle/walk/attack/death) | Spritesheet (6-10 frames) | CRÍTICA |
| A03 | Inimigos | data/monsters.ts, CombatPanel | Nome/texto como representação | Sem sprite, apenas nome/key | Sem identidade visual | Sprite de cada monstro (idle/move/attack/hit/death/spawn) | Spritesheet individual | CRÍTICA |
| A04 | Boss | data/bosses.ts, BossPanel | Nome/texto como representação | Sem sprite, apenas nome | Sem identidade visual | Sprite de boss (idle/ataques múltiplos/fase/transição/morte) | Spritesheet grande (128x128+) | CRÍTICA |
| A05 | Habilidades | skills.ts, CombatPanel, SkillPanel | ⚔ / ✨ / 🌑 / 🔮 como ícone de skill | Emoji como ícone de habilidade | Sem vida, sem feedback visual | Ícone animado por skill (SVG ou spritesheet) | SVG animado / Spritesheet | CRÍTICA |
| A06 | Projéteis | skills (magical) | Sem projétil visual | Nenhum | Sem feedback visual de magia | Projétil animado (bola de fogo, raio, sombra) | Spritesheet animado | ALTA |
| A07 | FX | CombatPanel, SkillEffectPanel | Partículas estáticas / texto | Partículas simples, sem pooling | Sem pooling, blend, glow real | Sistema de partículas reutilizável com pooling, glow, blend | Sistema (código + assets) | CRÍTICA |
| A08 | UI/HUD | CombatPanel, Navbar, Hub | ⚔ / 🛡 / 🔮 / 🏃 / 🤖 como botões | Emoji como botões principais | Sem profissionalismo, sem animação | Botões desenhados com animação de hover/ativo | SVG animado | CRÍTICA |
| A09 | UI/HUD | Navbar, HubPanel, Panels | 💎 / 🪙 / 📜 / 🎁 / ✉️ / 📦 como ícones | Emoji como navegação/moeda/mail/item | Sem consistência visual | Ícones profissionais integrados ao design system | SVG animado | ALTA |
| A10 | Inventário | ItemsPanel, Crafting, Profile | ⚔ / 🛡 / 💎 como slots | Emoji representando equipamento | Sem identidade visual do item | Sprites de itens (espada, escudo, amuleto, etc.) | Sprites individuais | ALTA |
| A11 | Skill Tree | PassivePanel, data/passives.ts | ⚡ / ⚔ / 🛡 como nós/passivas | Emoji como nó de passiva | Sem vida, sem animação de desbloqueio | Árvore de passivas com nós animados, conexões energizadas, desbloqueio com explosão | Sistema + SVG animado | ALTA |
| A12 | Cenário | TravelPanel, World | Sem tiles visuais | Nenhum cenário desenhado | Sem ambiente visual | Tiles de piso, parede, porta, escada, decoração (32x32) | Spritesheet de tiles | ALTA |
| A13 | Itens | loot, items, shop, auction | 🎁 / 💰 / 💎 como representação | Emoji como item/loja/leilão | Sem identidade visual | Baú de loot animado, itens com raridade (brilho/cor) | Sprites + animação | ALTA |
| A14 | Menus | Login, CharacterSelect, Hub | Sem background animado | Background estático/improvisado | Sem profundidade visual | Background animado (gradiente arcano, partículas lentas) | Canvas/SVG animado | MÉDIA |
| A15 | Transições | GameLayout, Painéis | Nenhuma transição cinematográfica | Troca instantânea de painel | Sem fluidez visual | Fade, slide, zoom cinematográfico entre áreas | Animação CSS/Canvas | MÉDIA |
| A16 | Feedback Visual | CombatPanel, SkillPanel | ⚡ / 💥 como feedback de ação | Emoji/texto como feedback | Sem impacto visual forte | Flash de dano, texto flutuante animado, impacto crítico, screen shake controlado | Sistema de FX | CRÍTICA |
| A17 | Game Over / Vitória | Nenhum componente existente | Nenhuma tela final | Nenhuma | Sem final dramático | Tela dramática com estatísticas animadas, fade cinematográfico | Componentes + animação | MÉDIA |

=== RESUMO DA AUDITORIA ===
Total de elementos improvisados: 17 (A01-A17)
Mais críticos: A01 (Player), A02 (Sprite base), A03 (Inimigos), A04 (Boss), A05 (Habilidades), A06 (Projéteis), A07 (FX), A08 (UI/HUD botões)
Dependências: A07 (FX) depende de A01/A03/A04/A05/A06 (todos os elementos de combate precisam de FX integrado). A10 (Inventário) depende de A01 (player precisa equipar itens visuais). A11 (Skill Tree) depende de A05 (skills precisam de animação). A16 (Feedback) depende de todos os sistemas de combate.
Estado atual: Nenhum elemento visual profissional implementado. Todos os componentes visuais são emojis ou placeholders estáticos.
