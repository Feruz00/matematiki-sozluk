const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
   .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
   })
   .then(() => {
      console.log('Successfully connected!');
   });

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
   console.log(`Server started on ${port}`);
});

process.on('unhandledRejection', (err) => {
   console.log(err.name, err.message);
   server.close(() => {
      process.exit(1);
   });
});

// Test
