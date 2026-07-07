import os

tasks_dir = '/home/qassim/.gemini/antigravity/brain/d4241217-5b6a-4358-bef7-d5e62406b70e/.system_generated/tasks'
for f in sorted(os.listdir(tasks_dir)):
    if f.endswith('.log') and f not in ['task-69.log', 'task-504.log']: # Skip dev server and the one we read
        p = os.path.join(tasks_dir, f)
        print(f"=== File {f} ===")
        with open(p, 'r') as file:
            lines = file.readlines()
            # print first 5 and last 10 lines
            if len(lines) <= 20:
                print(''.join(lines))
            else:
                print(''.join(lines[:10]))
                print("...")
                print(''.join(lines[-10:]))
        print("=" * 40)
