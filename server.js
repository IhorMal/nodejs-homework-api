const app = require('./app')
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/api/contacts');

app.use(express.json());
app.use(cors());
app.use('/api/contacts', routerApi);

app.listen(3000, () => {
  console.log("Server runnin. Use our API on port: 3000")
})
