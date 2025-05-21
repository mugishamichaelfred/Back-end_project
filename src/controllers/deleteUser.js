const SignUp = require('../models/users');

// create a delete route to delete user by email and password
const deleteUser = {
    delete: async (req, res) => {
        const { email } = req.body;
        try {
            // Check if user exists
            const existingUser = await SignUp.findOneAndDelete({ email });
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = deleteUser;