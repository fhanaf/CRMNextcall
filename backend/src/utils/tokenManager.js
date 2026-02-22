const jwt = require('jsonwebtoken');

const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY || 'rahasia-dapur-nextcall', { expiresIn: '24h' });
  },
};

module.exports = TokenManager;