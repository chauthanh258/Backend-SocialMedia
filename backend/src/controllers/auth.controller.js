const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, displayName } = req.body;
      console.log(req.body);
      const user = await authService.register(username, password, displayName);
      return sendSuccess(res, user, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      return sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
