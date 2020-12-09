//Imports 
const express = require('express'); 
const firebase = require('firebase') 

const restServer = express(); 

restServer.get('/questions', (request, response) => { 
    response.send(request.query.SortBy); 
});  

// Sample Class for Posts
class post { 
    constructor(userName, title, body, type, upCount, downCount) {
        this._userName = userName; 
        this._title = title; 
        this._body = body; 
        this._type = type; 
        this._upCount = upCount; 
        this._downCount = downCount;
    } 

    get userName() { return this._userName; } 
    get title() { return this._title; } 
    get body() { return this._body; } 
    get type() { return this._type; }
}

let clarkQ = new post (
    'Clark', 
    'What is JavaScript?', 
    'I have recently come across Javascript and I am having trouble understanding it', 
    'q', 
    4, 0 
); 

//Port Variable
const port = process.env.PORT || 3000; 

restServer.listen(port, () => {console.log(`Listening on ${port}...`)}); 