#!/usr/bin/env python3
"""
gen_weapon_tiers.py — Gera tiers visuais de arma a partir da sprite base.

Para cada categoria de arma (overlay base ov_<cat>.png), gera variantes por
raridade/tier:
  T1 (comum/incomum)  -> aço limpo
  T2 (raro/épico)     -> aço azulado + leve brilho
  T3 (lendário)       -> dourado + brilho forte + runas
  Relic               -> etéreo arco-íris + aura

Uso:
  python3 tools/gen_weapon_tiers.py [categoria]
  # sem argumento = gera para 'sword'

Saída: client/public/assets/sprites/ov_<cat>_t<1|2|3>.png
       client/public/assets/sprites/ov_<cat>_relic.png
"""
import sys
import os
import math
import numpy as np
from PIL import Image, ImageFilter, ImageChops, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPRITES = os.path.join(ROOT, 'client', 'public', 'assets', 'sprites')


def load_base(category: str) -> Image.Image:
    """Carrega ov_<cat>.png (ou ov_<cat>_steel.png) como RGBA."""
    for name in (f'ov_{category}.png', f'ov_{category}_steel.png',
                 f'ov_{category}_t1.png'):
        p = os.path.join(SPRITES, name)
        if os.path.exists(p):
            return Image.open(p).convert('RGBA')
    raise FileNotFoundError(f'base para {category!r} não encontrada')


def opaque_mask(arr: np.ndarray) -> np.ndarray:
    """Máscara booleana dos pixels opacos (alpha > 32)."""
    return arr[..., 3] > 32


def tint(arr: np.ndarray, color: tuple[float, float, float],
         strength: float = 0.55, keep_luma: bool = True) -> np.ndarray:
    """
    Recolore os pixels opacos em direção a `color` (RGB 0-255).
    Mantém o sombreado original se keep_luma=True (multiplica a luminância).
    strength: 0 = inalterado, 1 = totalmente colorido.
    """
    out = arr.copy()
    mask = opaque_mask(arr)
    px = out[mask].astype(np.float32)
    r, g, b = px[..., 0], px[..., 1], px[..., 2]
    if keep_luma:
        luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
        nr = color[0] * luma
        ng = color[1] * luma
        nb = color[2] * luma
    else:
        nr, ng, nb = color
    px[..., 0] = r * (1 - strength) + nr * strength
    px[..., 1], px[..., 2] = g * (1 - strength) + ng * strength, b * (1 - strength) + nb * strength
    out[mask] = np.clip(px, 0, 255).astype(np.uint8)
    return out


def add_glow(arr: np.ndarray, color: tuple[int, int, int],
             radius: int = 14, intensity: float = 0.55) -> np.ndarray:
    """Adiciona um glow externo da cor dada (só fora da silhueta)."""
    out = arr.copy()
    alpha = Image.fromarray(arr[..., 3])
    glow = alpha.filter(ImageFilter.GaussianBlur(radius=radius))
    ga = np.array(glow).astype(np.float32) / 255.0
    # glow só onde NÃO é opaco
    mask = ~opaque_mask(arr)
    for c in range(3):
        channel = out[..., c].astype(np.float32)
        add = color[c] * ga * intensity
        channel[mask] = np.clip(channel[mask] + add[mask], 0, 255)
        out[..., c] = channel.astype(np.uint8)
    return out


