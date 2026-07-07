import os
path_dir = '/home/qassim/Downloads/lj_collective/assets'
for f in sorted(os.listdir(path_dir)):
    full_path = os.path.join(path_dir, f)
    if os.path.isfile(full_path):
        print(f'{f}: {os.path.getsize(full_path)} bytes')
