const { validatePassword, generateToken, hashPassword } = require('../../auth');

const { UserSessionRepo } = require('../../repository/userSession');
const { UserRepo } = require('../../repository/user');

/** Queries */

/** Mutations */
async function signup(root, args) {
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

async function signin(root, args, { req }) {
  const { email, password } = args.input;
  const user = await UserRepo.getByEmail(email);
  if (!user) throw new Error('Email not found.');
  const { hashedPassword, salt } = user;
  const isPwValid = await validatePassword(password, hashedPassword, salt);

  if (!isPwValid) throw new Error('Invalid Password');

  const token = await generateToken();
  const { id, name } = user;
  const oneYearFromNow = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const session = await UserSessionRepo.createSession(
    id,
    token,
    oneYearFromNow
  );

  req.res.cookie('recipe-auth-token', session.token, {
    maxAge: Math.abs(oneYearFromNow - new Date()),
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: false,
  });

  return {
    name,
    email,
  };
}

const resolvers = {
  Mutation: {
    signin,
    signup,
  },
};

module.exports = resolvers;
