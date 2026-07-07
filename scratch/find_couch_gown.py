import os
import cv2
import numpy as np
from PIL import Image

ref_path = '/home/qassim/Downloads/lj_collective/assets/step9_dark_rebrand_hero.png'
workspace_dir = '/home/qassim/Downloads/lj_collective/assets'

ref_img = Image.open(ref_path).convert('RGB')
ref_w, ref_h = ref_img.size

# In step9_dark_rebrand_hero.png, the gown is on the left
# Coordinates in normalized values
x0, y0, x1, y1 = 0.05, 0.15, 0.45, 0.95
box = (int(x0 * ref_w), int(y0 * ref_h), int(x1 * ref_w), int(y1 * ref_h))
q_img = ref_img.crop(box)
qw, qh = q_img.size

# Let's write a thumbnail preview page or analyze standard deviation of crops
# We want to find which SaveClip image has the best template match for left_gown
q_gray = cv2.cvtColor(np.array(q_img), cv2.COLOR_RGB2GRAY)

print("Matching left gown crop...")
for f in sorted(os.listdir(workspace_dir)):
    if f.startswith('SaveClip.App_'):
        p = os.path.join(workspace_dir, f)
        img = Image.open(p).convert('RGB')
        img_gray = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
        
        # Template match at different scales
        best_val = -1.0
        for scale in [0.15, 0.2, 0.25, 0.3, 0.35, 0.4]:
            temp_w = int(img_gray.shape[1] * scale)
            temp_h = int(img_gray.shape[0] * scale)
            if temp_w < qw or temp_h < qh:
                continue
            resized = cv2.resize(img_gray, (temp_w, temp_h))
            res = cv2.matchTemplate(resized, q_gray, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, _ = cv2.minMaxLoc(res)
            if max_val > best_val:
                best_val = max_val
                
        print(f"  {f}: Best normalized correlation = {best_val:.4f}")
