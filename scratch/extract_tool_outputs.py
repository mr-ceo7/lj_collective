import json

log_path = '/home/qassim/.gemini/antigravity/brain/d4241217-5b6a-4358-bef7-d5e62406b70e/.system_generated/logs/transcript.jsonl'
with open(log_path, 'r') as f:
    for line in f:
        try:
            step = json.loads(line)
            step_idx = step.get('step_index')
            if 330 <= step_idx <= 450:
                # If it's a model response or system output
                if step.get('type') == 'RUN_COMMAND' or step.get('type') == 'WRITE_TO_FILE' or step.get('type') == 'USER_INPUT':
                    content = step.get('content', '')
                    if 'SaveClip' in content or 'analyze' in content or 'match' in content:
                        print(f"=== Step {step_idx} ({step.get('type')}) ===")
                        print(content[:1500])
                        print("-" * 50)
        except Exception as e:
            pass
