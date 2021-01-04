const {createWriteStream, mkdir} = require('fs');
const { promisify } = require('util');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const asyncMkdir = promisify(mkdir)
const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg'
];

/**
 * @typedef {Object} StoredImage
 * @property {String} id - The UUID of the stored image
 * @property {String} fileExtension - The file extension given to the stored file
 */

/**
 * Store image into our file store as jpg
 * @param {ReadableStream} readStream - Readable stream containing the file
 * @param {String} mimetype - The mimetype from the given file stream
 * @return {StoredImage} - The stored image
 * */
async function storeImage(readStream, mimetype) {
  try {
    if (!allowedMimeTypes.includes(mimetype)) {
      return Promise.reject(new Error(`invalid file type: ${mimetype}`))
    }
    await asyncMkdir('uploads', {recursive: true})
    return new Promise((resolve, reject) => {
      const fileId = uuidv4();
      const fileExtension = 'jpg'
      const path = `uploads/${fileId}.${fileExtension}`;
      const writeStream = createWriteStream(path);
      const transformer = sharp()
        .resize(800, undefined, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .withMetadata() // preserve picture metadata.
        .jpeg({
          quality: 70,
          chromaSubsampling: '4:4:4',
          force: true,
        })
      return readStream
        .pipe(transformer)
        .pipe(writeStream)
        .on('finish', () => resolve({id: fileId, fileExtension})) // TODO: Remove file ID dependency and pass in
        .on('error', reject)
    });
  } catch(e) {
    console.error("could not process upload: ", e)
    throw e;

  }
}

module.exports = {
  storeImage
};
