const express = require('express');
const data = require('./data/data')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
var fs = require('fs');

const PORT = 3000;
const FILE_PATH = './data/data.json';

app.use(express.static('./public/frontend')); //node server folder as static
app.use(bodyParser.json())
app.use(cors())

//GET
//get all items
app.get('/items', (req, res) => {
    if(data.items !== null)
        res.send(data.items)
    else 
        req.send("data is null")
});

//get item by id
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = data.items.filter(element => 
        element.id == id)[0];
    if(item != null)
        res.json(item);
    else
        res.json(error)
});

//INSERT
app.post('/items/add', (req, res) => {
    const body = req.body;
    var items = data.items;
    items.push(body)
    const json = JSON.stringify({"items": items});

    //update json data
    fs.writeFile(FILE_PATH, json, 'utf8', function(err){
        if(err) 
              console.log(err);  
        else 
           res.sendStatus(200)
        });
});

//UPDATE
//update item by id
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    //remove old item
    const items = data.items.filter(element => 
        element.id != id
    );
    //add new item
    items.push(body)
    const json = JSON.stringify({"items": items});

    //update json data
    fs.writeFile(FILE_PATH, json, 'utf8', function(err){
         if(err){ 
               console.log(err); 
         } 
         else 
         {
            res.sendStatus(200)
         }});
});

//deposit count
app.put('/items/deposit/:id', (req, res) => {
    const id = req.params.id;
    const deposit = parseInt(req.body.deposit);
    
    //find item and update the count
    const itemToUpdate = data.items.filter(element => element.id == id)[0]
    itemToUpdate.count = parseInt(itemToUpdate.count) + parseInt(deposit)
    const items = data.items.filter(element => 
        element.id != id
    );
    items.push(itemToUpdate)
    const json = JSON.stringify({"items": items});

    //update json data
    fs.writeFile(FILE_PATH, json, 'utf8', function(err){
         if(err){ 
               console.log(err); 
         } 
         else 
         {
            res.sendStatus(200)
         }});
});

//withdraw count
app.put('/items/withdraw/:id', (req, res) => {
    const id = req.params.id;
    const withdraw = parseInt(req.body.withdraw);

    //find item and update the count
    const itemToUpdate = data.items.filter(element => element.id == id)[0]
    itemToUpdate.count = parseInt(itemToUpdate.count) - parseInt(withdraw)
    const items = data.items.filter(element => 
        element.id != id
    );
    items.push(itemToUpdate)
    const json = JSON.stringify({"items": items});

    //update json data
    fs.writeFile(FILE_PATH, json, 'utf8', function(err){
         if(err){ 
               console.log(err); 
         } 
         else 
         {
            res.sendStatus(200)
         }});
});


//DELETE
//delete item by id
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;

    //remove the item
    const items = data.items.filter(element => 
        element.id != id
    );
    const json = JSON.stringify({"items": items});

    //update json data
    fs.writeFile('./data/data.json', json, 'utf8', function(err){
         if(err){ 
               console.log(err); 
         } 
         else 
         {
            res.sendStatus(200)
         }});
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})