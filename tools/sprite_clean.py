#!/usr/bin/env python3
"""Limpeza CONSERVADORA de fundo branco para sprites geradas (Eclipsia).

Regras de ouro (lições das sessões anteriores):
- Remove só pixels branco/cinza-claro CONECTADOS ÀS BORDAS (flood 8-dir).
- NUNCA remove brancos internos globalmente (lâminas/highlights são comidos).
- `nibble_fringe` rói o halo claro de AA da borda sem tocar contornos escuros.
- Bolsões brancos PRESOS (ex.: entre arma e corpo) não conectam na borda:
  nesses casos remover pure-white isolado (min>238) pontualmente + nibble.

Uso: python3 tools/sprite_clean.py <in.png> [out.png]
Deps: pip install --break-system-packages Pillow numpy scipy
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage


def nibble_fringe(a, passes=3):
    """Rói franjas claras de baixa saturação na borda do recorte (halo de AA),
    sem comer contornos escuros nem a arte interna."""
    rgb = a[:, :, :3].astype(int)
    mx, mn, mean = rgb.max(2), rgb.min(2), rgb.mean(2)
    fringe_like = ((mx - mn) < 45) & (mean > 175)
    structure = np.ones((3, 3))
    for _ in range(passes):
        opaque = a[:, :, 3] > 0
        transparent = ~opaque
        near_transp = ndimage.binary_dilation(transparent, structure) & opaque
        kill = near_transp & fringe_like
        if not kill.any():
            break
        a[:, :, 3] = np.where(kill, 0, a[:, :, 3]).astype(np.uint8)
    return a


def clean(path_in, path_out):
    im = Image.open(path_in).convert("RGBA")
    a = np.array(im)
    rgb = a[:, :, :3].astype(int)
    mx, mn, mean = rgb.max(2), rgb.min(2), rgb.mean(2)
    # fundo-candidato: quase branco ou cinza muito claro
    bglike = (mn > 225) | (((mx - mn) < 12) & (mean > 210))
    seeds = np.zeros_like(bglike)
    seeds[0, :], seeds[-1, :], seeds[:, 0], seeds[:, -1] = True, True, True, True
    # propaga a partir das bordas dentro da região branco/cinza
    flood = ndimage.binary_propagation(seeds & bglike, mask=bglike, structure=np.ones((3, 3)))
    a[:, :, 3] = np.where(flood, 0, 255).astype(np.uint8)
    a = nibble_fringe(a, passes=3)
    Image.fromarray(a, "RGBA").save(path_out)
    print(f"ok {path_out} (removido {flood.sum()/flood.size*100:.1f}%)")


if __name__ == "__main__":
    clean(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else sys.argv[1])
