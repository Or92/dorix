const uploadService = require('../services/upload.service');
const imageService = require('../services/image.service');

module.exports = {
  get: (req, res) => {
  return imageService.retrieve()
    .then((images) => res.status(200).json(images))
    .catch(err => res.send(err));
},
  delete: (req, res) =>{
    const name = req.params.id;
  return imageService.delete({name})
    .then(() => res.status(200).json({success: true}))
    .catch(err => res.send(err));
}
};
