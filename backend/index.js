require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
