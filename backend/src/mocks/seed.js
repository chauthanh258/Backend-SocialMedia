const { users, posts, follows } = require('./data');
const { hashPassword } = require('../utils/hash');

const seedData = async () => {
  if (users.length > 0) return;

  const demoPassword = await hashPassword('password123');

  // Seed Users
  for (let i = 1; i <= 5; i++) {
    users.push({
      id: `u${i}`,
      username: `user${i}`,
      password: demoPassword,
      displayName: `User Number ${i}`,
      bio: `I am user ${i}`,
      avatar: `https://i.pravatar.cc/150?u=user${i}`
    });
  }

  // Seed Posts
  posts.push({
    id: 'p1',
    userId: 'u1',
    content: 'Hello world, this is my first post!',
    createdAt: new Date(Date.now() - 1000000)
  });
  posts.push({
    id: 'p2',
    userId: 'u2',
    content: 'Exciting news! Just started learning Express.',
    createdAt: new Date(Date.now() - 500000)
  });

  // Seed Follows (u1 follows u2)
  follows.push({ followerId: 'u1', followingId: 'u2' });
};

module.exports = seedData;
