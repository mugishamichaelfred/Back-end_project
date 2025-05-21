const Contact = require('../models/contact_Us');
const createContact = {
    contactUs: async (req, res) => {
        const { name, email, subject, message } = req.body;
        try {
            // Validate required fields
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
            const newContact = new Contact({
                name,
                email,
                subject,
                message,
            });
            await newContact.save();
            res.status(201).json({ message: 'Contact form submitted successfully' });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
module.exports = createContact;