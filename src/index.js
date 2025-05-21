require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const route = require('./routes/allRoutes');
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');

require('./auth');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
app.use('/', route);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});