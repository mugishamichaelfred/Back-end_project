const express = require('express');
const router = express.Router();
const multer = require('multer');
const itemController = require('../controllers/itemController');

// Set up multer for image upload
const upload = multer({ dest: './src/middlewares/uploads' });


// GET /api/items
router.get('/', itemController.getItems);

// POST /api/items (with optional image)
router.post('/', upload.single('itemImage'), itemController.createItem);

// GET /api/items/:id
router.get('/:id', itemController.getItemById);

// PUT /api/items/:id
router.put('/:id', itemController.updateItem);

// DELETE /api/items/:id
router.delete('/:id', itemController.deleteItem);


module.exports = router;
