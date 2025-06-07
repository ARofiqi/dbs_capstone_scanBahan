#!/bin/bash

# Script untuk melakukan migrasi ulang Prisma
# Pastikan Anda sudah menginstall Prisma CLI secara global

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Memulai proses migrasi ulang Prisma...${NC}"

# 1. Hapus semua migrasi yang ada (opsional)
echo -e "${YELLOW}Menghapus folder migrasi lama...${NC}"
rm -rf prisma/migrations
echo -e "${GREEN}Folder migrasi lama telah dihapus.${NC}"

# 2. Reset database (hati-hati, ini akan menghapus semua data)
echo -e "${YELLOW}Mereset database...${NC}"
npx prisma migrate reset --force
echo -e "${GREEN}Database telah direset.${NC}"

# 3. Buat migrasi baru
echo -e "${YELLOW}Membuat migrasi baru...${NC}"
npx prisma migrate dev --name init
echo -e "${GREEN}Migrasi baru telah dibuat.${NC}"

# 4. Generate client Prisma
echo -e "${YELLOW}Generate client Prisma...${NC}"
npx prisma generate
echo -e "${GREEN}Client Prisma telah di-generate.${NC}"

echo -e "${GREEN}Proses migrasi ulang Prisma selesai!${NC}"