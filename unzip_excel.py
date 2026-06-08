import zipfile
import os

file_path = "D:/新建文件夹/xwechat_files/wxid_c2ustd1kyqwi21_8d7f/msg/file/2026-04/2026 Fencing Items Review.xlsx"
extract_dir = "extracted_excel"

if not os.path.exists(extract_dir):
    os.makedirs(extract_dir)

with zipfile.ZipFile(file_path, 'r') as zip_ref:
    zip_ref.extractall(extract_dir)
print(f"Extracted to {extract_dir}")
