const express = require('express');
const Product = require('./product');
const mongoConnect = require('./database').connectToDatabase;
require('./product')
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

let products = []

app.get('/', function (req, res) {
    res.send('Start of application !!!');
});

// CREATE
// app.post('/addproduct', function (req, res) {
//     const product = {}

//     req.body.id = JSON.stringify(Math.floor(Math.random() * 90000 + 10000));
//     req.body.dateAdded = Date.now();
    
//     product.id = req.body.id;
//     product.name = req.body.name;
//     product.description = req.body.description;
//     product.category = req.body.category;
//     product.dateAdded = req.body.dateAdded;
//     product.price = req.body.price;

//     products.push(product);

//     res.status(201).send('Product is added');
// });



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
    res.status(200).send(products); 
});

app.get('/products/:id', function (req, res) {
    const _id = req.params.id
    const matched = products.find((product)=> product.id == _id )
    if(matched) {
        res.status(200).send(matched);
    }
    else {
        res.status(404).send('The product with the given ID was not found.');
    }
});

// UPDATE
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

// DELETE
app.delete('/products/:id', function (req, res) {
    const _id = req.params.id
    const matched = products.find((product)=> product.id == _id );
    products.splice(products.indexOf(matched), 1);
    if(matched) {
        res.status(200).send("Product deleted sucessfully");
    }
    else {
        res.status(404).send('The product with the given ID was not found.');
    }
});

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})