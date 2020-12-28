const {storeImage} = require('../../services/fileStore');
const {FileRepo} = require('../../repository/files');

/** Mutations */
async function uploadImage(root, {file}, {user}) {
  try {
    const { createReadStream, mimetype } = await file;
    const readStream = createReadStream()
    const {id, fileExtension} = await storeImage(readStream, mimetype)
    return await FileRepo.createFile(id, mimetype, fileExtension, user.id)
  } catch(e) {
    console.error("Could not upload image", e)
    return Promise.reject(e)
  }
}

const resolvers = {
  Mutation: {
    uploadImage,
  },
};

module.exports = resolvers;
