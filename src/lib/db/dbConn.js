const mongoose = require('mongoose');
const _config = require('../../config');

mongoose.set('bufferCommands', false);

function connectMongoDB(dbURL) {
  try {
    mongoose.connect(dbURL, {
      useNewUrlParser: true,
      bufferMaxEntries: 0,
      poolSize: 5,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;
    db.on('error', (error) => {
      console.log(`MongoDB connection failed: ${error}`);
    });
    db.once('open', () => {
      console.log('MongoDB connected!');
    });

    return db;
  } catch (error) {
    console.log(`MongoDb connection failed: ${error}`);
  }
}

const mongoInstance = connectMongoDB(_config.dbURL);
module.exports = mongoInstance;
