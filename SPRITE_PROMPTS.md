# SPRITE_PROMPTS.md — Template de geração de sprites ECLIPSIA

> Referência canônica: `client/public/assets/sprites/base_male_idle_1.png`
> Sempre incluir como `images=[..., "client/public/assets/sprites/base_male_idle_1.png"]`

## Regra de estilo (OBRIGATÓRIA)
- 2D JRPG anime painterly (Akihiko Yoshida / Final Fantasy Tactics / Bravely Default)
- SEM outline preto grosso (se houver, bem fino integrado ao sombreado)
- Paleta suave/dessaturada com gradientes pintados à mão
- Full-body, side-profile virado para DIREITA (para ser espelhado via CSS `scaleX(-1)` no monstro)
- Fundo TRANSPARENTE (sem xadrez, sem cor sólida)
- Sem texto, moldura, UI, sombra projetada no chão

## Script remove_bg.py (VERSÃO CONSERVADORA — NÃO usar agressiva)
```python
#!/usr/bin/env python3
import sys
from PIL import Image
import numpy as np
from scipy import ndimage

def clean_sprite(path_in, path_out):
    img = Image.open(path_in).convert("RGBA")
    arr = np.array(img)
    h, w, _ = arr.shape
    r, g, b, a = arr[...,0], arr[...,1], arr[...,2], arr[...,3]
    maxc = np.maximum(np.maximum(r, g), b)
    minc = np.minimum(np.minimum(r, g), b)
    sat = np.where(maxc > 0, np.clip((maxc.astype(float) - minc.astype(float)) / maxc.astype(float) * 255, 0, 255), 0)
    white = (r > 240) & (g > 240) & (b > 240)
    black_bg = (r < 25) & (g < 25) & (b < 25)
    remove = (a < 220) | (sat < 5) | white | black_bg
    border = np.zeros((h, w), dtype=bool)
    border[0,:]=True; border[-1,:]=True; border[:,0]=True; border[:,-1]=True
    seeds = np.where(border & remove)
    if len(seeds[0]) == 0:
        arr[remove] = [0,0,0,0]
        Image.fromarray(arr,"RGBA").save(path_out, format="PNG")
        return
    filled = np.zeros((h,w), dtype=bool)
    current = np.zeros((h,w), dtype=bool)
    current[seeds] = True
    for _ in range(max(h,w)):
        dilated = ndimage.binary_dilation(current, structure=np.ones((3,3), dtype=bool))
        new = dilated & remove & (~filled)
        if not np.any(new): break
        current |= new
        filled |= new
    arr[filled] = [0,0,0,0]
    Image.fromarray(arr,"RGBA").save(path_out, format="PNG")

if __name__ == "__main__":
    if len(sys.argv) < 3: sys.exit(1)
    clean_sprite(sys.argv[1], sys.argv[2])
```

Instale deps: `pip install --break-system-packages Pillow numpy scipy`

## Lote 10 sprites (prioridade desta sessão)
Todos com referência `base_male_idle_1.png`. Virados para DIREITA no PNG.

### Miragem Beast (sera / miragem)
1. `monster_mirage_beast_idle_1` — fera felina da miragem deserto, pelo dourado-palha com listras, olhos âmbar brilhantes, corpo elegante de chita/pantera grande, parada em 4 patas, alerta
2. `monster_mirage_beast_attack_1` — a mesma criatura em pose de bote/ataque

### Dune Crawler
3. `monster_dune_crawler_idle_1` — verme gigante do deserto, segmentos ósseos/marrons-ocre, boca circular com dentes, saindo parcialmente da areia
4. `monster_dune_crawler_attack_1` — o mesmo verme investindo/brotando da areia com boca aberta

### Storm Harpy
5. `monster_storm_harpy_idle_1` — harpia (mulher-pássaro) da tempestade, penas azul-celeste/azul-tempestade, cabelos esvoaçantes, asas abertas semi-dobradas, pousada em penhasco
6. `monster_storm_harpy_attack_1` — a mesma harpia em mergulho com garras para frente e relâmpagos

### Cloud Titan
7. `monster_cloud_titan_idle_1` — titã/gigante humanóide ENORME feito de nuvens brancas/cinza-claro com toques dourados de eletricidade, barba de nuvem, olhos brancos brilhantes, parado
8. `monster_cloud_titan_attack_1` — o mesmo titã golpeando com punho fechado, raios ao redor

### Sea Wraith
9. `monster_sea_wraith_idle_1` — espectro aquático feminino translúcido, corpo azul-esverdeado aquático, cabelos de água esvoaçantes, flutuando, olhos branco-azulados brilhantes
10. `monster_sea_wraith_attack_1` — o mesmo espectro com braços/tentáculos de água avançando
