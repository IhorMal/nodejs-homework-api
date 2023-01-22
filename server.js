const app = require('./app')
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/api/contacts');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/contacts', routerApi);

app.listen(PORT, () => {
  console.log("Server runnin. Use our API on port: 3000")
})
