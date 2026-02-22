const pool = require('../config/postgres');
const NotFoundError = require('../exceptions/NotFoundError');

class CustomerService {
  async getAllCustomers({ q, job, status, level }) { // <--- Pastikan parameter 'level' ada
    let queryText = `
      SELECT 
        id, 
        "Nama" AS name, 
        "age", 
        "job", 
        "marital", 
        "education",
        'Rp -' AS balance, 
        "No HP" AS phone, 
        "prob_yes" * 100 AS score, 
        "contact_status", 
        "last_note",
        "probability_category" AS prediction, -- Kolom Kategori dari DB
        COALESCE("contact_status", 0) AS contacted
      FROM nextcall.nasabah
      WHERE 1=1
    `;

    const queryValues = [];
    let paramCounter = 1;

    // 1. Filter Pencarian
    if (q) {
      queryText += ` AND ("Nama" ILIKE $${paramCounter} OR "job" ILIKE $${paramCounter})`;
      queryValues.push(`%${q}%`);
      paramCounter++;
    }

    // 2. Filter Pekerjaan
    if (job && job !== 'All' && job !== 'Semua Pekerjaan') {
      queryText += ` AND "job" ILIKE $${paramCounter}`;
      queryValues.push(job);
      paramCounter++;
    }

    // 3. Filter Status Pernikahan
    if (status && status !== 'All') {
      queryText += ` AND "marital" ILIKE $${paramCounter}`;
      queryValues.push(status);
      paramCounter++;
    }

    // 4. FILTER SKOR (Mapping UI -> DB)
    // Ini bagian vital agar dropdown bekerja!
    if (level && level !== 'All' && level !== 'Semua Skor') {
      if (level === 'High') {
        queryText += ' AND "probability_category" = \'potensial_besar\'';
      } else if (level === 'Medium') {
        queryText += ' AND "probability_category" = \'potensial_kecil\'';
      } else if (level === 'Low') {
        queryText += ' AND "probability_category" = \'rendah\'';
      }
    }

    // Sorting
    queryText += ' ORDER BY "prob_yes" DESC';

    const result = await pool.query(queryText, queryValues);
    return result.rows;
  }

  async getCustomerById(id) {
    // Kita tambahkan kolom-kolom penting sesuai info Anda
    const query = {
      text: `
        SELECT 
          id, 
          "Nama" AS name, 
          "age", 
          "job", 
          "marital", 
          "education",
          'Rp -' AS balance, 
          "No HP" AS phone, 
          "prob_yes" * 100 AS score, 
          "probability_category" AS prediction,
          COALESCE("contact_status", 0) AS contacted,
          "last_note",
          -- Kolom Tambahan untuk Analisis --
          "poutcome", 
          "campaign",
          "pdays",
          "previous",
          "month",
          "day_of_week",
          "duration",
          "emp.var.rate_cat" AS emp_rate,      -- Ekonomi (Buruk/Stabil/Baik)
          "cons.conf.idx_cat" AS conf_idx,     -- Kepercayaan Konsumen (Pesimis/Optimis)
          "cons_price_category" AS price_idx   -- Inflasi/Harga (Rendah/Tinggi)
        FROM nextcall.nasabah 
        WHERE id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Nasabah tidak ditemukan');
    }

    return result.rows[0];
  }


  async updateContactStatus(id, note) {
    const query = {
      text: `
        UPDATE nextcall.nasabah 
        SET 
          "contact_status" = 1, 
          "last_note" = $2,
          "campaign" = "campaign" + 1 
        WHERE id = $1 
        RETURNING id
      `,
      values: [id, note || ''],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal update status. Id tidak ditemukan');
    }
  }
}

module.exports = new CustomerService();