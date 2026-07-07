import os
from PIL import Image
import numpy as np

assets_dir = '/home/qassim/Downloads/lj_collective/assets'
candidates = [
    'SaveClip.App_726380751_18412051270196378_903608071847032010_n.jpg',
    'SaveClip.App_655060660_18090079324917413_3092540149964147636_n.jpg',
    'SaveClip.App_726220492_18412051288196378_5070443709924620382_n.jpg',
    'SaveClip.App_726247220_18412051285196378_8868740418072431020_n.jpg',
]

for f in candidates:
    p = os.path.join(assets_dir, f)
    img = Image.open(p).convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape
    
    # Calculate average color in top 1/3 (background)
    top_bg = np.mean(arr[:h//3, :], axis=(0,1))
    # Calculate average color in middle column (subject)
    mid_subject = np.mean(arr[h//3:2*h//3, w//3:2*w//3], axis=(0,1))
    
    print(f'{f}:')
    print(f'  Background Top color: {top_bg.round(0)}')
    print(f'  Middle Center color: {mid_subject.round(0)}')
