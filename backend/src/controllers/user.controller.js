const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/response');

class UserController {
  async getMe(req, res, next) {
    try {
      const profile = await userService.getProfile(req.user.id);
      return sendSuccess(res, profile);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await userService.getProfile(req.params.id);
      return sendSuccess(res, profile);
    } catch (error) {
      next(error);
    }
  }

  async follow(req, res, next) {
    try {
      await userService.followUser(req.user.id, req.params.id);
      return sendSuccess(res, null, 'Followed successfully');
    } catch (error) {
      next(error);
    }
  }

  async unfollow(req, res, next) {
    try {
      await userService.unfollowUser(req.user.id, req.params.id);
      return sendSuccess(res, null, 'Unfollowed successfully');
    } catch (error) {
      next(error);
    }
  }

  async getFollowers(req, res, next) {
    try {
      const followers = await userService.getFollowers(req.params.id);
      return sendSuccess(res, followers);
    } catch (error) {
      next(error);
    }
  }

  async getFollowing(req, res, next) {
    try {
      const following = await userService.getFollowing(req.params.id);
      return sendSuccess(res, following);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
