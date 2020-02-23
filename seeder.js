const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const User = require('./models/User');


// env vars
dotenv.config({ path: './config/config.env' });

// connect to mongo
connectDB();


const deleteData = async () => {

  try {

    await User.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();

  } catch (error) {
    console.error(error.red.underline);
  }
}


if(process.argv[2] === '-d')
{
  deleteData();
}









/*   useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true 
  */