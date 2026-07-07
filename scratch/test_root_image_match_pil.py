import os
import numpy as np
from PIL import Image

ref_path = '/home/qassim/Downloads/lj_collective/assets/step9_dark_rebrand_hero.png'
root_img_path = '/home/qassim/Downloads/lj_collective/SaveClip.App_731769807_17943153426252474_5056458473949518396_n.jpg'

ref_img = Image.open(ref_path).convert('L')
ref_w, ref_h = ref_img.size

# Left 42%
crop_w = int(ref_w * 0.42)
left_gown_crop = ref_img.crop((0, 0, crop_w, ref_h))
left_gown_arr = np.array(left_gown_crop).astype(np.float32)

# Load root image
img = Image.open(root_img_path).convert('L')
# Resize template to match left_gown height
th = ref_h
tw = int(img.width * (th / img.height))
img_resized = img.resize((tw, th), Image.Resampling.BILINEAR)
img_arr = np.array(img_resized).astype(np.float32)

# Subtract mean to do NCC
left_gown_arr_mean = left_gown_arr - np.mean(left_gown_arr)
img_arr_mean = img_arr - np.mean(img_arr)

# Sliding window search over width since height matches
best_ncc = -1.0
best_x = 0
for x in range(left_gown_arr.shape[1] - tw + 1):
    sub = left_gown_arr_mean[:, x:x+tw]
    sub_std = np.std(sub)
    img_std = np.std(img_arr_mean)
    if sub_std > 1e-5 and img_std > 1e-5:
        ncc = np.mean(sub * img_arr_mean) / (sub_std * img_std)
        if ncc > best_ncc:
            best_ncc = ncc
            best_x = x

print(f"Match score (NCC): {best_ncc:.4f} at position x={best_x}")
