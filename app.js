import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

const MongoStore = require('connect-mongo')(session);

import productRoutes from './api/routes/products';
import cartRoutes from './api/routes/cart';

const app = express();

mongoose.connect('mongodb://localhost:27017/noveoShop', { useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        // ttl: 5 * 60 * 1000 
    }),
    cookie: { maxAge: 5 * 60 * 1000 }
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

        return res.status(200).json({});
    }
    next();
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found 404');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: 'internal server error 500'
        }
    });
});

module.exports = app;
