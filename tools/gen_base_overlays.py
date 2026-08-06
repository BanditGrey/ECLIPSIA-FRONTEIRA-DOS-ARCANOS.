#!/usr/bin/env python3
"""
gen_base_overlays.py — Gera overlays BASE de arma em PNG com Pillow.

Desenha cada categoria de arma diretamente em um canvas transparente
(278x1175) na diagonal. O resultado serve de entrada para
gen_weapon_tiers.py, que aplica as variantes de raridade.

Categorias: sword, dagger, greatsword, spear, staff, greatstaff,
            hammer, bowshort, bowlong.

Uso: python3 tools/gen_base_overlays.py
"""
import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPRITES = os.path.join(ROOT, 'client', 'public', 'assets', 'sprites')
W, H = 278, 1175

# Paleta
STEEL_TOP = (216, 221, 230)
STEEL_MID = (138, 147, 163)
STEEL_DARK = (90, 98, 113)
STEEL_EDGE = (240, 243, 249)
GOLD = (244, 210, 122)
GOLD_DARK = (168, 127, 46)
WOOD = (138, 98, 56)
WOOD_DARK = (90, 62, 34)
OUTLINE = (58, 65, 80)


def new_canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def poly(draw, pts, fill, outline=OUTLINE, width=2):
    draw.polygon(pts, fill=fill, outline=outline)
    # grossura do outline
    for i in range(len(pts)):
        draw.line([pts[i], pts[(i + 1) % len(pts)]], fill=outline, width=width)


def draw_sword():
    img, d = new_canvas()
    cx = W // 2
    # lâmina em losango vertical
    poly(d, [(cx, 120), (cx + 20, 160), (cx + 22, 540), (cx - 22, 540), (cx - 20, 160)],
         fill=STEEL_MID, width=3)
    # fio central
    poly(d, [(cx, 135), (cx + 8, 540), (cx - 8, 540)], fill=STEEL_EDGE, outline=None, width=0)
    # guarda
    d.rounded_rectangle([cx - 52, 530, cx + 52, 548], radius=4, fill=GOLD, outline=GOLD_DARK, width=2)
    # cabo
    d.rounded_rectangle([cx - 11, 548, cx + 11, 640], radius=4, fill=WOOD, outline=WOOD_DARK, width=2)
    # punho
    d.ellipse([cx - 15, 628, cx + 15, 660], fill=GOLD, outline=GOLD_DARK, width=2)
    return img


def draw_dagger():
    img, d = new_canvas()
    cx = W // 2
    poly(d, [(cx, 380), (cx + 15, 400), (cx + 16, 580), (cx - 16, 580), (cx - 15, 400)],
         fill=STEEL_MID, width=2)
    poly(d, [(cx, 390), (cx + 5, 575), (cx - 5, 575)], fill=STEEL_EDGE, outline=None, width=0)
    d.rounded_rectangle([cx - 32, 570, cx + 32, 584], radius=3, fill=GOLD, outline=GOLD_DARK, width=2)
    d.rounded_rectangle([cx - 8, 584, cx + 8, 640], radius=3, fill=WOOD, outline=WOOD_DARK, width=2)
    d.ellipse([cx - 11, 630, cx + 11, 652], fill=GOLD, outline=GOLD_DARK, width=2)
    return img


def draw_greatsword():
    img, d = new_canvas()
    cx = W // 2
    poly(d, [(cx, 60), (cx + 32, 110), (cx + 36, 540), (cx - 36, 540), (cx - 32, 110)],
         fill=STEEL_MID, width=3)
    poly(d, [(cx, 80), (cx + 12, 530), (cx - 12, 530)], fill=STEEL_EDGE, outline=None, width=0)
    d.line([cx, 100, cx, 500], fill=(74, 82, 96), width=4)
    d.rounded_rectangle([cx - 66, 525, cx + 66, 548], radius=5, fill=GOLD, outline=GOLD_DARK, width=3)
    d.rounded_rectangle([cx - 15, 548, cx + 15, 660], radius=5, fill=WOOD, outline=WOOD_DARK, width=3)
    d.rectangle([cx - 15, 588, cx + 15, 600], fill=GOLD_DARK)
    d.ellipse([cx - 20, 642, cx + 20, 684], fill=GOLD, outline=GOLD_DARK, width=3)
    return img


