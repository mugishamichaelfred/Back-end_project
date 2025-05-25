// File: routes/foundItemRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const foundItemController = require('../controllers/foundItemController');

const upload = multer({ dest: './src/middlewares/uploads' });

router.get('/', foundItemController.getFoundItems);
router.post('/', upload.single('itemImage'), foundItemController.createFoundItem);
router.get('/:id', foundItemController.getFoundItemById);
router.put('/:id', upload.single('itemImage'), foundItemController.updateFoundItem);
router.delete('/:id', foundItemController.deleteFoundItem);

module.exports = router;
