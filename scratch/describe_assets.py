import os
import numpy as np
from PIL import Image

assets_dir = '/home/qassim/Downloads/lj_collective/assets'
files = [f for f in os.listdir(assets_dir) if f.startswith('SaveClip.App_')]
# Add the one in the root too
files.append('../SaveClip.App_731769807_17943153165252474_949466494362981991_n.jpg') # wait, check exact filename in root
# Let's list files in root that start with SaveClip
root_files = [f for f in os.listdir('/home/qassim/Downloads/lj_collective') if f.startswith('SaveClip.App_')]
for rf in root_files:
    files.append('../' + rf)

def analyze_image(path):
    img = Image.open(path).convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape
    
    # 1. Background (outer border average)
    border_mask = np.ones((h, w), dtype=bool)
    border_mask[int(h*0.1):int(h*0.9), int(w*0.1):int(w*0.9)] = False
    bg_color = np.mean(arr[border_mask], axis=0)
    
    # 2. Subject (center average)
    center = arr[int(h*0.25):int(h*0.75), int(w*0.25):int(w*0.75)]
    center_color = np.mean(center, axis=(0,1))
    
    # 3. Colors in center
    r, g, b = center_color
    color_desc = "Neutral/Muted"
    if r > 130 and g > 100 and b < 100:
        color_desc = "Gold/Warm Yellow"
    elif r > 130 and g < 90 and b < 90:
        color_desc = "Red/Burgundy"
    elif r > 180 and g > 180 and b > 180:
        color_desc = "White/Very Light"
    elif r < 60 and g < 60 and b < 60:
        color_desc = "Black/Very Dark"
        
    # 4. Background texture (std dev of edges)
    bg_pixels = arr[border_mask]
    bg_std = np.std(bg_pixels)
    
    # 5. Local variance/detail in center (indicates embroidery/textures/faces)
    center_gray = Image.fromarray(center).convert('L')
    center_arr = np.array(center_gray)
    center_var = np.var(center_arr)
    
    # 6. Aspect Ratio
    aspect = w / h
    
    return {
        "w": w, "h": h, "aspect": aspect,
        "bg_color": bg_color.round(0).tolist(),
        "center_color": center_color.round(0).tolist(),
        "color_desc": color_desc,
        "bg_std": round(bg_std, 1),
        "center_var": round(center_var, 1)
    }

for f in sorted(list(set(files))):
    p = os.path.join(assets_dir, f) if f.startswith('SaveClip.App_') else os.path.join('/home/qassim/Downloads/lj_collective', f[3:])
    if not os.path.exists(p):
        continue
    stats = analyze_image(p)
    print(f"\n{f} ({stats['w']}x{stats['h']}, aspect={stats['aspect']:.2f}):")
    print(f"  Bg Avg: {stats['bg_color']} (std={stats['bg_std']})")
    print(f"  Center Avg: {stats['center_color']} (var={stats['center_var']}) -> {stats['color_desc']}")
