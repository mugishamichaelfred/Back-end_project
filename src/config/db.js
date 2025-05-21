const mongoose = require('mongoose');

PORT = process.env.PORT || 1000;
MONGO = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://michaelfred:Blessing123@cluster0.gmljobm.mongodb.net/lostAndFoundItems");
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
module.exports = connectDB;