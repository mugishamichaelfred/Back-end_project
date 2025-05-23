// File: controllers/itemController.js
//const FoundItem = require('./models/foundItem');
//const LostItem = require('./models/lostItem');

// File: controllers/itemController.js
const Item = require('../models/item');

// Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new lost/found item
exports.createItem = async (req, res) => {
    try {
        const itemData = req.body;
        if (req.file) {
            itemData.itemImage = req.file.path;
        }
        const item = new Item(itemData);
        await item.save();
        res.status(201).json({ message: 'Item created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update item
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Item updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
