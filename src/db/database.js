require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const connectToDatabase = async (callback) => {
  try {
    const client = await MongoClient.connect(process.env.CONNECTION_STRING);
    console.log(client);
    console.log("Connected to MongoDB");
    _db = client.db();
    callback();
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    process.exit(1); // Exit the application if connection fails
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.connectToDatabase = connectToDatabase;
exports.getDb = getDb;
