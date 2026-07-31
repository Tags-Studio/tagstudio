with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'id: "2"' in line:
            print('ID 2 starts:', idx+1)
        if 'id: "3"' in line:
            print('ID 3 starts:', idx+1)
