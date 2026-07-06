#!/usr/bin/env python3
"""
Create a transparent-background version of the LJ Collective logo.
The logo has gold/tan content on a near-black background.
We remove the dark background, keeping the gold elements.
"""
from PIL import Image
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

input_path = os.path.join(PROJECT_ROOT, "assets", "logo.jpeg")
output_path = os.path.join(PROJECT_ROOT, "assets", "logo-transparent.png")

img = Image.open(input_path).convert("RGBA")
pixels = img.load()
width, height = img.size

# The background is near-black. We'll threshold:
# Any pixel where R, G, B are all below a dark threshold → make transparent
# We use a luminance-based approach for better edge handling
DARK_THRESHOLD = 55  # pixels darker than this become transparent

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Calculate luminance
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        
        if lum < DARK_THRESHOLD:
            # Make fully transparent
            pixels[x, y] = (r, g, b, 0)
        elif lum < DARK_THRESHOLD + 30:
            # Semi-transparent edge blending for smooth anti-aliasing
            alpha = int(255 * (lum - DARK_THRESHOLD) / 30)
            pixels[x, y] = (r, g, b, alpha)
        # else: keep pixel as-is (fully opaque gold content)

img.save(output_path, "PNG")
print(f"✓ Transparent logo saved to: {output_path}")
print(f"  Dimensions: {width}x{height}")
print(f"  File size: {os.path.getsize(output_path)} bytes")
