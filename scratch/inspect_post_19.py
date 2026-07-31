with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('id: "19"')
if idx != -1:
    print(content[idx:idx+350])
else:
    print("Post ID 19 not found.")
