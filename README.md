# 🥗 ScanBahan - Rekomendasi Masakan Otomatis dari Bahan Makanan

**ScanBahan** adalah aplikasi web berbasis Machine Learning yang dirancang untuk membantu pengguna — khususnya anak kos, ibu rumah tangga, atau siapa pun yang mengalami keterbatasan waktu dan ide dalam memasak — untuk memaksimalkan penggunaan bahan makanan yang tersedia.

> Alih-alih membuang bahan makanan yang masih layak karena bingung ingin dimasak apa, ScanBahan hadir sebagai solusi cerdas untuk mengenali bahan dan merekomendasikan resep praktis nan lezat.

---

## 🧠 Konsep & Solusi

Melalui pendekatan **Design Thinking**, tim kami mengidentifikasi permasalahan umum yang dihadapi masyarakat:
❌ Tidak tahu ingin masak apa.
❌ Bahan seadanya, ide minim.
❌ Banyak bahan akhirnya dibuang.

**Solusi kami:**
📸 Pengguna hanya perlu memindai atau mengunggah gambar bahan makanan.
🧠 Sistem mengenali bahan menggunakan model **image classification**.
🍲 Lalu, sistem mencocokkannya dengan **database resep masakan** untuk menampilkan **rekomendasi menu** yang sesuai.

---

## 🧑‍💻 Teknologi yang Digunakan

| Komponen      | Teknologi                                                       |
| ------------- | --------------------------------------------------------------- |
| Frontend      | React + Vite + TensorFlow\.js                                   |
| Backend Utama | Hapi.js + PostgreSQL                                            |
| Backend ML    | FastAPI + joblib (Model rekomendasi masakan)                    |
| ML Model      | Image Classification (TensorFlow\.js) & Content-Based Filtering |

---

## 🧹 Struktur Proyek

```
scanbahan/
├── client/           # React + Vite + Tensorflow.js
├── server/            # Hapi.js + PostgreSQL
└── ml-server/          # FastAPI + joblib
```

---

## 🛠️ Cara Menjalankan Proyek

### 🔹 1. Jalankan Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 🔹 2. Jalankan Backend (Hapi.js)

```bash
cd backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3000`

### 🔹 3. Jalankan ML Server (FastAPI)

```bash
cd ml-server
pip install -r requirements.txt
uvicorn main:app --reload
```

ML server berjalan di `http://localhost:8000`

> Pastikan `joblib` dan model rekomendasi sudah tersedia di direktori `ml-server/`.

---

## 👥 Anggota Tim (CC25-CF322)

| Role | ID           | Nama                          | Institusi                |
| ---- | ------------ | ----------------------------- | ------------------------ |
| ML   | MC459D5X2115 | Saila Julia                   | Universitas Nusa Putra   |
| ML   | MC129D5X1498 | Marshella Zalia Putri Setyadi | Politeknik Negeri Jember |
| ML   | MC459D5Y0418 | Tri Hadianto                  | Universitas Nusa Putra   |
| FEBE | FC459D5Y1021 | Ahmad Rofiqi                  | Universitas Nusa Putra   |
| FEBE | FC350D5Y0664 | Kurniawan Admajaya            | Universitas Bumigora     |
| FEBE | FC358D5Y0621 | M. Firdaus                    | Universitas Nusa Putra   |

---

## 📬 Kontak

Untuk pertanyaan dan kontribusi, silakan hubungi tim kami melalui GitHub atau email yang tertera di masing-masing profil.
