require('rootpath')(); 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/user', require('./users/users.controller'));

app.use(errorHandler);

// Listen on process.env.PORT or 4000
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on ${port}`));