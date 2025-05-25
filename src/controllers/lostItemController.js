const lostItem = require('../models/lostItems');
const bucket = require('../middlewares/firebase');  // Import Firebase bucket

// CREATE a new item
exports.createLostItem = async (req, res) => {
    try {
        const { ownerName, ownerEmail, ownerPhone, itemName, itemSerial, description, location } = req.body;

        // Check if a file has been uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded.' });
        }

        const file = req.file;
        const fileName = `${Date.now()}_${file.originalname}`;
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,  // Set content type
            },
        });

        // Upload the file to Firebase Storage
        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Create new item object with image URL
            const newItem = new lostItem({
                ownerName,
                ownerEmail,
                ownerPhone,
                itemName,
                itemImage: publicUrl,  // Store the Firebase URL
                itemSerial,
                description,
                location,
            });

            // Save the item to MongoDB
            await newItem.save();

            // Return the response
            res.status(201).json({
                message: 'Item created successfully'
            });
        });

        blobStream.on('error', (err) => {
            console.error('Error uploading file to Firebase:', err);
            res.status(500).json({ message: 'Failed to upload file to Firebase', error: err });
        });

        // Pipe the file buffer to Firebase Storage
        blobStream.end(file.buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating item', error });
    }
};

// GET all items
exports.getAllLostItems = async (req, res) => {
    try {
        const items = await lostItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

// GET an item by ID
exports.getLostItemById = async (req, res) => {
    try {
        const item = await lostItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
};

// UPDATE an item by ID
exports.updateLostItem = async (req, res) => {
    try {
        const { ownerName, ownerEmail, ownerPhone, itemName, itemSerial, description, location } = req.body;
        const updatedData = { ownerName, ownerEmail, ownerPhone, itemName, itemSerial, description, location };

        // If an image is uploaded, we need to handle it separately
        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                updatedData.itemImage = publicUrl;

                // Update the item in the database
                const updatedItem = await lostItem.findByIdAndUpdate(req.params.id, updatedData, { new: true });

                if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

                res.json(updatedItem);
            });

            blobStream.on('error', (err) => {
                console.error('Error uploading file to Firebase:', err);
                res.status(500).json({ message: 'Failed to upload file to Firebase', error: err });
            });

            blobStream.end(file.buffer);
        } else {
            // If no new image, update without it
            const updatedItem = await lostItem.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
            res.json(updatedItem);
        }

    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

// DELETE an item by ID
exports.deleteLostItem = async (req, res) => {
    try {
        const deletedItem = await lostItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
