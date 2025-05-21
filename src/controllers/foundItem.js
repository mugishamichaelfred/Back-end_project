const FoundItem = require('../models/foundItems');

// controllers/foundItem.js
const upload = require('../config/multerConfig');

// Create a new found item
const createFoundItem = {
    foundIt: async (req, res) => {
        // Handle file upload using multer
        upload.single('itemImage')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            const { foundName, foundEmail, phoneNumber, itemName, itemImage, itemSerialNumber, location,description, dateFound } = req.body;
            // Assuming you have user ID from authentication middleware
            try {
                // Validate required fields
                if (!foundName || !foundEmail || !phoneNumber || !itemName || !itemImage || !itemSerialNumber || !location || !description || !dateFound) {
                    return res.status(400).json({ message: 'All fields are required' });
                }
                // check if the item already exists
                const existingItem = await FoundItem.findOne({ itemSerialNumber });
                if (existingItem) {
                    return res.status(400).json({ message: 'Item with this serial number already exists' });
                }
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(foundEmail)) {
                    return res.status(400).json({ message: 'Invalid email format' });
                }
                // Validate date format (YYYY-MM-DD)
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(dateFound)) {
                    return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
                }
                
                const newFoundItem = new FoundItem({
                    id: req.params.id,
                    foundName,
                    foundEmail,
                    phoneNumber,
                    itemName,
                    itemImage: req.file ? req.file.path : null, // Store image path
                    itemSerialNumber,
                    location,
                    description,
                    dateFound,
                });
                await newFoundItem.save();
                res.status(201).json({ message: 'Found item created successfully'});
            } catch (error) {
                console.error('Error creating found item:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
        );
    },
};

module.exports = createFoundItem;