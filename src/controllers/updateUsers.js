const SignUp = require('../models/users');
const bcrypt = require('bcrypt');
// create an update route to update user by email and password
const updateUser = {
    update: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Check if user exists
            const existingUser = await SignUp.findOneAndUpdate(
                { email },
                { password },
                { new: true }
            );
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = updateUser;