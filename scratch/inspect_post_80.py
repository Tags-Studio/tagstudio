with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('id: "80"')
if idx != -1:
    print(content[idx:idx+600])
else:
    print("Post ID 80 not found.")
