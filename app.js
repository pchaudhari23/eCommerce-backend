const express = require('express');
const mongodb = require('mongodb');
const Product = require('./product');
const mongoConnect = require('./database').connectToDatabase;
require('./product')
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

let products = []

const ObjectId = mongodb.ObjectId;

app.get('/', function (req, res) {
    res.send('Start of application !!!');
});

// CREATE
app.post('/addproduct', function (req, res) {
    const product = new Product()

    req.body.product_id = JSON.stringify(Math.floor(Math.random() * 90000 + 10000));
    
    product.id = req.body.product_id;
    product.name = req.body.product_name;
    product.description = req.body.product_description;
    product.category = req.body.product_category;
    product.price = req.body.product_price;

    product.save()
    .then(result => console.log(result))
    .catch(error => console.log(error))
    
    res.status(201).send('Product is added');
});

// RETRIEVE
app.get('/products', function (req, res) {
    Product.fetchAll().then((products) => {
        res.status(200).send(products); 
    }).catch(() => {
        res.status(404).send('Failed to fetch products');
    });
});

app.get('/products/:id', function (req, res) {
    const _id = req.params.id;
    Product.findById(_id).then(() => {
        res.status(200).send('Success');
    }).catch(() => {
        res.status(404).send('The product with the given ID was not found.');
    });
});

// UPDATE

//PUT modifies the entire record
app.put('/products/:id', function (req, res) {
    const product = products.find(p => p.id == parseInt(req.params.id));
  
    if (!product) {
        return res.status(404).send('The product with the given ID was not found.');
    }

    if(req.body) {
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
    }

    res.send(product);
  
});


//PATCH modifies the parts of the record which client sends
app.patch('/products/:id', function (req, res) {
    const product = products.find(p => p.id == parseInt(req.params.id));
  
    if (!product) {
        return res.status(404).send('The product with the given ID was not found.');
    }

    if(req.body) {
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
    }

    res.send(product);
});

//-------------------------------------------------------------------------------------

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('/');
        }
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: editMode,
          product: product
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
  
    const product = new Product(
      updatedTitle,
      updatedPrice,
      updatedDesc,
      updatedImageUrl,
      new ObjectId(prodId)
    );
    product
      .save()
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };
  
//-------------------------------------------------------------------------------------

// DELETE
app.delete('/products/:id', function (req, res) {
    const _id = req.params.id;
    Product.deleteById(_id)
    .then(() => {
        res.status(200).send("Product deleted sucessfully");
    }).catch(() => {
        res.status(404).send('The product with the given ID was not found.');
    })
});

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})