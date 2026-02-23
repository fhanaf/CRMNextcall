const pool = require('../config/postgres');

// 1. Ambil Profil
const getProfile = async (req, res, next) => {
  try {
    const id = req.query.id || 1;
    const result = await pool.query('SELECT id, name, email, daily_target, notes FROM nextcall.sales WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      res.json({ status: 'success', data: result.rows[0] });
    } else {
      res.status(404).json({ status: 'fail', message: 'Sales not found' });
    }
  } catch (error) {
    next(error);
  }
};

// 2. Update Profil (Nama, Email, Target)
const updateProfile = async (req, res, next) => {
  try {
    const { id, name, email, } = req.body;
    await pool.query(
      'UPDATE nextcall.sales SET name=$1, email=$2, daily_target=$3 WHERE id=$4',
      [name, email, id]
    );
    res.json({ status: 'success', message: 'Profil diperbarui' });
  } catch (error) {
    next(error);
  }
};

// 3. FITUR BARU: Update Notes Saja
const updateNotes = async (req, res, next) => {
  try {
    const { id, notes } = req.body;
    await pool.query('UPDATE nextcall.sales SET notes=$1 WHERE id=$2', [notes, id]);
    res.json({ status: 'success', message: 'Catatan disimpan' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, updateNotes };