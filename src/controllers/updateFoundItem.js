const FoundItem = require('../models/foundItems');

// Create a function to update a found item by itemSerialNumber
const updateFoundItem = {
    update: async (req, res) => {
        try {
            const { itemSerialNumber, updateData } = req.body;

            // Find the found item by itemSerialNumber
            const foundItem = await FoundItem.findOne({ itemSerialNumber });

            if (!foundItem) {
                return res.status(404).json({ message: 'Found item not found' });
            }

            // Update the found item with the new data
            Object.assign(foundItem, updateData);
            await foundItem.save();

            return res.status(200).json({ message: 'Found item updated successfully', foundItem });
        } catch (error) {
            console.error('Error updating found item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
module.exports = updateFoundItem;
