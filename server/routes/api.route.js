const express   =   require('express');
const multer		=   require('multer');
const router    =   express.Router();

const uploadController = require('../controllers/upload.controller');
const imagesController = require('../controllers/images.controller');

const multerParams = {
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }
};

const upload = multer(multerParams);

router.post('/upload', upload.single('image'), uploadController.imageUpload);
router.get('/images', imagesController.get);
router.delete('/images/:id', imagesController.delete);
module.exports = router;
