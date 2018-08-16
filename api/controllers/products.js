import mongoose from 'mongoose';
import Product from '../models/product';

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('description price')
        .exec()
        .then(docs => {
            const response = {
                data: docs.map(doc => {
                    return {
                        description: doc.description,
                        price: doc.price,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'internal server error 500'
            });
        });
};

exports.products_create_product = (req, res, next) => {
    const product  = new Product({
        _id: new mongoose.Types.ObjectId(),
        description: req.body.description,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Продукт создан',
            createdProduct: {
                description: result.description,
                price: result.price,
                _id: result._id,
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'internal server error 500'
        });
    });
};

exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('description price')
        .exec()
        .then(doc => {
            console.log('From db', doc);
            if (doc) {
                res.status(200).json({
                    product: doc
                });
            } else {
                res
                .status(404)
                .json({ message: 'Такого продукта нет в системе' });
            }
        })
        .catch(err => {
            console.log(err);
            res
            .status(500)
            .json({ message: 'internal server error 500' });
        });
};

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product
        .update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Продукт обновлен'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'internal server error 500'
            });
        });
};

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Продукт удален',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'internal server error 500'
            });
        });
};
