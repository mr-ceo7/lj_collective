import os
from PIL import Image
import numpy as np

path_dir = '/home/qassim/Downloads/lj_collective/assets'
files = [f for f in os.listdir(path_dir) if f.startswith('SaveClip.App_')]
# Add the one in root too
files.append('../SaveClip.App_731769807_17943153426252474_5056458473949518396_n.jpg')

for f in sorted(files):
    if f.startswith('SaveClip.App_') or f.startswith('../SaveClip.App_'):
        full_path = os.path.join(path_dir, f) if f.startswith('SaveClip.App_') else os.path.join('/home/qassim/Downloads/lj_collective', f[3:])
        img = Image.open(full_path).convert('RGB')
        arr = np.array(img)
        h, w, _ = arr.shape
        
        # Lower half (clothing area)
        lower_half = arr[h//2:, :]
        avg_color = np.mean(lower_half, axis=(0,1))
        
        # Classify color
        r, g, b = avg_color
        color_name = "unknown"
        if r < 60 and g < 60 and b < 60:
            color_name = "black/dark"
        elif r > 180 and g > 180 and b > 180:
            color_name = "white/light grey"
        elif r > 150 and g < 100 and b < 100:
            color_name = "red/crimson"
        elif r > 150 and g > 120 and b < 100:
            color_name = "gold/yellow/beige"
        elif r > 130 and g > 100 and b > 100:
            color_name = "beige/pink/light brown"
        
        # Calculate dark percentage in lower half
        dark_mask = (lower_half[:,:,0] < 50) & (lower_half[:,:,1] < 50) & (lower_half[:,:,2] < 50)
        dark_pct = (np.sum(dark_mask) / (lower_half.shape[0] * lower_half.shape[1])) * 100
        
        print(f'{f}: size={w}x{h}, avg_lower={avg_color.round(0)}, color_group={color_name}, dark_pct={dark_pct:.1f}%')
