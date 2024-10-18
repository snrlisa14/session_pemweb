const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express ();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded);

app.listen(3000, () =>{
    console.log("server berjalan pada port 3000");
});

//Create
app.post('/user', (req, res) => {
    const {nama, email, umur} = req.body;
    const query = 'INSERT INTO mhs (nama, email, umur) values (?,?,?)';

    db.connect(query, [nama, email, umur], (err, result) => {
        if(err){
            return res.status(500).send(err);
        }
        res.send({message: 'Data Mahasiswa Berhasil ditambahkan!', userId: result.insertId});
    });
});