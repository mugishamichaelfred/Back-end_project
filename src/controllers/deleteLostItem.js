const LostItem = require('../models/lostItems');

// delete lost item by itemSerialNumber
const deleteLostItem = {
    delete: async (req, res) => {
        try {
            const { itemSerialNumber } = req.body;

            // Find the lost item by itemSerialNumber
            const lostItemData = await LostItem.findOneAndDelete({ itemSerialNumber });

            if (!lostItemData) {
                return res.status(404).json({ message: 'Lost item not found' });
            }

            return res.status(200).json({ message: 'Lost item deleted successfully' });
        } catch (error) {
            console.error('Error deleting lost item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
module.exports = deleteLostItem;