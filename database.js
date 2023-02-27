const mysql = require('mysql');
const http = require('http');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'contractor_system'
})

connection.connect((error)=>{
    if(error)
        console.log(error);
    else{
        console.log('connection established successfully');
    }
})

module.exports = connection;
