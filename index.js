const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const swaggerJsDoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Workshop Management API',
        version: '1.0.0',
        description: 'API for managing workshops, mentors, learners, and activities',
      },
      servers: [{ url: 'http://localhost:5000' }],
    },
    apis: ['./routes/*.js'],
  };
  
  const swaggerSpec = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
const mentorRoutes = require('./routes/mentorroutes');
const learnerRoutes = require('./routes/learnerroutes');

app.use('/api/mentors', mentorRoutes); // Mentor routes
app.use('/api/learners', learnerRoutes); // Learner routes

// Test route
app.get('/', (req, res) => {
  res.send('Workshop Management System');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));