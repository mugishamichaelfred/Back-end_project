const express = require('express');
const router = express.Router();
const multer = require('multer');
const lostController = require('../controllers/lostItemController');

//for image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/middlewares/uploads/uploadLostItems');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// All routes secured by verifyAuth
router.get('/', lostController.getAllLostItems);
router.get('/:id', lostController.getLostItemById);
router.post('/', upload.single('itemImage'), lostController.createLostItem);
router.put('/:id', upload.single('itemImage'), lostController.updateLostItem);
router.delete('/:id', lostController.deleteLostItem);

module.exports = router;
