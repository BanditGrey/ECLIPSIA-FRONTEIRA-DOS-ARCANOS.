import math
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPRITES = os.path.join(ROOT, 'client', 'public', 'assets', 'sprites')

def generate_slash():
    size = 256
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Desenhar um slash curvo
    pts = []
    for i in range(180):
        t = i / 180.0 * math.pi
        r = 100 - t * 20
        x = 128 + r * math.cos(t)
        y = 128 + r * math.sin(t) - 40
        pts.append((x, y))
        
    for i in range(180):
        t = (180 - i) / 180.0 * math.pi
        r = 80 - t * 20
        x = 128 + r * math.cos(t)
        y = 128 + r * math.sin(t) - 40
        pts.append((x, y))
        
    draw.polygon(pts, fill=(255, 255, 255, 255))
    
    # Aplicar Blur direcional ou gaussian para parecer movimento rápido
    blur = img.filter(ImageFilter.GaussianBlur(3))
    
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out = Image.alpha_composite(out, blur)
    out.save(os.path.join(SPRITES, 'vfx_slash.png'))
    print("Generated vfx_slash.png")

generate_slash()
