const { posts, likes, notifications, users } = require('../mocks/data');

class PostService {
  async createPost(userId, content, imageUrl) {
    const newPost = {
      id: `p${Date.now()}`,
      userId,
      content,
      imageUrl: imageUrl || null,
      createdAt: new Date(),
      likesCount: 0
    };

    posts.push(newPost);
    return newPost;
  }

  async getPostById(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) {
      const error = new Error('Post not found');
      error.status = 404;
      throw error;
    }

    const author = users.find(u => u.id === post.userId);
    const postLikes = likes.filter(l => l.postId === postId).map(l => {
      const user = users.find(u => u.id === l.userId);
      return user ? user.username : 'Unknown';
    });

    return {
      ...post,
      author: author ? { id: author.id, username: author.username, avatar: author.avatar } : null,
      likes: postLikes
    };
  }

  async deletePost(userId, postId) {
    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) {
      const error = new Error('Post not found');
      error.status = 404;
      throw error;
    }

    if (posts[index].userId !== userId) {
      const error = new Error('You can only delete your own posts');
      error.status = 403;
      throw error;
    }

    posts.splice(index, 1);
    return { success: true };
  }

  async likePost(userId, postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) {
      const error = new Error('Post not found');
      error.status = 404;
      throw error;
    }

    const alreadyLiked = likes.find(l => l.userId === userId && l.postId === postId);
    if (alreadyLiked) {
      const error = new Error('Post already liked');
      error.status = 400;
      throw error;
    }

    likes.push({ userId, postId });
    
    // Notification logic
    if (post.userId !== userId) {
      const user = users.find(u => u.id === userId);
      notifications.push({
        id: `n${Date.now()}`,
        userId: post.userId,
        type: 'LIKE',
        message: `${user.username} liked your post`,
        createdAt: new Date()
      });
    }

    return { success: true };
  }

  async unlikePost(userId, postId) {
    const index = likes.findIndex(l => l.userId === userId && l.postId === postId);
    if (index === -1) {
      const error = new Error('Post not liked');
      error.status = 400;
      throw error;
    }

    likes.splice(index, 1);
    return { success: true };
  }

  async getMyPosts(userId) {
    return posts
      .filter(p => p.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
}

module.exports = new PostService();
