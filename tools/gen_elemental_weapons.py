#!/usr/bin/env python3
import sys
import os
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPRITES = os.path.join(ROOT, 'client', 'public', 'assets', 'sprites')

CATEGORIES = [
    'sword', 'dagger', 'greatsword', 'spear', 'staff', 'greatstaff',
    'hammer', 'bowshort', 'bowlong', 'orb', 'tome'
]

ELEMENTS = {
    'fire': {'color': (255, 90, 20), 'glow': (255, 60, 0), 'rune': (255, 200, 100)},
    'water': {'color': (40, 140, 255), 'glow': (20, 100, 255), 'rune': (180, 220, 255)},
    'earth': {'color': (140, 200, 60), 'glow': (100, 160, 30), 'rune': (220, 255, 180)},
    'wind': {'color': (150, 240, 230), 'glow': (120, 220, 200), 'rune': (255, 255, 255)},
    'dark': {'color': (140, 40, 220), 'glow': (100, 20, 180), 'rune': (220, 180, 255)},
    'light': {'color': (255, 220, 100), 'glow': (255, 190, 50), 'rune': (255, 255, 200)},
}

def load_base(category: str) -> Image.Image:
    for name in (f'ov_{category}.png', f'ov_{category}_steel.png', f'ov_{category}_t1.png'):
        p = os.path.join(SPRITES, name)
        if os.path.exists(p):
            return Image.open(p).convert('RGBA')
    raise FileNotFoundError(f'base para {category!r} não encontrada')

def opaque_mask(arr: np.ndarray) -> np.ndarray:
    return arr[..., 3] > 32

def tint(arr: np.ndarray, color: tuple[int, int, int], strength: float) -> np.ndarray:
    out = arr.copy()
    mask = opaque_mask(arr)
    px = out[mask].astype(np.float32)
    r, g, b = px[..., 0], px[..., 1], px[..., 2]
    luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
    px[..., 0] = r * (1 - strength) + (color[0] * luma) * strength
    px[..., 1] = g * (1 - strength) + (color[1] * luma) * strength
    px[..., 2] = b * (1 - strength) + (color[2] * luma) * strength
    out[mask] = np.clip(px, 0, 255).astype(np.uint8)
    return out

def add_glow(arr: np.ndarray, color: tuple[int, int, int], radius: int, intensity: float) -> np.ndarray:
    out = arr.copy()
    alpha = Image.fromarray(arr[..., 3])
    glow = alpha.filter(ImageFilter.GaussianBlur(radius=radius))
    ga = np.array(glow).astype(np.float32) / 255.0
    mask = ~opaque_mask(arr)
    for c in range(3):
        ch = out[..., c].astype(np.float32)
        ch[mask] = np.clip(ch[mask] + color[c] * ga[mask] * intensity, 0, 255)
        out[..., c] = ch.astype(np.uint8)
    return out

def add_inner_glow(arr: np.ndarray, color: tuple[int, int, int], strength: float) -> np.ndarray:
    out = arr.copy()
    alpha = out[..., 3].astype(np.float32) / 255.0
    inner = np.array(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=3)))
    inner = inner.astype(np.float32) / 255.0
    edge = np.clip((inner - alpha) * 2.0, 0, 1) * alpha
    for c in range(3):
        ch = out[..., c].astype(np.float32)
        ch += color[c] * edge * strength
        out[..., c] = np.clip(ch, 0, 255).astype(np.uint8)
    return out

def add_runes(arr: np.ndarray, color: tuple[int, int, int], count: int) -> np.ndarray:
    out = Image.fromarray(arr)
    draw = ImageDraw.Draw(out)
    rng = np.random.default_rng(42)
    mask = opaque_mask(arr)
    ys, xs = np.where(mask)
    if len(xs) == 0: return arr
    upper = ys < (ys.min() + (ys.max() - ys.min()) * 0.55)
    if upper.sum() < 50: return arr
    ux, uy = xs[upper], ys[upper]
    for _ in range(count):
        i = rng.integers(0, len(ux))
        cx, cy = int(ux[i]), int(uy[i])
        r = 3 + int(rng.integers(0, 3))
        draw.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=color + (220,))
        for k in range(1, 3):
            draw.ellipse([cx - r - k, cy - r - k, cx + r + k, cy + r + k], outline=color + (90 // k,))
    return np.array(out)

def make_t2_elemental(base: np.ndarray, elem: str) -> np.ndarray:
    cfg = ELEMENTS[elem]
    arr = tint(base, cfg['color'], strength=0.6)
    arr = add_inner_glow(arr, cfg['glow'], strength=0.4)
    arr = add_glow(arr, cfg['glow'], radius=12, intensity=0.6)
    return arr

def make_t3_elemental(base: np.ndarray, elem: str) -> np.ndarray:
    cfg = ELEMENTS[elem]
    arr = tint(base, cfg['color'], strength=0.8)
    arr = add_inner_glow(arr, cfg['rune'], strength=0.7)
    arr = add_glow(arr, cfg['glow'], radius=18, intensity=0.9)
    arr = add_runes(arr, cfg['rune'], count=7)
    return arr

for cat in CATEGORIES:
    print(f"Generating elemental overlays for {cat}...")
    try:
        base_img = load_base(cat)
        base = np.array(base_img)
        for elem in ELEMENTS.keys():
            t2 = make_t2_elemental(base.copy(), elem)
            Image.fromarray(t2, 'RGBA').save(os.path.join(SPRITES, f'ov_{cat}_{elem}_t2.png'))
            t3 = make_t3_elemental(base.copy(), elem)
            Image.fromarray(t3, 'RGBA').save(os.path.join(SPRITES, f'ov_{cat}_{elem}_t3.png'))
    except Exception as e:
        print(f"Failed {cat}: {e}")

print("Elemental weapons generated!")
