const SignUp = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//login controller

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Check if user exists
            const user = await SignUp.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            // Check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = loginController;
