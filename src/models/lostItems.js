const mongoose = require("mongoose");

// Lost Item Model
const lostItemModel = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
        },
    lostName: {
        type: String,
        required: true,
    },
    lostEmail: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
    },
    itemSerialNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    dateLost: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['lost', 'claimed'],
        default: 'lost',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, { timestamps: true });
const LostItem = mongoose.model("LostItem", lostItemModel);
module.exports = LostItem;
