const express = require('express');
const cors = require('cors');
const questionsRoute = require('./routes/questions');

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionsRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
