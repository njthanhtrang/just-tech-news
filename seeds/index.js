const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  console.log("attempting to seed user");
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();