const express = require('express');
const dotenv = require('dotenv');

const app = express();

// env vars
dotenv.config({ path: './config/config.env' });

// define routes
app.use('/api/users', require('./routes/users') );
app.use('/api/contacts', require('./routes/contacts') );
app.use('/api/auth', require('./routes/auth') );

// bodyparser
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Welcome to the API for MERN app'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});