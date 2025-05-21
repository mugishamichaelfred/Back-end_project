const SignUp = require('../models/users');
const bcrypt = require('bcrypt');

const signUpController = {
    signUp: async (req, res) => {
        const { username, email, location, gender, phoneNumber, password, confirmPassword } = req.body;
        try {
            // Check if user already exists
            const existingUser = await SignUp.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Check if password and confirm password match
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new SignUp({
                username,
                email,
                location,
                gender,
                phoneNumber,
                password: hashedPassword,
                confirmPassword: hashedPassword,
            });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during sign up:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = signUpController;
