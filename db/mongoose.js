const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(encodeURI(process.env.MONGO_URL), {
  useMongoClient: true
})
  .then(function (db) {
    console.log('Connection established');
  })
  .catch((err) => { console.log(err); });

module.exports = { mongoose };