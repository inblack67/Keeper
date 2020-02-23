const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () => {

  try {

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('Mongo is here'.yellow);

    
  } catch (error) {
    console.error(error.red.underline);
  }
}


module.exports = connectDB;