// Use simple arrays for in-memory storage
const users = [];
const posts = [];
const follows = []; // { followerId, followingId }
const likes = [];   // { userId, postId }
const notifications = []; // { userId, type, message, createdAt }

module.exports = {
  users,
  posts,
  follows,
  likes,
  notifications
};
