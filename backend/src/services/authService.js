const bcrypt = require('bcrypt');
const pool = require('../config/postgres');
const AuthenticationError = require('../exceptions/AuthenticationError');

class AuthService {
  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password, name FROM nextcall.sales WHERE email = $1',
      values: [email],
    };
    const result = await pool.query(query);

    if (!result.rows.length) throw new AuthenticationError('Kredensial salah');

    const { id, password: hashedPassword, name } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) throw new AuthenticationError('Kredensial salah');

    return { id, name };
  }

  // --- FUNGSI SEED (SEMENTARA) ---
  async seedSales() {
    const passwordHash = await bcrypt.hash('123456', 10);

    const users = [
      ['Eka Pradana', 'sales1@nextcall.id', 'Senior Sales', 20],
      ['Budi Santoso', 'sales2@nextcall.id', 'Sales Officer', 15],
      ['Siti Aminah', 'sales3@nextcall.id', 'Sales Officer', 15]
    ];

    for (const user of users) {
      await pool.query(
        `INSERT INTO nextcall.sales (name, email, password, role, daily_target) 
         VALUES ($1, $2, '${passwordHash}', $3, $4)`,
        user
      );
    }

    return 'SUKSES: 3 Akun Sales dibuat. Password semuanya: 123456';
  }
}

module.exports = new AuthService();