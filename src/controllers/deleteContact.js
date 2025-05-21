const Contact = require('../models/contact_Us');

// Function to delete a contact by email
const deleteContact = {
    delete: async (req, res) => {
        try {
            const { email } = req.body;

            // Find and delete the contact
            const deletedContact = await Contact.findOneAndDelete({ email });
            if (!deletedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.status(200).json({ message: 'Contact deleted successfully' });
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = deleteContact;