=== FASE 2 — PADRÃO AAA DEFINIDO ===
PROJETO: ECLIPSIA — FRONTEIRA DOS ARCANOS
ESTILO: Dark Fantasy Arcano Premium

🎨 DIREÇÃO DE ARTE
⛔ REGRA ABSOLUTA DE ASSETS (SPRITES)
- NUNCA crie sprites, armas, glifos, ícones ou escudos usando polígonos via código (SVGs inline, paths, canvas geometry, etc). 
- Todos os assets visuais DEVEM ser imagens reais geradas/criadas em alta definição (arquivos PNG estáticos).
- Se precisar de uma nova arte, utilize geração de imagem ou providencie o asset em `/assets/sprites/`. O código deve apenas renderizá-los via tags `<img>` ou CSS `background-image`, aplicando filtros se necessário.

- Estilo: Dark Fantasy Arcano Premium (inspirado em Hollow Knight + Dark Souls + Hades, mas com identidade própria de fronteira arcana)
- Pixel size base: 32x32 para ambiente, 64x64 para personagens principais, 128x128 para bosses, 24x24 para projéteis e itens pequenos
- Escala padrão: 2x ou 3x para visibilidade no navegador (jogo rodando em 1280x720 mínimo)
- Proporção: Personagens ocupando ~1/5 da altura da tela, bosses ~1/3

📦 PALETA
- Principal: #0A0E17 (preto profundo), #141A2E (azul escuro arcano), #1E2845 (azul médio)
- Secundária: #2D1B4E (roxo escuro), #4A2D6E (roxo médio), #6E3D8E (roxo claro)
- Destaque: #D4AF37 (dourado ritual), #FF6B35 (laranja de fogo arcano), #00CCAA (teal mágico)
- Contraste ideal: 4.5:1 mínimo para texto, 7:1 para elementos críticos de gameplay (vida, dano, loot)

📐 PADRÕES VISUAIS
- Contorno: 2px para entidades principais, 1px para itens pequenos, 3px para boss
- Sombra: Drop shadow de 4px com 30% de opacidade para todos os elementos interativos
- Iluminação: Glow pulsante para elementos mágicos, glow constante para itens raros, sem glow para itens comuns
- Animação mínima obrigatória: idle (ciclo de 2-4 frames), hit (flash rápido), morte (queda + fade), coleta (bounce + glow)

📂 ESTRUTURA PROFISSIONAL
- Spritesheets: /public/assets/sprites/
  - player_*.png (idle, walk, run, attack_01, attack_02, cast, hit, death, dash)
  - enemy_*.png (idle, move, attack, hit, death, spawn)
  - boss_*.png (idle, attack_01, attack_02, special, transition, hit, death)
  - projectile_*.png (trail, impact)
  - item_*.png (base, glow)
  - tile_*.png (floor, wall, door, obstacle)
  - ui_*.png (hud_bar, icon_skill, icon_class, button_base)
- FX / Particles: /public/assets/fx/
  - particles_*.json (configurações de partículas reutilizáveis)
  - sfx_*.mp3 (sons sintéticos via Web Audio API — já implementado)
- UI: /public/assets/ui/
  - panel_*.png (molduras, backgrounds animados)
  - icon_*.png (navegação, menus)

📋 CONVENÇÃO DE NOMES
- player_idle_01.png até player_idle_04.png
- enemy_slime_idle_01.png, enemy_slime_attack_01.png
- boss_shadow_idle_01.png, boss_shadow_special_01.png
- projectile_fire_01.png (trail) + projectile_fire_impact_01.png (impacto)
- tile_floor_dark_01.png, tile_wall_dark_01.png, tile_door_dungeon_01.png
- ui_button_base_01.png, ui_icon_attack_01.png

📊 SISTEMA DE ANIMAÇÃO
- Frame rate: 8 FPS para idle, 12 FPS para ataque, 6 FPS para morte (para dar peso)
- Loop: idle (loop infinito), movimento (loop infinito), ataque (loop 1 vez + hold final)
- Transições: fade in 0.3s, fade out 0.5s para todos os elementos que aparecem/desaparecem
- Sincronização: Audio (SFXEngine) sincronizado com frame 2 do ataque (impacto visual + som no mesmo momento)
