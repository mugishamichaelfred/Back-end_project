
const mongoose = require("mongoose");

const foundItemModel = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
        },
    foundName: {
        type: String,
        required: true,
    },
    foundEmail: {
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
    dateFound: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['found', 'claimed'],
        default: 'found',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, { timestamps: true });
const FoundItem = mongoose.model("FoundItem", foundItemModel);
module.exports = FoundItem;
