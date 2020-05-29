#!/bin/sh

echo "[+] Creating 'Packages'..."
dpkg-scanpackages -m ./debs > Packages
echo "[+] Creating 'Packages.bz2' from 'Packages'..."
bzip2 -5fkv Packages > Packages.bz2
echo "[+] Creating 'Packages.xz' from 'Packages'..."
xz -5fkev Packages > Packages.xz
echo "[+] Creating 'Packages.lzma' from 'Packages'..."
xz -5fkev --format=lzma Packages > Packages.lzma
echo "Done."