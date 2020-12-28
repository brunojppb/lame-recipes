const config = require('../../config');
const { validatePassword, generateToken, hashPassword, AUTH_HEADER } = require('../../auth');
const { UserSessionRepo } = require('../../repository/userSession');
const { UserRepo } = require('../../repository/user');

/** Queries */

/** Mutations */
async function signUp(root, args) {
  const { name, email, password, passwordConfirmation } = args.input;
  if (password !== passwordConfirmation) {
    throw new Error("Password and password confirmation don't match");
  }

  if (password.length < 8) {
    throw new Error('Password too short. min of 8 characters');
  }

  const { hash, salt } = await hashPassword(password);
  const user = await UserRepo.createUser(name, email, hash, salt);

  return user;
}

async function signIn(root, args, { request }) {
  const { email, password } = args.input;
  const user = await UserRepo.getByEmail(email);
  if (!user) throw new Error('Email not found.');
  const { hashedPassword, salt } = user;
  const isPwValid = await validatePassword(password, hashedPassword, salt);

  if (!isPwValid) throw new Error('Invalid Password');

  const token = await generateToken();
  const oneYearFromNow = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const session = await UserSessionRepo.createSession(
    user.id,
    token,
    oneYearFromNow
  );

  request.res.cookie(AUTH_HEADER, session.token, {
    maxAge: Math.abs(oneYearFromNow - new Date()),
    httpOnly: true,
    secure: config.isHttpsActive,
    sameSite: true,
  });

  return user;
}

async function signOut(root, args, ctx) {
  const token = ctx.request.cookies[AUTH_HEADER];
  if (token) {
    await UserSessionRepo.deleteSession(token)
    ctx.request.res.cookie(AUTH_HEADER, token, {maxAge: 0})
  }
  return true;
}

const resolvers = {
  Mutation: {
    signIn,
    signUp,
    signOut
  },
};

module.exports = resolvers;
