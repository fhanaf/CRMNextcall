const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// router.get('/seed', authController.seed); // DINONAKTIFKAN - hanya untuk setup awal

module.exports = router;