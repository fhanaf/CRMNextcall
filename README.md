# NextCall - Dashboard Sales Bank

## Deskripsi Proyek

NextCall adalah aplikasi web dashboard untuk tim sales bank yang dirancang untuk mengelola dan melacak interaksi dengan pelanggan potensial. Aplikasi ini terdiri dari tiga komponen utama: backend API (Node.js/Express), frontend web (React/Vite), dan model machine learning untuk analisis data pelanggan.

Proyek ini bertujuan untuk membantu sales representative dalam:
- Melihat daftar pelanggan prioritas tinggi
- Mencatat interaksi dengan pelanggan
- Menganalisis data pelanggan menggunakan model ML
- Mengelola profil dan catatan pribadi

## Fitur Utama

### Frontend (Dashboard Web)
- **Dashboard Utama**: Menampilkan statistik pelanggan, daftar prioritas tinggi, dan catatan pribadi
- **Daftar Pelanggan**: Tabel interaktif dengan fitur pencarian dan filter berdasarkan pekerjaan dan level skor
- **Detail Pelanggan**: Halaman detail untuk setiap pelanggan dengan riwayat interaksi
- **Analytics**: Visualisasi data menggunakan Chart.js dan Recharts
- **Autentikasi**: Sistem login dan signup
- **Pengaturan**: Halaman untuk mengelola preferensi pengguna

### Backend (API Server)
- **Autentikasi**: JWT-based authentication untuk sales representative
- **Manajemen Pelanggan**: CRUD operations untuk data pelanggan
- **Manajemen Sales**: Profil dan catatan pribadi sales
- **Interaksi Pelanggan**: Pencatatan interaksi antara sales dan pelanggan
- **Database**: PostgreSQL untuk penyimpanan data

### Machine Learning
- **Analisis Data Bank**: Model klasifikasi untuk memprediksi kecenderungan pelanggan
- **Preprocessing Data**: Encoding, scaling, dan transformasi fitur
- **Model Training**: Menggunakan algoritma seperti KNN, Random Forest, XGBoost
- **Evaluasi Model**: Metrik akurasi, precision, recall, dan ROC-AUC

## Teknologi yang Digunakan

### Backend
- **Node.js** dengan **Express.js** untuk server API
- **PostgreSQL** sebagai database
- **JWT** untuk autentikasi
- **bcrypt** untuk hashing password
- **Joi** untuk validasi input
- **Morgan** untuk logging HTTP

### Frontend
- **React 18** dengan **Vite** sebagai build tool
- **React Router** untuk routing
- **Chart.js** dan **Recharts** untuk visualisasi data
- **Lucide React** untuk ikon
- **CSS Modules** untuk styling

### Machine Learning
- **Python** dengan libraries:
  - **Pandas**, **NumPy** untuk manipulasi data
  - **Scikit-learn** untuk preprocessing dan modeling
  - **XGBoost** untuk gradient boosting
  - **Optuna** untuk hyperparameter tuning
  - **Matplotlib**, **Seaborn** untuk visualisasi
- **Jupyter Notebook** untuk development

## Struktur Proyek

