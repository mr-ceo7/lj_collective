import os
import cv2
import numpy as np

# Load screenshot
screenshot_path = '/home/qassim/.gemini/antigravity/brain/d4241217-5b6a-4358-bef7-d5e62406b70e/media__1783384394368.png'
screen = cv2.imread(screenshot_path)
H, W, _ = screen.shape

# Let's crop Card 1 (top right) and Card 4 (bottom right) from the screen.
# Card 1 is roughly at top-right, let's define a bounding box based on percentages
# H is usually around 1080 (or similar), W is around 1920 (or similar).
# Top right card is around: y in [10%, 40%], x in [80%, 95%]
y1, y2 = int(H * 0.12), int(H * 0.38)
x1, x2 = int(W * 0.81), int(W * 0.94)
card1_crop = screen[y1:y2, x1:x2]
cv2.imwrite('scratch/card1_crop.png', card1_crop)

# Card 4 is around: y in [40%, 65%], x in [78%, 95%]
y3, y4 = int(H * 0.39), int(H * 0.65)
x3, x4 = int(W * 0.78), int(W * 0.94)
card4_crop = screen[y3:y4, x3:x4]
cv2.imwrite('scratch/card4_crop.png', card4_crop)

print(f"Screenshot size: {W}x{H}")
print(f"Card 1 crop saved (size: {card1_crop.shape[1]}x{card1_crop.shape[0]})")
print(f"Card 4 crop saved (size: {card4_crop.shape[1]}x{card4_crop.shape[0]})")

# List all assets to match
assets_dir = '/home/qassim/Downloads/lj_collective/assets'
assets_files = [os.path.join(assets_dir, f) for f in os.listdir(assets_dir) if f.startswith('SaveClip.App_') or f == 'burgundy-blazer.png']
# Also add from root
root_dir = '/home/qassim/Downloads/lj_collective'
assets_files += [os.path.join(root_dir, f) for f in os.listdir(root_dir) if f.startswith('SaveClip.App_')]

def get_best_match(crop, files):
    crop_gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    best_ncc = -1
    best_file = None
    
    for f in files:
        img = cv2.imread(f)
        if img is None:
            continue
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Resize crop to a reasonable size and then search or vice versa
        # Since crop is smaller, we find template crop in img or resize img to match crop size
        h_c, w_c = crop_gray.shape
        # Resize img to have same height or width
        aspect_c = w_c / h_c
        h_i, w_i = img_gray.shape
        aspect_i = w_i / h_i
        
        # Let's resize img_gray to match the crop height
        new_w = int(h_c * aspect_i)
        resized_img = cv2.resize(img_gray, (new_w, h_c))
        
        # Crop the center of resized_img to match the width of crop
        if new_w >= w_c:
            start_x = (new_w - w_c) // 2
            comp_img = resized_img[:, start_x:start_x+w_c]
        else:
            # Pad comp_img
            comp_img = cv2.copyMakeBorder(resized_img, 0, 0, 0, w_c - new_w, cv2.BORDER_CONSTANT, value=0)
            
        res = cv2.matchTemplate(comp_img, crop_gray, cv2.TM_CCOEFF_NORMED)
        ncc = np.max(res)
        if ncc > best_ncc:
            best_ncc = ncc
            best_file = os.path.basename(f)
            
    return best_file, best_ncc

print("\n--- Card 1 Best Matches ---")
best_file_1, ncc_1 = get_best_match(card1_crop, assets_files)
print(f"Best: {best_file_1} with NCC = {ncc_1:.4f}")

print("\n--- Card 4 Best Matches ---")
best_file_4, ncc_4 = get_best_match(card4_crop, assets_files)
print(f"Best: {best_file_4} with NCC = {ncc_4:.4f}")
