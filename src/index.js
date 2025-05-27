// File: index.js
const express = require('express');
const authRoutes = require('./routes/authRoute');
const lostItemRoutes = require('./routes/lostItemRoute');
const foundItemRoutes = require('./routes/foundItemRoute');
const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute');
const createAdmins = require('./routes/adminRoute');
const connectDB = require('./config/db');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const contactRoutes = require('./routes/contactRoute');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/admin', createAdmins);
app.use('/lostItems', lostItemRoutes);
app.use('/foundItems', foundItemRoutes);
app.use('/contacts', contactRoutes);



app.get('/', (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
