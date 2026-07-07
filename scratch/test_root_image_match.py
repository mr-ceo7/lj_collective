import os
import cv2
import numpy as np
from PIL import Image

ref_path = '/home/qassim/Downloads/lj_collective/assets/step9_dark_rebrand_hero.png'
root_img_path = '/home/qassim/Downloads/lj_collective/SaveClip.App_731769807_17943153426252474_5056458473949518396_n.jpg'

ref_img = cv2.imread(ref_path)
h_ref, w_ref, _ = ref_img.shape

# The left side (left_gown) is approx left 42% of the reference image
left_gown_crop = ref_img[:, :int(w_ref * 0.42)]
left_gown_gray = cv2.cvtColor(left_gown_crop, cv2.COLOR_BGR2GRAY)

img = cv2.imread(root_img_path)
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Resize root image to match left_gown height
th = left_gown_gray.shape[0]
tw = int(img_gray.shape[1] * (th / img_gray.shape[0]))
img_resized = cv2.resize(img_gray, (tw, th))

# Perform template matching
res = cv2.matchTemplate(left_gown_gray, img_resized, cv2.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

print(f"Match score (NCC): {max_val:.4f} at position {max_loc}")
