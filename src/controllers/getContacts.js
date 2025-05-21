const Contact = require('../models/contact_Us');

// Function to get all contacts
const getContact = {
    getContacts: async (req, res) => {
        try {
            const contacts = await Contact.find();
            return res.status(200).json(contacts);
        } catch (error) {
            console.error('Error getting contacts:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
module.exports = getContact;