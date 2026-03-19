const postService = require('../services/post.service');
const feedService = require('../services/feed.service');
const { sendSuccess } = require('../utils/response');

class PostController {
  async create(req, res, next) {
    try {
      const { content, imageUrl } = req.body;
      const post = await postService.createPost(req.user.id, content, imageUrl);
      return sendSuccess(res, post, 'Post created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postService.getPostById(req.params.id);
      return sendSuccess(res, post);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const posts = await postService.getMyPosts(req.user.id);
      return sendSuccess(res, posts);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await postService.deletePost(req.user.id, req.params.id);
      return sendSuccess(res, null, 'Post deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async like(req, res, next) {
    try {
      await postService.likePost(req.user.id, req.params.id);
      return sendSuccess(res, null, 'Post liked successfully');
    } catch (error) {
      next(error);
    }
  }

  async unlike(req, res, next) {
    try {
      await postService.unlikePost(req.user.id, req.params.id);
      return sendSuccess(res, null, 'Post unliked successfully');
    } catch (error) {
      next(error);
    }
  }

  async getLikes(req, res, next) {
    try {
      const post = await postService.getPostById(req.params.id);
      return sendSuccess(res, post.likes);
    } catch (error) {
      next(error);
    }
  }

  async getFeed(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await feedService.getFeed(req.user.id, page, limit);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getNotifications(req, res, next) {
    try {
      const notifications = await feedService.getNotifications(req.user.id);
      return sendSuccess(res, notifications);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
