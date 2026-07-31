import os

for root, dirs, files in os.walk('.'):
    if any(p in root for p in ['.git', '.next', 'node_modules', 'scratch', '.gemini']):
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.html')):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'canonical' in content or 'Canonical' in content:
                    print(f"Found 'canonical' in: {filepath}")
            except Exception:
                pass
