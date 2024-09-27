const express = require('express');
const mongoose = require('mongoose');
const ipoRoutes = require('./routes/ipo.js');
require('dotenv').config();
const app = express();

const cors = require('cors');

app.use(cors());  // Enable CORS

// MongoDB connection
// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


// Routes Middleware
app.use('/api', ipoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the IPO Data Server!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
