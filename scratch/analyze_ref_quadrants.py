from PIL import Image
import numpy as np

ref_path = '/home/qassim/Downloads/lj_collective/assets/step9_dark_rebrand_hero.png'
ref_img = Image.open(ref_path).convert('RGB')
ref_w, ref_h = ref_img.size

quadrants = {
    "left_gown": (0.05, 0.15, 0.45, 0.95),
    "collage_top_left": (0.50, 0.15, 0.76, 0.70),
    "collage_top_right": (0.78, 0.15, 0.97, 0.55),
    "collage_bottom_left": (0.56, 0.60, 0.74, 0.98),
    "collage_bottom_right": (0.75, 0.50, 0.96, 0.92)
}

for q_name, (x0, y0, x1, y1) in quadrants.items():
    box = (int(x0 * ref_w), int(y0 * ref_h), int(x1 * ref_w), int(y1 * ref_h))
    q_img = ref_img.crop(box)
    q_arr = np.array(q_img)
    
    # Calculate dominant colors
    avg_color = np.mean(q_arr, axis=(0,1))
    
    # Dark percentage
    dark_mask = (q_arr[:,:,0] < 50) & (q_arr[:,:,1] < 50) & (q_arr[:,:,2] < 50)
    dark_pct = (np.sum(dark_mask) / (q_arr.shape[0] * q_arr.shape[1])) * 100
    
    # Red percentage (R > G+40 and R > B+40)
    red_mask = (q_arr[:,:,0] > q_arr[:,:,1].astype(int) + 40) & (q_arr[:,:,0] > q_arr[:,:,2].astype(int) + 40)
    red_pct = (np.sum(red_mask) / (q_arr.shape[0] * q_arr.shape[1])) * 100
    
    # Gold/Yellow/Warm percentage (R > 130 and G > 100 and B < 100)
    gold_mask = (q_arr[:,:,0] > 130) & (q_arr[:,:,1] > 100) & (q_arr[:,:,2] < 100)
    gold_pct = (np.sum(gold_mask) / (q_arr.shape[0] * q_arr.shape[1])) * 100
    
    print(f"{q_name}: avg={avg_color.round(1)}, dark={dark_pct:.1f}%, red={red_pct:.1f}%, gold={gold_pct:.1f}%")
