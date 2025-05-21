const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
// Swagger setup
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Lost and Found Items API',
            version: '1.0.0',
            description: 'API documentation with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:1000', // Update with your server URL
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to your route files
    };

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = swaggerSpec;
