# 🖼 Auditoria de assets — 2026-08-09

## Regras vigentes

- Assets de jogo são PNG/JPG estáticos em `client/public/assets/`.
- Não usar SVG inline, paths ou Canvas geométrico para sprites, ícones, armas,
  escudos, glifos ou cenários.
- `tools/sprite_clean.py` é o utilitário de limpeza permitido. Não remover branco
  globalmente: destaques e lâminas legítimos seriam apagados.

## Limpeza conservadora executada

- Removida `public/assets/audio/`, uma árvore fora de `client/public/` e portanto
  não servida pelo Vite; seus arquivos eram placeholders minúsculos.
- Removidos BGM, voz e `attack_real.mp3` não consumidos pelo cliente.
- Removidos `raw_mob_*.png` que não possuíam referências em código ou ferramentas.
- Preservados `raw_shield.png` e `raw_glyph_*.png`: são entradas de
  `tools/gen_final_offhands.js`.

## Não remover sem uma auditoria específica

- `ov_*.png`, `oh_*.png`, `eq_*.png`, `monster_*.png`, `base_*.png` e ícones:
  vários são resolvidos dinamicamente por dados e não aparecem como caminhos
  literais em buscas simples.
