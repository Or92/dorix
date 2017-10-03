const Image = require('../models/image.model');
const uploadService = require('./upload.service');

module.exports = {
  create: (params) => {
    let image = new Image(params);
    return image.save();
},
delete: (params) => {
  return uploadService.removeS3(params.name)
    .then(() => Image.remove(params));
},
  retrieve: () => {
    return Image.find({});
  }
};
