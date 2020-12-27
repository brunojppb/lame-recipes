const File = require('../models/file');

async function createFile(id, mimetype, extension, userId) {
  return File.create({
    id,
    mimetype,
    extension,
    userId,
  });
}

async function getFileForUser(id, userId) {
  return File.findOne({
    where: {
      id,
      userId,
    },
  });
}

async function deleteFile(id) {
  return File.destroy({where: {id}})
}

const FileRepo = {
  createFile,
  getFileForUser,
  deleteFile
};

module.exports = {
  FileRepo,
};