def add_runes(arr: np.ndarray, color: tuple[int, int, int],
              count: int = 5) -> np.ndarray:
    """Desenha pequenas runas brilhantes ao longo da lâmina (y acima da metade)."""
    out = Image.fromarray(arr)
    h, w = arr.shape[:2]
    draw = ImageDraw.Draw(out)
    rng = np.random.default_rng(42)
    mask = opaque_mask(arr)
    ys, xs = np.where(mask)
    if len(xs) == 0:
        return arr
    # foca no 1/3 superior (lâmina)
    upper = ys < (ys.min() + (ys.max() - ys.min()) * 0.55)
    if upper.sum() < 50:
        return arr
    ux, uy = xs[upper], ys[upper]
    for _ in range(count):
        i = rng.integers(0, len(ux))
        cx, cy = int(ux[i]), int(uy[i])
        r = 3 + int(rng.integers(0, 3))
        # runa = pequeno losango/diamante
        draw.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)],
                     fill=color + (220,))
        # halo
        for k in range(1, 3):
            draw.ellipse([cx - r - k, cy - r - k, cx + r + k, cy + r + k],
                         outline=color + (90 // k,))
    return np.array(out)


def add_inner_glow(arr: np.ndarray, color: tuple[int, int, int],
                   strength: float = 0.25) -> np.ndarray:
    """Clareia/aquece as bordas internas da silhueta (efeito de luz encantada)."""
    out = arr.copy()
    alpha = out[..., 3].astype(np.float32) / 255.0
    inner = np.array(Image.fromarray((alpha * 255).astype(np.uint8))
                     .filter(ImageFilter.GaussianBlur(radius=3)))
    inner = inner.astype(np.float32) / 255.0
    edge = np.clip((inner - alpha) * 2.0, 0, 1) * alpha
    for c in range(3):
        ch = out[..., c].astype(np.float32)
        ch += color[c] * edge * strength
        out[..., c] = np.clip(ch, 0, 255).astype(np.uint8)
    return out


def relic_aura(arr: np.ndarray) -> np.ndarray:
    """Aura etérea arco-íris: vários glows coloridos somados."""
    h, w = arr.shape[:2]
    aura = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    colors = [(255, 80, 200), (80, 180, 255), (180, 255, 120), (255, 220, 90)]
    alpha = Image.fromarray(arr[..., 3])
    for i, col in enumerate(colors):
        glow = alpha.filter(ImageFilter.GaussianBlur(radius=20 + i * 6))
        ga = np.array(glow).astype(np.float32) / 255.0 * (0.35 / (i + 1))
        layer = np.zeros((h, w, 4), dtype=np.uint8)
        layer[..., 0] = col[0]
        layer[..., 1] = col[1]
        layer[..., 2] = col[2]
        layer[..., 3] = (ga * 255 * 0.5).astype(np.uint8)
        aura = Image.alpha_composite(aura, Image.fromarray(layer))
    base = Image.fromarray(arr)
    return np.array(Image.alpha_composite(aura, base))


# Definição dos tiers
def make_t1(base: np.ndarray) -> np.ndarray:
    """Comum/Incomum: aço limpo, prata-azulada suave."""
    arr = tint(base, (200, 215, 230), strength=0.30, keep_luma=True)
    return arr


def make_t2(base: np.ndarray) -> np.ndarray:
    """Raro/Épico: aço azulado + brilho mágico."""
    arr = tint(base, (90, 150, 230), strength=0.55, keep_luma=True)
    arr = add_inner_glow(arr, (120, 190, 255), strength=0.35)
    arr = add_glow(arr, (90, 160, 255), radius=12, intensity=0.45)
    return arr


def make_t3(base: np.ndarray) -> np.ndarray:
    """Lendário: dourado + brilho forte + runas."""
    arr = tint(base, (230, 185, 70), strength=0.70, keep_luma=True)
    arr = add_inner_glow(arr, (255, 230, 150), strength=0.55)
    arr = add_glow(arr, (255, 200, 70), radius=18, intensity=0.70)
    arr = add_runes(arr, (150, 220, 255), count=6)
    return arr


def make_relic(base: np.ndarray) -> np.ndarray:
    """Rélica: etérea, arco-íris, brilho intenso."""
    arr = tint(base, (220, 200, 255), strength=0.40, keep_luma=True)
    arr = add_inner_glow(arr, (255, 255, 255), strength=0.6)
    arr = add_glow(arr, (200, 160, 255), radius=16, intensity=0.6)
    arr = relic_aura(arr)
    arr = add_runes(arr, (255, 255, 255), count=8)
    return arr


TIERS = {
    't1': make_t1,
    't2': make_t2,
    't3': make_t3,
    'relic': make_relic,
}


def generate(category: str) -> None:
    base_img = load_base(category)
    base = np.array(base_img)
    print(f'Base {category}: {base_img.size}')
    for name, fn in TIERS.items():
        out = fn(base.copy())
        # trim excessivo de alpha? Mantém tamanho original para anchor consistente.
        out_img = Image.fromarray(out, 'RGBA')
        fname = f'ov_{category}_{name}.png' if name != 'relic' else f'ov_{category}_relic.png'
        out_img.save(os.path.join(SPRITES, fname), 'PNG', optimize=True)
        print(f'  ✓ {fname}')


if __name__ == '__main__':
    cat = sys.argv[1] if len(sys.argv) > 1 else 'sword'
    generate(cat)
