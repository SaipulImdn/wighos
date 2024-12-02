const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../../api/routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

module.exports = app;
