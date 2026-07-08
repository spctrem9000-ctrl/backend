import os
import re

search_dir = r"D:\Menu\backend\src"

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.ts'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if 'admin@' in content.lower() or 'password' in content.lower():
                        print(f"Found in {path}:")
                        # print context
                        lines = content.split('\n')
                        for i, line in enumerate(lines):
                            if 'admin@' in line.lower() or 'password' in line.lower():
                                print(f"  Line {i+1}: {line.strip()}")
            except Exception as e:
                pass
