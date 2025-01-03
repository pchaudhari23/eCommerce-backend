const express = require("express");
const Product = require("../models/product");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

//TO-DO: Put the callback functions in a controller file

// CREATE
router.post("/addproduct", async (req, res) => {
  const { name, description, category, price } = req.body;
  const product = new Product(null, name, description, category, price);

  try {
    await product.create();
    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error("Failed to add product: ", error);
    res.status(500).send("Failed to add product");
  }
});

// RETRIEVE ALL
router.get("/products", authenticateToken, async (req, res) => {
  try {
    const product = await Product.fetchAll();
    res.status(200).send(product);
  } catch (error) {
    console.error("Failed to fetch products: ", error);
    res.status(404).send("Failed to fetch products");
  }
});

// RETRIEVE ONE
router.get("/products/:id", async (req, res) => {
  const prodId = req.params.id;
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      return res
        .status(404)
        .send("The product with the given ID was not found.");
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Failed to fetch given product: ", error);
    res.status(404).send("Failed to fetch product");
  }
});

// UPDATE
router.put("/products/:id", async (req, res) => {
  const prodId = req.params.id;
  const { name, description, category, price } = req.body;
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      return res
        .status(404)
        .send("The product with the given ID was not found.");
    }

    const updatedProduct = new Product(
      prodId,
      name,
      description,
      category,
      price
    );

    await updatedProduct.update();
    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.error("Failed to update product: ", error);
    res.status(500).send("Failed to update product");
  }
});

// DELETE
router.delete("/products/:id", async (req, res) => {
  const prodId = req.params.id;
  try {
    await Product.deleteById(prodId);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error("Failed to delete product: ", error);
    res.status(404).send("Product not found");
  }
});

module.exports = router;

// ------------------------------------------------------------------------------------------------------
// // PUT modifies the entire record and PATCH modifies the parts of the record which client sends
// app.patch("/products/:id", function (req, res) {
//   const prodId = req.params.id;

//   Product.findById(prodId)
//     .then((product) => {
//       if (!product) {
//         res.status(404).send("The product with the given ID was not found.");
//       } else {
//         if (req.body) {
//           console.log(req.body);
//           const updatedName = req.body.name;
//           const updatedDesc = req.body.description;
//           const updatedCategory = req.body.category;
//           const updatedPrice = req.body.price;

//           const product = new Product(
//             new ObjectId(prodId),
//             updatedName,
//             updatedDesc,
//             updatedCategory,
//             updatedPrice
//           );

//           product
//             .save()
//             .then((result) => console.log(result))
//             .catch((error) => console.log(error));

//           res.status(201).send("Product updated sucessfully");
//         }
//       }
//     })
//     .catch(() => {
//       res.status(404).send("The product with the given ID was not found.");
//     });
// });
