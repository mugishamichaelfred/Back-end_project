// multerConfig.js
const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the folder where files will be stored
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Set the file name as the original file name + timestamp to avoid duplicates
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'));
    }
};

// Configure multer with storage and fileFilter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    });

module.exports = upload;
