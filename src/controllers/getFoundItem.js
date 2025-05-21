// create a get to get all found items
const FoundItem = require('../models/foundItems');

const getFoundItem = {
    getFoundItems: async (req, res) => {
        try {
            const foundItems = await FoundItem.find();
            res.status(200).json(foundItems);
        } catch (error) {
            console.error('Error fetching found items:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};  
module.exports = getFoundItem;