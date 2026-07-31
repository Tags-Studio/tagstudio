import os

for root, dirs, files in os.walk('.'):
    # Exclude directories
    if any(p in root for p in ['.git', '.next', 'node_modules', 'scratch', '.gemini']):
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md')):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'mozahran' in content:
                    print(f"Found 'mozahran' in: {filepath}")
            except Exception as e:
                pass
