import Product from '../models/product';
import Cart from '../models/cart';

exports.addToCart = (req, res, next) => {
    let productQty = req.headers.quantity;
    if (!productQty) {
        productQty = 1;
    }
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
    Product
        .findById(productId)
        .select('description price')
        .exec()
        .then(product => {
            cart.add(product, productQty, product.id);

            req.session.cart = cart;

            console.log(req.session.cart);
            res.redirect('/api/products');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/api/products');
        });
};

exports.getAll = (req, res) => {
    const cart = new Cart(req.session.cart);
    res
        .status(200)
        .json({
            products: cart.generateArray(),
            totalPrice: cart.totalPrice,
            totalQty: cart.totalQty
        });
};

exports.deleteOne =  (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/');
};
