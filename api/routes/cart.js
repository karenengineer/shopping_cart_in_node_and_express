import express from 'express';
import CartController from '../controllers/cart';

const router = express.Router();

router.post('/:id', CartController.addToCart );

router.get('/', CartController.getAll);

router.delete('/:id', CartController.deleteOne);

module.exports = router;
