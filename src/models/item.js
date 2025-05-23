// File: models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },       // Common for both lost and found
    ownerEmail: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String },                       // Can be handled by Multer
    itemSerial: { type: String },
    descrption: {type: String},
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    }
});

module.exports = mongoose.model('Item', ItemSchema);
