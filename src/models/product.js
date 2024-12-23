const mongodb = require("mongodb");
const dbHelpers = require("../db/dbHelpers");

// TO-DO: Add mongoose schema validation

class Product {
  constructor(_id, name, description, category, price) {
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
  }

  create() {
    return dbHelpers.createProduct(this);
  }

  update() {
    if (!this._id) {
      throw new Error("Cannot update a product without an ID.");
    }
    return dbHelpers.updateProduct(this._id.toString(), this);
  }

  static fetchAll() {
    return dbHelpers.fetchAllProducts();
  }

  static findById(prodId) {
    return dbHelpers.findProductById(prodId);
  }

  static deleteById(prodId) {
    return dbHelpers.deleteProductById(prodId);
  }
}

module.exports = Product;
