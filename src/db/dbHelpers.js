const mongodb = require("mongodb");
const getDb = require("./database").getDb;

const dbHelpers = {
  createProduct: (product) => {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(product)
      .then((result) => {
        console.log("Product created: ", result);
        return result;
      })
      .catch((error) => {
        console.log("Creation error: ", error);
        throw error;
      });
  },

  updateProduct: (id, updatedProduct) => {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updatedProduct })
      .then((result) => {
        console.log("Product updated: ", result);
        return result;
      })
      .catch((error) => {
        console.log("Update error: ", error);
        throw error;
      });
  },

  findProductById: (id) => {
    const db = getDb();
    if (!mongodb.ObjectId.isValid(id)) {
      return Promise.reject("Invalid ID format");
    }
    return db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((product) => {
        console.log("Product found: ", product);
        return product;
      })
      .catch((error) => {
        console.log("Find error: ", error);
        throw error;
      });
  },

  deleteProductById: (id) => {
    const db = getDb();
    if (!mongodb.ObjectId.isValid(id)) {
      return Promise.reject("Invalid ID format");
    }
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log("Product deleted: ", result);
        return result;
      })
      .catch((error) => {
        console.log("Delete error: ", error);
        throw error;
      });
  },

  fetchAllProducts: () => {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("Products fetched: ", products);
        return products;
      })
      .catch((error) => {
        console.log("Fetch error: ", error);
        throw error;
      });
  },
};

module.exports = dbHelpers;
