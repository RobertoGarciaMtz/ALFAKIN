const express = require("express");
const app = express();
const port = 3200;// por ahora
const path = require('path');
const router = express.Router();
const users = require('./Routes/user');


app.use(users);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views','./Views');


app.get('/',function(req,res){
    res.render('Login')
});

app.listen(port,()=>{
    console.log("Empezamos");
});