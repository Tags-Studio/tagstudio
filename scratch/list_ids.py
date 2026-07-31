with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'id: "' in line:
            print(line.strip(), 'at line:', idx+1)
