const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    location: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const SignUp = mongoose.model('SignUp', signUpSchema);

module.exports = SignUp;
