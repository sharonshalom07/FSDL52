const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use our API routes
app.use('/api', apiRoutes);

// Define a simple root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Career Analysis API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
