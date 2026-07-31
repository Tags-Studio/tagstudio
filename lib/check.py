import re
file_path = r'c:\Users\zahran\Documents\GitHub\tagstudio\lib\blogData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('id: "33"')
if idx != -1:
    end_idx = content.find('id: "34"', idx)
    if end_idx == -1:
        end_idx = len(content)
    print(content[end_idx-200:end_idx])
