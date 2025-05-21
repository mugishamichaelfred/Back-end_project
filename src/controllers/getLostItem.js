const LostItem = require('../models/lostItems');

// a get lost item by itemSerialNumber
const getLostItem = {
    getLostItems: async (req, res) => {
        try {
            const { itemSerialNumber } = req.body;

            // Find the lost item by itemSerialNumber
            const lostItemData = await LostItem.findOne({ itemSerialNumber });

            if (!lostItemData) {
                return res.status(404).json({ message: 'Lost item not found' });
            }

            return res.status(200).json(lostItemData);
        } catch (error) {
            console.error('Error getting lost item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
module.exports = getLostItem;