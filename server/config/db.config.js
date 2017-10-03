const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = {
  connect: (server) => {
mongoose.Promise = bluebird;

mongoose.connect('mongodb://localhost:27017/images', { useMongoClient: true })
  .then(
    () => {
  console.log('Connected to MongoDB...');
},
err => {
  console.log(err);
      server.close();
}
);
}
};
