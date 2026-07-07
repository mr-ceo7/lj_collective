import json

log_path = '/home/qassim/.gemini/antigravity/brain/d4241217-5b6a-4358-bef7-d5e62406b70e/.system_generated/logs/transcript.jsonl'
with open(log_path, 'r') as f:
    for line in f:
        try:
            step = json.loads(line)
            step_idx = step.get('step_index')
            content = step.get('content', '')
            
            # Print if it has thinking text describing the images
            if step.get('type') == 'PLANNER_RESPONSE' and step_idx >= 300:
                if 'SaveClip.App_' in content or 'gown' in content or 'match' in content:
                    print(f"=== Step {step_idx} Planner Response ===")
                    print(content)
                    
            # Check tool_calls or status/outputs
            if step.get('tool_calls'):
                for tc in step['tool_calls']:
                    args = tc.get('args', {})
                    if 'analyze_assets.py' in str(args) or 'match_crops' in str(args):
                        print(f"=== Step {step_idx} Tool Call: {tc['name']} ===")
                        print(json.dumps(args, indent=2))
                        
            # If it's a tool output with matching results
            if step.get('type') == 'RUN_COMMAND' and step_idx >= 300:
                if 'NCC' in content or 'Correlation' in content or 'SaveClip' in content:
                    print(f"=== Step {step_idx} Tool Output ===")
                    print(content[:500])
        except Exception as e:
            pass
