const express = require('express');
const router = express.Router();
const multer = require('multer');
const lostController = require('../controllers/lostItemController');

// Configure Multer to store the file in memory (no local storage)
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', lostController.getAllLostItems);
router.get('/:id', lostController.getLostItemById);
router.post('/', upload.single('itemImage'), lostController.createLostItem);
router.put('/:id', upload.single('itemImage'), lostController.updateLostItem);
router.delete('/:id', lostController.deleteLostItem);

module.exports = router;
