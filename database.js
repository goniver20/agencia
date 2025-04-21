const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '9546851662Oz',
    database: 'viajes_lujosos'

});

connection.connect((err) =>{
    if(err){
        console.error('Error database', err);
        return;
    }
    console.log('✅ Conexion exitosa a la base de datos (mysql)');
});

module.exports = connection;