```
code_final/
├── README.md
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── app.js                 # Entry point server
│   │   ├── config/
│   │   │   └── postgres.js        # Konfigurasi database
│   │   ├── controllers/
│   │   │   ├── authController.js      # Logika autentikasi
│   │   │   ├── customerController.js  # Logika pelanggan
│   │   │   └── salesController.js     # Logika sales
│   │   ├── database/
│   │   │   └── mockData.js        # Data dummy
│   │   ├── exceptions/
│   │   │   ├── AuthenticationError.js
│   │   │   ├── ClientError.js
│   │   │   ├── InvariantError.js
│   │   │   └── NotFoundError.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Routes autentikasi
│   │   │   └── customerRoutes.js   # Routes pelanggan
│   │   ├── services/
│   │   │   ├── authService.js      # Service autentikasi
│   │   │   └── customerService.js  # Service pelanggan
│   │   └── utils/
│   │       └── tokenManager.js     # Utility JWT
│   └── vercel.json
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx                 # Komponen utama
│   │   ├── main.jsx                # Entry point React
│   │   ├── styles.css              # Global styles
│   │   ├── assets/                 # Static assets
│   │   ├── components/
│   │   │   ├── Badge.jsx           # Komponen badge
│   │   │   ├── LoginForm.jsx       # Form login
│   │   │   ├── SignUpForm.jsx      # Form signup
│   │   │   ├── Sidebar.jsx         # Sidebar navigasi
│   │   │   └── TableRow.jsx        # Baris tabel
│   │   └── pages/
│   │       ├── Dashboard.jsx       # Halaman dashboard
│   │       ├── CustomerList.jsx    # Halaman daftar pelanggan
│   │       ├── CustomerDetail.jsx  # Halaman detail pelanggan
│   │       ├── Analytics.jsx       # Halaman analytics
│   │       ├── Login.jsx           # Halaman login
│   │       ├── SignUp.jsx          # Halaman signup
│   │       └── Settings.jsx        # Halaman pengaturan
│   └── vercel.json
└── ML/
    ├── notebook_ Tim_A25-CS069.ipynb  # Notebook ML
    └── README.md
```

## Instalasi dan Setup

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- PostgreSQL
- Python 3.8+ (untuk ML)
- npm atau yarn

### Setup Backend

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables. Buat file `.env` di direktori backend:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret_key
   ```

4. Setup database PostgreSQL dan jalankan migrasi jika ada.

5. Jalankan server development:
   ```bash
   npm run dev
   ```

### Setup Frontend

1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables. Buat file `.env` di direktori frontend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

### Setup Machine Learning

1. Masuk ke direktori ML:
   ```bash
   cd ML
   ```

2. Install dependencies Python (gunakan virtual environment):
   ```bash
   pip install -r requirements.txt
   ```

3. Jalankan notebook:
   ```bash
   jupyter notebook notebook_ Tim_A25-CS069.ipynb
   ```

## Penggunaan

### Mengakses Aplikasi
1. Pastikan backend dan frontend sudah berjalan
2. Buka browser dan akses `http://localhost:5173` (port default Vite)
3. Lakukan login dengan kredensial yang tersedia

### Fitur Dashboard
- **Dashboard**: Lihat statistik dan pelanggan prioritas
- **Customer List**: Cari dan filter pelanggan
- **Customer Detail**: Lihat detail dan tambah interaksi
- **Analytics**: Lihat visualisasi data
- **Settings**: Kelola profil dan catatan

### API Endpoints

#### Autentikasi
- `POST /auth/login` - Login sales representative

#### Pelanggan
- `GET /customers` - Ambil semua pelanggan (dengan filter opsional)
- `GET /customers/:id` - Ambil detail pelanggan
- `POST /customers/:id/interaction` - Tambah interaksi pelanggan

#### Sales
- `GET /sales/profile` - Ambil profil sales
- `PUT /sales/profile` - Update profil sales
- `PUT /sales/notes` - Update catatan sales

## Model Machine Learning

Notebook ML menggunakan dataset bank marketing untuk:
- Menganalisis karakteristik pelanggan
- Memprediksi kecenderungan berlangganan deposito
- Membandingkan performa berbagai algoritma klasifikasi

### Algoritma yang Digunakan
- K-Nearest Neighbors (KNN)
- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost

### Metrik Evaluasi
- Accuracy
- Precision
- Recall
- ROC-AUC Score
- Confusion Matrix

## Deployment

### Backend
- Dapat di-deploy ke Vercel atau platform cloud lainnya
- Konfigurasi di `vercel.json`

### Frontend
- Build production: `npm run build`
- Preview: `npm run preview`
- Deploy ke Vercel atau Netlify

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request


## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi tim development.
