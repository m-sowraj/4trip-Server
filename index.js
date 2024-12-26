// Server/index.js
const express = require('express');
const app = express();
const port = 3000;
const reviewRoutes = require('./src/routes/reviewRoutes');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

