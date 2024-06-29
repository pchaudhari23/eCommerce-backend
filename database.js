require('dotenv').config()
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const connectToDatabase = (callback) => {
    MongoClient.connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(client => {
        console.log(client);
        callback();
        _db = client.db();
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db
    } 
    throw 'No database found!'
}

exports.connectToDatabase = connectToDatabase;
exports.getDb = getDb;
