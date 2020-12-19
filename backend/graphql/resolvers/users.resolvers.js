const { UsersRepo } = require('../../repository/user');

/** Queries */
async function getMe(root, _, ctx) {
  return ctx.user;
}

const resolvers = {
  Query: {
    getMe,
  },
};

module.exports = resolvers;