def draw_spear():
    img, d = new_canvas()
    cx = W // 2
    # ponta
    poly(d, [(cx, 90), (cx + 13, 140), (cx + 10, 230), (cx - 10, 230), (cx - 13, 140)],
         fill=STEEL_MID, width=2)
    poly(d, [(cx, 100), (cx + 4, 225), (cx - 4, 225)], fill=STEEL_EDGE, outline=None, width=0)
    # virola
    d.rectangle([cx - 10, 225, cx + 10, 240], fill=GOLD, outline=GOLD_DARK, width=2)
    # cabo
    d.rounded_rectangle([cx - 6, 240, cx + 6, 680], radius=3, fill=WOOD, outline=WOOD_DARK, width=2)
    d.rectangle([cx - 6, 420, cx + 6, 430], fill=GOLD_DARK)
    d.rectangle([cx - 6, 560, cx + 6, 570], fill=GOLD_DARK)
    # ponta inferior
    poly(d, [(cx - 8, 680), (cx, 705), (cx + 8, 680)], fill=STEEL_MID, width=2)
    return img


def draw_staff():
    img, d = new_canvas()
    cx = W // 2
    # cabo
    d.rounded_rectangle([cx - 7, 180, cx + 7, 720], radius=4, fill=WOOD, outline=WOOD_DARK, width=2)
    for y in (290, 460, 620):
        d.rectangle([cx - 9, y, cx + 9, y + 12], fill=GOLD, outline=GOLD_DARK)
    # cristal (glow + facetas)
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([cx - 35, 115, cx + 35, 185], fill=(125, 211, 252, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(10))
    img.alpha_composite(glow)
    poly(d, [(cx, 100), (cx + 20, 145), (cx + 13, 190), (cx - 13, 190), (cx - 20, 145)],
         fill=(125, 211, 252), outline=(14, 116, 144), width=2)
    poly(d, [(cx - 6, 130), (cx, 110), (cx + 6, 130)], fill=(224, 242, 254), outline=None, width=0)
    return img


def draw_greatstaff():
    img, d = new_canvas()
    cx = W // 2
    d.rounded_rectangle([cx - 10, 140, cx + 10, 720], radius=5, fill=WOOD, outline=WOOD_DARK, width=2)
    for y in (250, 420, 600):
        d.rectangle([cx - 12, y, cx + 12, y + 16], fill=GOLD, outline=GOLD_DARK)
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([cx - 50, 80, cx + 50, 175], fill=(167, 139, 250, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(14))
    img.alpha_composite(glow)
    poly(d, [(cx, 60), (cx + 32, 120), (cx + 22, 180), (cx - 22, 180), (cx - 32, 120)],
         fill=(167, 139, 250), outline=(91, 33, 182), width=3)
    poly(d, [(cx - 11, 100), (cx, 70), (cx + 11, 100)], fill=(237, 233, 254), outline=None, width=0)
    poly(d, [(cx - 13, 700), (cx, 735), (cx + 13, 700)], fill=STEEL_MID, width=2)
    return img


def draw_hammer():
    img, d = new_canvas()
    cx = W // 2
    # cabo
    d.rounded_rectangle([cx - 8, 260, cx + 8, 700], radius=4, fill=WOOD, outline=WOOD_DARK, width=2)
    d.rectangle([cx - 10, 380, cx + 10, 392], fill=GOLD_DARK)
    d.rectangle([cx - 10, 540, cx + 10, 552], fill=GOLD_DARK)
    # cabeça
    head_y = 230
    d.rounded_rectangle([cx - 60, head_y - 40, cx + 60, head_y + 35], radius=8,
                        fill=STEEL_MID, outline=OUTLINE, width=3)
    d.rounded_rectangle([cx - 60, head_y - 40, cx + 60, head_y - 18], radius=6,
                        fill=STEEL_EDGE, outline=None, width=0)
    # faces
    d.rounded_rectangle([cx - 68, head_y - 28, cx - 54, head_y + 23], radius=3,
                        fill=(74, 82, 96), outline=OUTLINE, width=2)
    d.rounded_rectangle([cx + 54, head_y - 28, cx + 68, head_y + 23], radius=3,
                        fill=(74, 82, 96), outline=OUTLINE, width=2)
    # rebites
    for rx in (cx - 32, cx + 32):
        d.ellipse([rx - 6, head_y - 6, rx + 6, head_y + 6], fill=GOLD, outline=GOLD_DARK, width=2)
    return img


def draw_bow(short=True):
    img, d = new_canvas()
    cx = W // 2
    if short:
        top_y, bot_y, curve = 200, 620, -65
        width, edge = 11, 7
    else:
        top_y, bot_y, curve = 120, 660, -75
        width, edge = 9, 5
    # arco (duas linhas para dar volume)
    pts = []
    steps = 40
    for i in range(steps + 1):
        t = i / steps
        y = top_y + (bot_y - top_y) * t
        x = cx + curve * (1 - (2 * t - 1) ** 2)
        pts.append((x, y))
    for i in range(len(pts) - 1):
        d.line([pts[i], pts[i + 1]], fill=WOOD_DARK, width=width)
    for i in range(len(pts) - 1):
        d.line([pts[i], pts[i + 1]], fill=WOOD, width=edge)
    # pontas recurvadas (arco longo)
    if not short:
        d.arc([cx - 30, top_y - 30, cx + 10, top_y + 10], 200, 300, fill=WOOD_DARK, width=width)
        d.arc([cx - 30, bot_y - 10, cx + 10, bot_y + 30], 60, 160, fill=WOOD_DARK, width=width)
    # encaixes
    d.ellipse([pts[0][0] - 9, pts[0][1] - 9, pts[0][0] + 9, pts[0][1] + 9], fill=GOLD, outline=GOLD_DARK, width=2)
    d.ellipse([pts[-1][0] - 9, pts[-1][1] - 9, pts[-1][0] + 9, pts[-1][1] + 9], fill=GOLD, outline=GOLD_DARK, width=2)
    # corda
    d.line([pts[0], pts[-1]], fill=(229, 231, 235), width=2)
    # empunhadura
    grip_y = (top_y + bot_y) // 2 - 40
    d.rounded_rectangle([cx - 6, grip_y, cx + 22, grip_y + (55 if short else 65)],
                        radius=4, fill=(42, 30, 18))
    return img



def draw_orb():
    """Orbe mágico flutuante com anel."""
    img, d = new_canvas()
    cx = W // 2
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([cx - 55, 340, cx + 55, 450], fill=(167, 139, 250, 110))
    glow = glow.filter(ImageFilter.GaussianBlur(16))
    img.alpha_composite(glow)
    d.ellipse([cx - 52, 338, cx + 52, 452], outline=GOLD, width=5)
    d.ellipse([cx - 46, 344, cx + 46, 446], outline=GOLD_DARK, width=2)
    d.ellipse([cx - 38, 352, cx + 38, 438], fill=(125, 211, 252), outline=(14, 116, 144), width=2)
    d.ellipse([cx - 28, 358, cx + 4, 390], fill=(224, 242, 254, 180))
    d.rounded_rectangle([cx - 12, 440, cx + 12, 470], radius=3, fill=GOLD, outline=GOLD_DARK, width=2)
    return img


def draw_tome():
    """Tomo/livro mágico com fecho dourado."""
    img, d = new_canvas()
    cx = W // 2
    d.rounded_rectangle([cx - 58, 290, cx + 58, 470], radius=6,
                        fill=(90, 62, 34), outline=(42, 30, 18), width=3)
    d.rectangle([cx - 62, 296, cx - 50, 464], fill=(60, 40, 22), outline=(42, 30, 18), width=2)
    d.rectangle([cx - 48, 300, cx + 52, 460], fill=(230, 220, 190), outline=(120, 100, 70), width=1)
    for i in range(6):
        y = 315 + i * 22
        d.line([cx - 40, y, cx + 44, y], fill=(180, 160, 120), width=1)
    d.rounded_rectangle([cx - 8, 370, cx + 8, 395], radius=2, fill=GOLD, outline=GOLD_DARK, width=2)
    d.arc([cx + 30, 420, cx + 58, 460], 0, 90, fill=GOLD, width=3)
    d.arc([cx - 52, 300, cx - 30, 330], 90, 180, fill=GOLD, width=3)
    return img


CATEGORIES = {
    'sword': draw_sword,
    'dagger': draw_dagger,
    'greatsword': draw_greatsword,
    'spear': draw_spear,
    'staff': draw_staff,
    'greatstaff': draw_greatstaff,
    'hammer': draw_hammer,
    'bowshort': lambda: draw_bow(short=True),
    'bowlong': lambda: draw_bow(short=False),
    'orb': draw_orb,
    'tome': draw_tome,
}


def main():
    os.makedirs(SPRITES, exist_ok=True)
    for name, fn in CATEGORIES.items():
        if name == 'sword' and os.path.exists(os.path.join(SPRITES, 'ov_sword_steel.png')):
            print(f'  - {name}: ov_sword_steel.png existente (pulando)')
            continue
        img = fn()
        out = os.path.join(SPRITES, f'ov_{name}.png')
        img.save(out, 'PNG')
        print(f'  ✓ ov_{name}.png')
    print('Concluído. Rode: python3 tools/gen_weapon_tiers.py <categoria>')


if __name__ == '__main__':
    main()
