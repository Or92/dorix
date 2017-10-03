const uploadService = require('../services/upload.service');
const imageService = require('../services/image.service');

const filePath = __dirname + 'uploads/' + req.file.filename;
module.exports = {
  imageUpload: (req, res) => {
let origName = req.file.originalname;

  let extensions = ['.jpeg', '.jpg', '.png'];
return uploadService.uploadS3(filePath, origName, extensions)
.then((data) => {
  return imageService.create( { src: data.Location, name: data.key });
})
.then((image) => {
  res.status(200).json(image);
})
.catch((err) => {
  return new Error('error uploading step video');
})
.finally(() => {
  // clean req temp file
  uploadService.cleanFile(filePath);
});
}
};
