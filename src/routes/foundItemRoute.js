// File: routes/foundItemRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const foundItemController = require('../controllers/foundItemController');

//for image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/middlewares/uploads/uploadFoundItems');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });


router.get('/', foundItemController.getFoundItems);
router.post('/', upload.single('itemImage'), foundItemController.createFoundItem);
router.get('/:id', foundItemController.getFoundItemById);
router.put('/:id', upload.single('itemImage'), foundItemController.updateFoundItem);
router.delete('/:id', foundItemController.deleteFoundItem);

module.exports = router;
