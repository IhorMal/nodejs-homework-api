const app = require('./app')
const mongoose = require('mongoose');
const { HOST, PORT } = require('./service/serverConfiguration');

mongoose.set('strictQuery', true);

async function start() {
  try {
    await mongoose.connect(HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
      console.log("Database connection successful")
      app.listen(PORT, () => {
      console.log("Server runnin. Use our API on port: 3000")
    })
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }

}

start()
