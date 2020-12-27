const {createWriteStream, mkdir} = require('fs');
const { promisify } = require('util');
const { v4: uuidv4 } = require('uuid');

const {FileRepo} = require('../../repository/files');

const asyncMkdir = promisify(mkdir)

/** Queries */
async function uploadImage(root, {file}, {user}) {
  try {
    await asyncMkdir('uploads', {recursive: true})
    return await processUpload(file, user.id);
  } catch(e) {
    console.error("Could not upload image", e)
    return Promise.reject(e)
  }
}

const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg'
];

async function processUpload(upload, userId) {
  try {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    if (!allowedMimeTypes.includes(mimetype)) {
      return Promise.reject(new Error('invalid file type'))
    }
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const fileExtensionComponents = filename.split('.');
      const fileExtension = fileExtensionComponents[fileExtensionComponents.length - 1];
      const path = `uploads/${id}.${fileExtension}`;
      const writeStream = createWriteStream(path);
      return stream
        .pipe(writeStream)
        .on('finish', async () => {
          const file = await FileRepo.createFile(id, mimetype, fileExtension, userId)
          return resolve(file)
        })
        .on('error', reject)
    });
  } catch(e) {
    console.error("could not process upload: ", e)
    return Promise.reject(e)

  }
}

const resolvers = {
  Mutation: {
    uploadImage,
  },
};

module.exports = resolvers;
