// File: controllers/foundItemController.js
const foundItem = require('../models/foundItems');

// Get all found items
exports.getFoundItems = async (req, res) => {
    try {
        const items = await foundItem.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a found item
exports.createFoundItem = async (req, res) => {
    try {
        const itemData = req.body;
        if (req.file) {
            itemData.itemImage = req.file.path;
        }
        const item = new foundItem(itemData);
        await item.save();
        res.status(201).json({ message: 'Found item created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get found item by ID
exports.getFoundItemById = async (req, res) => {
    try {
        const item = await foundItem.findOne({ _id: req.params.id });
        if (!item) return res.status(404).json({ error: 'Found item not found' });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update found item
exports.updateFoundItem = async (req, res) => {
    try {
        const item = await foundItem.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!item) return res.status(404).json({ error: 'Found item not found' });
        res.status(200).json({ message: 'Found item updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete found item
exports.deleteFoundItem = async (req, res) => {
    try {
        const item = await foundItem.findOneAndDelete({ _id: req.params.id });
        if (!item) return res.status(404).json({ error: 'Found item not found' });
        res.status(204).send({message: 'Item Deleted'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
