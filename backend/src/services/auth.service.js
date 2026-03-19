const { users } = require('../mocks/data');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');

class AuthService {
  async register(username, password, displayName) {
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      const error = new Error('Username already exists');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: `u${Date.now()}`,
      username,
      password: hashedPassword,
      displayName: displayName || username,
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      createdAt: new Date()
    };

    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(username, password) {
    const user = users.find(u => u.username === username);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = signToken({ id: user.id, username: user.username });
    return { token };
  }
}

module.exports = new AuthService();
