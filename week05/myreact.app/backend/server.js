const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Career Analysis API');
});

// Mount API routes under /api
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
