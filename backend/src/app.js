const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import Routes
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const salesController = require('./controllers/salesController');

const ClientError = require('./exceptions/ClientError');

const app = express();

// 1. UPDATE CORS: Agar Frontend di Vercel bisa akses Backend ini
app.use(cors({
  origin: '*', // Izinkan semua domain (Untuk tahap awal biar tidak pusing)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

// Routes Sales
app.get('/sales/profile', salesController.getProfile);
app.put('/sales/profile', salesController.updateProfile);
app.put('/sales/notes', salesController.updateNotes);

// PENTING: Anda sebelumnya memakai endpoint ini di frontend (/sales/progress).
// Pastikan function 'getProgress' ada di salesController.js Anda.
// Jika belum ada, Anda bisa comment baris ini dulu agar tidak error.
// app.get('/sales/progress', salesController.getProgress);

// Root Endpoint (Cek Server)
app.get('/', (req, res) => {
  res.send('Server Sales Bank Dashboard is Running! 🚀');
});

// Routes Lain
app.use('/customers', customerRoutes);
app.use('/auth', authRoutes);

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server kami',
  });
});

// 2. MODIFIKASI LISTEN & EXPORT (Wajib untuk Vercel)
// Vercel menjalankan server secara serverless, jadi tidak butuh app.listen terus menerus.
// Kode ini artinya: "Kalau dijalankan manual (node app.js), pakai port. Kalau di Vercel, jangan."
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
  });
}

// 3. EXPORT APP
module.exports = app;