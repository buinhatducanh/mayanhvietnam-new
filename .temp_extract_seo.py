import zipfile
import xml.etree.ElementTree as ET
import glob
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

files = glob.glob('D:/MAYANHVIETNAM/DOC/*.docx')
files = [f for f in files if '~$' not in f]
print('Found files:', files)

for fpath in files:
    print('===== FILE:', fpath, '=====')
    try:
        with zipfile.ZipFile(fpath, 'r') as z:
            with z.open('word/document.xml') as file:
                tree = ET.parse(file)
                root = tree.getroot()
                ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
                for p in root.iter(f'{ns}p'):
                    texts = []
                    for t in p.iter(f'{ns}t'):
                        if t.text:
                            texts.append(t.text)
                    line = ''.join(texts)
                    if line.strip():
                        print(line)
    except Exception as e:
        print('Error:', e)
