const mongoose = require('mongoose'); 

const contactModel = new mongoose.Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Contact = mongoose.model('Contact', contactModel);
module.exports = Contact;