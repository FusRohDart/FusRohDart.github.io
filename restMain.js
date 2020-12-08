//Imports 
const express = require('express'); 
import { auth } from './src/firebase'; 

const restServer = express(); 

restServer.get('/questions?SortBy=:type', (request, response) => { 
    res.send(req.query.SortBy); 
});  

// Sample Class for Posts
export class post { 
    constructor(userName, body, title) {
        this._userName = userName; // auth.currentUser; 
        this._body = body; 
        this._title = title; 
    }
}

let clarkQ = new post('Clark', 'I have recently come across Javascript and I am having trouble understanding it', 'What is JavaScript?'); 

//Port Variable
const port = process.env.PORT || 3000; 

restServer.listen(port, () => {console.log(`Listening on ${port}...`)}); 