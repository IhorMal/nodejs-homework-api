require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST
const SECRET = process.env.SECRET

module.exports = {PORT, HOST, SECRET}