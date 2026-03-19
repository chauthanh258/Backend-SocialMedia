const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const seedData = require('./mocks/seed');
const { swaggerUi, specs } = require('./config/swagger');

const app = express();

// Seed mock data
seedData().then(() => {
  console.log('Mock data seeded successfully');
}).catch(err => {
  console.error('Error seeding data:', err);
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api', routes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Mini Social Network API' });
});

// Error handling
app.use(errorHandler);

module.exports = app;
