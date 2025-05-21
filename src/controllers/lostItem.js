const lostItem = require('../models/lostItems');

const upload = require('../config/multerConfig');

//Create a lost item
const createLostItem = {
    lostIt: async (req, res) => {
        upload.single('itemImage')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            const { lostName, lostEmail, phoneNumber, itemName, itemImage, itemSerialNumber, location, description, dateLost } = req.body;
            // Assuming you have user ID from authentication middleware
            try {
                // Validate required fields
                if (!lostName || !lostEmail || !phoneNumber || !itemName || !itemImage || !itemSerialNumber || !location || !description || !dateLost) {
                    return res.status(400).json({ message: 'All fields are required' });
                }
                // check if the item already exists
                const existingItem = await lostItem.findOne({ itemSerialNumber });
                if (existingItem) {
                    return res.status(400).json({ message: 'Item with this serial number already exists' });
                }
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(lostEmail)) {
                    return res.status(400).json({ message: 'Invalid email format' });
                }
                // Validate date format (YYYY-MM-DD)
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(dateLost)) {
                    return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
                }
                const newLostItem = new lostItem({
                    id: req.params.id,
                    lostName,
                    lostEmail,
                    phoneNumber,
                    itemName,
                    itemImage: req.file ? req.file.path : null, // Store image path
                    itemSerialNumber,
                    location,
                    description,
                    dateLost,
                });
                await newLostItem.save();
                res.status(201).json({ message: 'Lost item created successfully'});
            } catch (error) {
                console.error('Error creating lost item:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
};
module.exports = createLostItem;