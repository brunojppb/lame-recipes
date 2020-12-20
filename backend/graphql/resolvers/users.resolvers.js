
/** Queries */
async function getMe(root, _, ctx) {
  return ctx.req.user;
}

const resolvers = {
  Query: {
    getMe,
  },
};

module.exports = resolvers;
