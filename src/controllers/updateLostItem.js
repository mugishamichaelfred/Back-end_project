const LostItem = require('../models/lostItems');

// a update lost item by itemSerialNumber
const updateLostItem = {
    update: async (req, res) => {
        try {
            const { itemSerialNumber, newDetails } = req.body;

            // Find the lost item by itemSerialNumber
            const lostItem = await LostItem.findOne({ itemSerialNumber });

            if (!lostItem) {
                return res.status(404).json({ message: 'Lost item not found' });
            }

            // Update the lost item with new details
            Object.assign(lostItem, newDetails);
            await lostItem.save();

            return res.status(200).json({ message: 'Lost item updated successfully', lostItem });
        } catch (error) {
            console.error('Error updating lost item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
module.exports = updateLostItem;