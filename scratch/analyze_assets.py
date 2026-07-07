import os
from PIL import Image
import numpy as np

path_dir = '/home/qassim/Downloads/lj_collective/assets'
for f in sorted(os.listdir(path_dir)):
    if f.startswith('SaveClip.App_'):
        full_path = os.path.join(path_dir, f)
        img = Image.open(full_path).convert('RGB')
        arr = np.array(img)
        h, w, _ = arr.shape
        
        # Calculate color variance to detect texture/patterns vs solid backdrops
        gray = np.dot(arr[...,:3], [0.2989, 0.5870, 0.1140])
        var = np.var(gray)
        
        # Let's count red pixels (e.g. red dress) vs black velvet dress
        red_mask = (arr[:,:,0] > 150) & (arr[:,:,1] < 60) & (arr[:,:,2] < 60)
        red_pct = (np.sum(red_mask) / (h*w)) * 100
        
        print(f'{f}: var={var:.0f}, red={red_pct:.1f}%')
