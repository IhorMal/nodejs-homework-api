require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST_DB = process.env.HOST_DB;
const SECRET = process.env.SECRET || "simple secret";
const HOST = process.env.HOST || `http://localhost:${PORT}/`

module.exports = {PORT, HOST_DB, SECRET, HOST};