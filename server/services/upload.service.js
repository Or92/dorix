const aws = require('aws-sdk');
const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const del = require('del');
const app = require('../../server');
const BUCKETNAME = 'pic.demo';
aws.config.loadFromPath('./server/config/s3.json');
aws.config.update({
  signatureVersion: 'v4'
});

const self = module.exports = {

  uploadS3: (filePath, originalName, extensions) => {
    return new Promise((res, rej) => {
      if (!filePath) throw new Error('no file provided to upload service');

      if (extensions.indexOf(path.extname(originalName)) === -1)
        throw new Error('extension is not allowed: ' + originalName);

      fs.readFile(filePath, (err, data) => {
        if (err) return rej(err);

        let base64data = new Buffer(data, 'binary');
        let s3 = new aws.S3();

        s3.upload({
          Bucket: BUCKETNAME,
          Key: Date.now() + originalName,
          Body: base64data,
          ACL: 'public-read'
        }, function (err, data) {
          if (err) return rej(err);

          self.cleanFile(filePath)
            .then(paths => {
              return res(data);
            })
            .catch(err => {
              return rej(err);
            });
        });
      });
    });
  },

  cleanFile: (filePath) => {
    return del([filePath]);
  },

  removeS3: (fileName) => {
    return new Promise((res, rej) => {
      let s3 = new aws.S3();

      let params = {
        Bucket: BUCKETNAME,
        Delete: {
          Objects: [
            {
              Key: fileName
            }
          ],
        },
      };

      s3.deleteObjects(params, function (err, data) {
        if (err) return rej(err);
        else return res(data);
      });
    });
  }
};
