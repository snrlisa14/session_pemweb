const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let namafile = "."+ q.pathname;
    fs.readFile(namafile, function(err, data){
        if(err){
            res.statusCode = 400; //halaman tidak tersedia
            res.setHeader = ('Content-Type', 'text/html');
            return res.end("404 halaman tidak ditemukan"); 
        }

        res.statusCode = 200; //server berjalan dengan baik
        res.setHeader = ('Content-Type', 'text/html');
        res.write(data);
        return res.end();    
    });
});

server.listen(3000, () =>{
    console.log("Server Berhasil Berjalan di Port 3000");
});
