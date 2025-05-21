const FoundItem = require('../models/foundItems');

// a delete found item by itemSerialNumber
const deleteFoundItem = {
    delete: async (req, res) => {
        try {
            const { itemSerialNumber } = req.body;

            // Find the found item by itemSerialNumber
            const foundItem = await FoundItem.findOne({ itemSerialNumber });

            if (!foundItem) {
                return res.status(404).json({ message: 'Found item not found' });
            }

            // Delete the found item
            await FoundItem.deleteOne({ itemSerialNumber });

            return res.status(200).json({ message: 'Found item deleted successfully' });
        } catch (error) {
            console.error('Error deleting found item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
module.exports = deleteFoundItem;
