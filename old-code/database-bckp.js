const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

//TO-DO: Call from .env
const CONNECTION_STRING = "";

const connectToDatabase = (callback) => {
  MongoClient.connect(CONNECTION_STRING)
    .then((client) => {
      console.log(client);
      callback();
      _db = client.db();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.connectToDatabase = connectToDatabase;
exports.getDb = getDb;
