const mongodb = require("mongodb");
const getDb = require("./database-bckp").getDb;

class Product {
  constructor(
    _id,
    product_name,
    product_description,
    product_category,
    product_price
  ) {
    this._id = _id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_category = product_category;
    this.product_price = product_price;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((error) => console.log(error));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((error) => console.log(error));
  }

  static deleteById(prodId) {
    console.log(prodId);
    console.log({ id: new mongodb.ObjectId(prodId) });
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }
}

module.exports = Product;
