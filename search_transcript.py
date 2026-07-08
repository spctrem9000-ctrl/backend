import json
import re

transcript_path = r"C:\Users\NCR\.gemini\antigravity\brain\47baa8a4-2a0e-4ab4-b37f-d92bbc797dc6\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        if 'admin@' in line.lower() or 'password' in line.lower() or 'email' in line.lower():
            try:
                entry = json.loads(line)
                if entry.get('type') == 'USER_INPUT':
                    print("USER:", entry.get('content'))
                elif entry.get('type') == 'PLANNER_RESPONSE':
                    content = entry.get('content', '')
                    if content and ('admin@' in content.lower() or 'password' in content.lower()):
                        print("AGENT:", content[:200], "...")
                elif 'tool_calls' in entry:
                    for tc in entry['tool_calls']:
                        if tc.get('name') == 'write_to_file':
                            code = tc.get('args', {}).get('CodeContent', '')
                            # find emails
                            emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', code)
                            if emails:
                                print("Found emails in file:", tc.get('args', {}).get('TargetFile'), emails)
            except:
                pass
