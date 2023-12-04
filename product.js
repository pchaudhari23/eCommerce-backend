const mongodb = require('mongodb');
const getDb = require('./database').getDb

class Product {
    constructor(id, name, description, category, price ) {
        this._id = new mongodb.ObjectId(id);
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
    }

    save() {
        const db = getDb();
        let dbOp;
        if(this._id) {
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('products').insertOne(this);
        }

        return dbOp
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products); 
                return products
            })
            .catch(error => console.log(error))
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({_id: new mongodb.ObjectId(prodId)})
            .next()
            .then(product => {
                console.log(product); 
                return product
            })
            .catch(error => console.log(error))
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({_id: new mongodb.ObjectId(prodId)})
            .then(result => {
                console.log(result);
            })
            .catch(error => console.log(error))
    }
}

module.exports = Product;