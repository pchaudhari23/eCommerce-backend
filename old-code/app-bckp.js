const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const Product = require("./product-bckp");
const mongoConnect = require("./database-bckp").connectToDatabase;
require("./product-bckp");

const app = express();
const port = process.env.PORT || 8000;
const FRONTEND_URL = "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json());

const ObjectId = mongodb.ObjectId;

app.get("/", function (req, res) {
  res.send("Start of application !!!");
});

// CREATE
app.post("/addproduct", function (req, res) {
  const product = new Product();

  // req.body.product_id = JSON.stringify(Math.floor(Math.random() * 90000 + 10000));
  // product.id = req.body.product_id;

  product.product_name = req.body.product_name;
  product.product_description = req.body.product_description;
  product.product_category = req.body.product_category;
  product.product_price = req.body.product_price;

  product
    .save()
    .then((result) => console.log("RES:", result))
    .catch((error) => console.log("ERR:", error));

  res.status(201).send("Product is added");
});

// RETRIEVE
app.get("/products", function (req, res) {
  Product.fetchAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch(() => {
      res.status(404).send("Failed to fetch products");
    });
});

app.get("/products/:id", function (req, res) {
  const _id = req.params.id;
  Product.findById(_id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(() => {
      res.status(404).send("The product with the given ID was not found.");
    });
});

// UPDATE
app.put("/products/:id", function (req, res) {
  debugger;
  const prodId = req.params.id;

  console.clear();
  console.log(prodId);
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.status(404).send("The product with the given ID was not found.");
      } else {
        if (req.body) {
          const updatedName = req.body.product_name;
          const updatedDesc = req.body.product_description;
          const updatedCategory = req.body.product_category;
          const updatedPrice = req.body.product_price;

          const product = new Product(
            new ObjectId(prodId),
            updatedName,
            updatedDesc,
            updatedCategory,
            updatedPrice
          );

          product
            .save()
            .then((result) => console.log(result))
            .catch((error) => console.log(error));

          res.status(201).send("Product updated sucessfully");
        }
      }
    })
    .catch(() => {
      res.status(404).send("The product with the given ID was not found.");
    });
});

// DELETE
app.delete("/products/:id", function (req, res) {
  const _id = req.params.id;
  Product.deleteById(_id)
    .then(() => {
      res.status(200).send("Product deleted sucessfully");
    })
    .catch(() => {
      res.status(404).send("The product with the given ID was not found.");
    });
});

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

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
//           const updatedName = req.body.product_name;
//           const updatedDesc = req.body.product_description;
//           const updatedCategory = req.body.product_category;
//           const updatedPrice = req.body.product_price;

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
