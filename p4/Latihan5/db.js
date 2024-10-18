const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pemweb4a'
});

db.connect((err)=>{
    if(err){
        console.log("Koneksi database gagal", err);
    }else{
        console.log("Koneksi MySQL Berhasil")
    }
});

module.exports = db;