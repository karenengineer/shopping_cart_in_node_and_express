import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: { type: Number, required: true },
    description: { type: String, required: true } 
});

module.exports = mongoose.model('Product', productSchema);
