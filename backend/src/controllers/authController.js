const authService = require('../services/authService');
const TokenManager = require('../utils/tokenManager');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { id, name } = await authService.verifyUserCredential(email, password);
    const accessToken = TokenManager.generateAccessToken({ id, email });

    res.status(200).json({
      status: 'success',
      data: { accessToken, user: { id, name, email } },
    });
  } catch (error) {
    next(error);
  }
};

// Controller Sementara
const seed = async (req, res, next) => {
  try {
    const message = await authService.seedSales();
    res.send(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, seed };