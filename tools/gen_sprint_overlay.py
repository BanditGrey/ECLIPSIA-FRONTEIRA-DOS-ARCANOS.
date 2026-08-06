#!/usr/bin/env python3
"""
gen_sprint_overlay.py — Gera a variante SPRINT de cada categoria.

SPRINT é o visual das relíquias: LIMPO e SOBRIO, sem chamar atenção.
Diferente do T3 lendário (dourado + runas + glow forte), o sprint é apenas
a arma base com um leve tom pálido/brilhante e um glow sutil, sem runas
nem arco-íris.

Uso: python3 tools/gen_sprint_overlay.py [categoria]
Sem argumento gera para todas as categorias.
"""
import os
import sys
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPRITES = os.path.join(ROOT, 'client', 'public', 'assets', 'sprites')

CATS = ['sword', 'dagger', 'greatsword', 'spear', 'staff',
        'greatstaff', 'hammer', 'bowshort', 'bowlong', 'orb', 'tome']


def load_base(cat: str) -> Image.Image:
    for name in (f'ov_{cat}.png', f'ov_{cat}_steel.png', f'ov_{cat}_t1.png'):
        p = os.path.join(SPRITES, name)
        if os.path.exists(p):
            return Image.open(p).convert('RGBA')
    raise FileNotFoundError(f'base para {cat!r} não encontrada')


def make_sprint(base: Image.Image) -> Image.Image:
    """Sprint: base com leve clareamento + glow sutil prateado/dourado suave."""
    arr = np.array(base).astype(np.float32)
    mask = arr[..., 3] > 32

    # Clareia suavemente (40% para o branco) — visual "lendário/limpo"
    for c in range(3):
        arr[..., c] = np.where(mask, arr[..., c] * 0.7 + 255 * 0.3, arr[..., c])

    # Tom levemente dourado-pálido (não arco-íris)
    tint = np.array([255, 245, 220], dtype=np.float32)
    for c in range(3):
        arr[..., c] = np.where(mask, arr[..., c] * 0.85 + tint[c] * 0.15, arr[..., c])

    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr, 'RGBA')

    # Glow sutil (prata/dourado pálido), bem discreto
    alpha = Image.fromarray(arr[..., 3])
    glow = alpha.filter(ImageFilter.GaussianBlur(radius=10))
    ga = np.array(glow).astype(np.float32) / 255.0
    glow_layer = np.zeros_like(arr)
    glow_col = (220, 210, 180)
    outer = ~mask
    for c in range(3):
        ch = glow_layer[..., c].astype(np.float32)
        ch[outer] = np.clip(ch[outer] + glow_col[c] * ga[outer] * 0.25, 0, 255)
        glow_layer[..., c] = ch.astype(np.uint8)
    glow_layer[..., 3] = (np.clip(ga * 0.35, 0, 1) * 255).astype(np.uint8)

    canvas = Image.new('RGBA', img.size, (0, 0, 0, 0))
    canvas = Image.alpha_composite(canvas, Image.fromarray(glow_layer, 'RGBA'))
    canvas = Image.alpha_composite(canvas, img)
    return canvas


def generate(cat: str) -> None:
    base = load_base(cat)
    out = make_sprint(base)
    out.save(os.path.join(SPRITES, f'ov_{cat}_sprint.png'), 'PNG', optimize=True)
    print(f'  ✓ ov_{cat}_sprint.png')


def main() -> None:
    cats = sys.argv[1:] if len(sys.argv) > 1 else CATS
    for cat in cats:
        if cat == 'sword' and not os.path.exists(os.path.join(SPRITES, 'ov_sword.png')):
            # espada base está como ov_sword_steel.png
            generate('sword')
        else:
            generate(cat)


if __name__ == '__main__':
    main()
