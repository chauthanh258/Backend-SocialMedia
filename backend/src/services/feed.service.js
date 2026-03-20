const { posts, follows, notifications, users } = require('../mocks/data');

class FeedService {
  async getFeed(userId, page = 1, limit = 10) {
    const followingIds = follows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    
    // Include own posts in feed? User usually does.
    const relevantUserIds = [...followingIds, userId];

    const feedPosts = posts
      .filter(p => relevantUserIds.includes(p.userId))
      .sort((a, b) => b.createdAt - a.createdAt);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedPosts = feedPosts.slice(startIndex, endIndex).map(post => {
      const author = users.find(u => u.id === post.userId);
      return {
        ...post,
        author: author ? { id: author.id, username: author.username, avatar: author.avatar } : null
      };
    });

    return {
      posts: paginatedPosts,
      pagination: {
        total: feedPosts.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(feedPosts.length / limit)
      }
    };
  }

  async getNotifications(userId) {
    return notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
}

module.exports = new FeedService();
