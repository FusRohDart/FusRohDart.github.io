// Imports
const express = require('express'); 

const restServer = express(); 

const sortQ = restServer.get('/questions?SortBy=:type', (request, response) => {
    res.send(req.query.SortBy); 
});  