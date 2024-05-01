const express = require("express");
const app = express();
const port = 3200;// por ahora
const users = require('./Routes/user');
const consultas = require('./Routes/consulta')
const bodyParser = require ('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views','./Views');
app.use(express.static(__dirname + '/public'));
app.use(users);
app.use(consultas);
//const connection = new ConnectionBD();

app.get('/',function(req,res){
    res.render('Login')
});

app.listen(port,()=>{
    console.log("Empezamos");
});