const { promisify } = require('util');
const crypto = require('crypto');
const { genSalt, hash } = require('bcrypt');

const { UserSessionRepo } = require('../repository/userSession');
const { UserRepo } = require('../repository/user');

const generateSalt = promisify(genSalt);
const generateHash = promisify(hash);
const randomBytes = promisify(crypto.randomBytes);

/**
 * Validate the given password against its salted hash
 * @param {String} password - The plain user password
 * @param {String} hashedPassword - The hashed password previously generated
 * @param {String} salt - The generated salt used on the given hashed password
 * @return {Boolean}
 * */
async function validatePassword(password, hashedPassword, salt) {
  try {
    const hashedPwResult = await generateHash(password, salt);
    return hashedPassword === hashedPwResult;
  } catch (e) {
    console.error('Could not compute hash', e);
    return false;
  }
}

/**
 * @typedef {Object} HashedPassword
 * @property {String} hash - The hashed password
 * @property {String} salt - The salt used to pepper the generated hash
 *
 * Validate the given password against its salted hash
 * @param {String} password - The plain user password to be hashed
 * @return {HashedPassword}
 * */
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await generateSalt(saltRounds);
    const hashedPw = await generateHash(password, salt);
    return {
      hash: hashedPw,
      salt,
    };
  } catch (e) {
    console.error('could not hash plain password', e);
    return {};
  }
}

/**
 * Generates a pseudo-random 250-length token
 * @return {String} The generated token
 * */
async function generateToken() {
  const bytes = await randomBytes(100);
  return bytes.toString('base64').replace(/\W/g, '');
}

async function getUserFromSession(token) {
  const session = await UserSessionRepo.getValidSession(token);
  if (!session) return null;
  return UserRepo.getById(session.userId);
}

module.exports = {
  validatePassword,
  hashPassword,
  generateToken,
  getUserFromSession,
};
