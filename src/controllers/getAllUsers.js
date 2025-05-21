const SignUp = require('../models/users');
// create a get route to get all users
const getAllUsers = {
    getUsers: async (req, res) => {
        try {
            const users = await SignUp.find();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = getAllUsers;