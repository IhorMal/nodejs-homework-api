require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST_DB = process.env.HOST_DB;
const SECRET = process.env.SECRET || "simple secret";
const HOST = process.env.HOST || `http://localhost:${PORT}/`
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

module.exports = {PORT, HOST_DB, SECRET, HOST,SENDGRID_API_KEY};