const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

// Parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: '10',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

pool.getConnection((err, connection)=>{
    if(err) throw err;//not connected
    else console.log('Connected ID ' + connection.threadId);
    /*pool.query('select * from user',(err,rows)=>{
        if(err) console.log(err);
        else console.log(rows);
    })*/
});

//Router
//app.get('',(req,res)=>{
//    res.render('home');})

const routes = require('./server/routes/user');
app.use('/',routes);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})