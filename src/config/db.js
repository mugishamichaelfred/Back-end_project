const mongoose = require('mongoose');

PORT = process.env.PORT || 4000;
MONGO = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://michaelfred:Blessing123@cluster0.gmljobm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/lostAndFoundItems");
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
module.exports = connectDB;