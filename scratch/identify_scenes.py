import os
from PIL import Image
import numpy as np

path_dir = '/home/qassim/Downloads/lj_collective/assets'
files = [f for f in os.listdir(path_dir) if f.startswith('SaveClip.App_')]
# Add root image
files.append('../SaveClip.App_731769807_17943153426252474_5056458473949518396_n.jpg')

for f in sorted(files):
    full_path = os.path.join(path_dir, f) if f.startswith('SaveClip.App_') else os.path.join('/home/qassim/Downloads/lj_collective', f[3:])
    img = Image.open(full_path).convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape
    
    # 3x3 grid of average colors
    grid = []
    dy, dx = h // 3, w // 3
    for r in range(3):
        row_vals = []
        for c in range(3):
            sub = arr[r*dy:(r+1)*dy, c*dx:(c+1)*dx]
            avg = np.mean(sub, axis=(0,1)).round(0).astype(int)
            row_vals.append(list(avg))
        grid.append(row_vals)
        
    print(f'\n--- {f} ({w}x{h}) ---')
    for row in grid:
        row_str = ' | '.join([f'[{col[0]:3d},{col[1]:3d},{col[2]:3d}]' for col in row])
        print(f'  {row_str}')
