const Product = require('../db/models/Products');
const mongoose = require('mongoose');
exports.ADD_PRODUCT = (req, res, next) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        price: req.body.price,
        productImage: req.file.path,
    })

    newProduct.save()
    .then(product => {
        res.status(200).json({ success: true, message: 'Product Created Sccessfully', data: product})
    })
    .catch(err => {
        res.status(401).json({success: false, Error: 'Product Creating error:', err})
    }) 
}

exports.GET_ALL_PRODUCTS = (req, res, next) => {
    Product.find()
    .exec()
    .then(products => {
        if(products.length < 0) {
            res.status(402).json({success: false, Error: 'Product not found'})
        } 
        res.status(200).json({success: true, data: products})
    })
}

exports.GET_ONE_PRODUCT = (req, res, next) => {
Product.findById({_id: req.params.productId})
.exec()
.then(product => {
    if(!product) {
       return res.status(404).json({success: false, Error: 'Product not found for this id'})
    }
   res.status(200).json({ success: true, data: product }) 
}) 
}

exports.UPDATE_PRODUCT = (req, res, next) => {
    Product.findByIdAndUpdate({_id: req.params.productId}, {$set: {
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        price: req.body.price,
        productImage: req.file.path 
    }})
    .exec()
    .then(product => {
        if(!product) {
            res.status(404).json({success: false, Error: 'Product not found for this id'})
        }
        res.status(200).json({
            success: true, 
            message: 'Product updated successfully',
            body: {
             method: 'PATCH',
             URL: `http://localhost:5000/${product._id}`,
             data: product
            }
        })
    })
    .catch(err => {
        console.log('Product update Error: ', err )
    })
}

exports.DELETE_PRODUCT = (req, res, next) => {
    Product.findByIdAndRemove({_id: req.params.productId})
    .exec()
    .then(delProdcut => {
        if(!delProdcut) {
            res.status(404).json({success: false, message: 'Product not found for this Id'})
        }
        res.status(200).json({success: true, message: 'Product deleted successfully', data: delProdcut})
    }) 
}