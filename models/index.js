// Import each Model into index.js file:
const User = require('./User');
const Post = require('./Post');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Export each Model from index.js file:
module.exports = { User, Post };