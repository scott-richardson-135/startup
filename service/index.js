const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

//data structures
let users = [];
let stats = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));


//api path for endpoints
let apiRouter = express.Router();
app.use('/api', apiRouter);


app.get('*', (_req, res) => {
    res.send({ msg: 'Startup service' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });