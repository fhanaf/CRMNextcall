const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.error('Koneksi Database GAGAL:', err.message);
  } else {
    console.log('Koneksi Database ke Supabase BERHASIL! 🚀');
  }
});

module.exports = pool;