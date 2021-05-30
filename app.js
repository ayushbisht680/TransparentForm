
var express = require('express');
var app = express();
 const pug = require('pug');
const fs=require('fs');
const port=80;

// moongoose relates stuff

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Forms', {useNewUrlParser: true, useUnifiedTopology: true});

//defining Schema and pushing to a model
const FormInfo = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    password: String,
  });

const Data= mongoose.model('Form', FormInfo);
// Express related commands
app.use('/static', express.static('static'))
app.use(express.urlencoded());

// Pug realted commands
app.set('view engine', 'pug')
app.set('views','./views')

//Endpoints
app.get('/', (req, res)=>{
   const parameters = {}
   res.render('index.pug',parameters);
})
 // Important for saving to the database

 app.post('/', (req, res)=>{
    var myData=new Data(req.body)
    myData.save().then(()=>{
        res.send("This data has been saved to database")
    }).catch(()=>{
        res.status(404).send("Error")
    })
 })

// feeding to server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});