#!/usr/bin/env python3
"""
Script para crear la imagen Open Graph para AFD Softworks
Requiere: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Dimensiones OG estándar
OG_WIDTH = 1200
OG_HEIGHT = 630

# Colores de marca AFD
CREAM_BG = "#F5F1E8"
NAVY_DARK = "#3B5A7D"
BLUE_ACCENT = "#4A7AB8"

# Paths
LOGO_PATH = "public/afd-logo.png"
OUTPUT_PATH = "public/og-image.png"

def create_og_image():
    # Crear imagen base con fondo cream
    img = Image.new('RGB', (OG_WIDTH, OG_HEIGHT), CREAM_BG)
    draw = ImageDraw.Draw(img)

    # Abrir y redimensionar el logo
    try:
        logo = Image.open(LOGO_PATH)
        # Mantener aspect ratio del logo
        logo_width = 400
        logo_height = int(logo.height * (logo_width / logo.width))
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

        # Centrar el logo verticalmente
        logo_x = (OG_WIDTH - logo_width) // 2
        logo_y = (OG_HEIGHT - logo_height) // 2 - 50  # Un poco arriba del centro

        # Pegar el logo con transparencia
        if logo.mode in ('RGBA', 'LA'):
            img.paste(logo, (logo_x, logo_y), logo)
        else:
            img.paste(logo, (logo_x, logo_y))

    except FileNotFoundError:
        print(f"Error: No se encontró el logo en {LOGO_PATH}")
        return False

    # Agregar texto debajo del logo
    text = "Sitios web modernos que funcionan"
    text_y = logo_y + logo_height + 40

    # Usar fuente por defecto o cargar una custom
    try:
        # Intentar cargar una fuente serif similar a Playfair
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf", 40)
    except:
        # Fallback a fuente por defecto
        font = ImageFont.load_default()

    # Calcular posición centrada del texto
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_x = (OG_WIDTH - text_width) // 2

    # Dibujar texto
    draw.text((text_x, text_y), text, fill=NAVY_DARK, font=font)

    # Guardar imagen
    img.save(OUTPUT_PATH, 'PNG', quality=95, optimize=True)
    print(f"✅ Imagen OG creada exitosamente: {OUTPUT_PATH}")
    print(f"   Dimensiones: {OG_WIDTH}x{OG_HEIGHT}px")
    print(f"   Tamaño: {os.path.getsize(OUTPUT_PATH) // 1024}KB")

    return True

if __name__ == "__main__":
    if create_og_image():
        print("\n🎉 Imagen Open Graph lista para usar!")
        print("   Valida en: https://www.opengraph.xyz/")
    else:
        print("\n❌ Error al crear la imagen")
