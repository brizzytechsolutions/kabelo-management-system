const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Kabelo Management System API',
      version: '1.0.0',
      description: 'API for managing car dealership stock',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        StockItem: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the stock item' },
            regNo: { type: 'string', description: 'Registration number of the vehicle' },
            make: { type: 'string', description: 'Make of the vehicle' },
            model: { type: 'string', description: 'Model of the vehicle' },
            modelYear: { type: 'integer', description: 'Year the vehicle model was made' },
            kms: { type: 'integer', description: 'Kilometers driven by the vehicle' },
            color: { type: 'string', description: 'Color of the vehicle' },
            vin: { type: 'string', description: 'Vehicle Identification Number' },
            retailPrice: { type: 'number', description: 'Retail price of the vehicle' },
            costPrice: { type: 'number', description: 'Cost price of the vehicle' },
            accessories: { 
              type: 'array', 
              items: { $ref: '#/components/schemas/Accessory' },
              description: 'List of accessory objects'
            },
            images: { 
              type: 'array', 
              items: { type: 'string', description: 'URLs or paths to images' } 
            },
            dtCreated: { type: 'string', format: 'date-time', description: 'Date and time the stock item was created' },
            dtUpdated: { type: 'string', format: 'date-time', description: 'Date and time the stock item was last updated' },
          },
          required: ['regNo', 'make', 'model', 'modelYear', 'kms', 'color', 'vin', 'retailPrice', 'costPrice'],
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the user' },
            username: { type: 'string', required: true, description: 'Username for user account' },
            password: { type: 'string', required: true, description: 'Password for user account' },
          },
          required: ['username', 'password']  // Indicate which fields are required
        },
        Accessory: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique identifier for the accessory' },
            name: { type: 'string', required: true, description: 'Name of the accessory' },
            description: { type: 'string', description: 'Description of the accessory' },
          },
          required: ['name']  // Only 'name' is required
        },
        NewStockItem: {
          type: 'object',
          properties: {
            regNo: { type: 'string', description: 'Registration number of the vehicle' },
            make: { type: 'string', description: 'Make of the vehicle' },
            model: { type: 'string', description: 'Model of the vehicle' },
            modelYear: { type: 'integer', description: 'Year the vehicle model was made' },
            kms: { type: 'integer', description: 'Kilometers driven by the vehicle' },
            color: { type: 'string', description: 'Color of the vehicle' },
            vin: { type: 'string', description: 'Vehicle Identification Number' },
            retailPrice: { type: 'number', description: 'Retail price of the vehicle' },
            costPrice: { type: 'number', description: 'Cost price of the vehicle' },
            accessories: { 
              type: 'array', 
              items: { $ref: '#/components/schemas/Accessory' },
              description: 'List of accessory objects'
            },
            images: { 
              type: 'array', 
              items: { type: 'string', format: 'binary', description: 'Uploaded images' } 
            },
          },
          required: ['regNo', 'make', 'model', 'modelYear', 'kms', 'color', 'vin', 'retailPrice', 'costPrice'],
        }
      },
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
