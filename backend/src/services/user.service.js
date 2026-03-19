const { users, follows } = require('../mocks/data');

class UserService {
  async getProfile(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const { password, ...userWithoutPassword } = user;
    
    // Add stats
    const followersCount = follows.filter(f => f.followingId === userId).length;
    const followingCount = follows.filter(f => f.followerId === userId).length;

    return {
      ...userWithoutPassword,
      stats: { followersCount, followingCount }
    };
  }

  async followUser(followerId, followingId) {
    if (followerId === followingId) {
      const error = new Error('You cannot follow yourself');
      error.status = 400;
      throw error;
    }

    const targetUser = users.find(u => u.id === followingId);
    if (!targetUser) {
      const error = new Error('Target user not found');
      error.status = 404;
      throw error;
    }

    const alreadyFollowing = follows.find(f => f.followerId === followerId && f.followingId === followingId);
    if (alreadyFollowing) {
      const error = new Error('Already following this user');
      error.status = 400;
      throw error;
    }

    follows.push({ followerId, followingId });
    return { success: true };
  }

  async unfollowUser(followerId, followingId) {
    const index = follows.findIndex(f => f.followerId === followerId && f.followingId === followingId);
    if (index === -1) {
      const error = new Error('Not following this user');
      error.status = 400;
      throw error;
    }

    follows.splice(index, 1);
    return { success: true };
  }

  async getFollowers(userId) {
    const followerIds = follows.filter(f => f.followingId === userId).map(f => f.followerId);
    return users
      .filter(u => followerIds.includes(u.id))
      .map(({ password, ...u }) => u);
  }

  async getFollowing(userId) {
    const followingIds = follows.filter(f => f.followerId === userId).map(f => f.followingId);
    return users
      .filter(u => followingIds.includes(u.id))
      .map(({ password, ...u }) => u);
  }
}

module.exports = new UserService();
