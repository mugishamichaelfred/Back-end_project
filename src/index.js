// File: index.js
const express = require('express');
const authRoutes = require('./routes/authRoute');
const itemRoutes = require('./routes/itemRoute');
const userRoutes = require('./routes/userRoute');
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
app.use(bodyParser.json());

app.use(cors({ origin: '/' }));

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/contacts', contactRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
