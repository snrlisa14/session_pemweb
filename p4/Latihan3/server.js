const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    res.statusCode = 200; //server berjalan dengan baik
    res.setHeader = ('Content-Type', 'text/html');
    res.write(req.url);
    let q = url.parse(req.url, true).query;
    let txt = q.tahun + " " + q.bulan;
    res.end();
});

server.listen(3000, () =>{
    console.log("Server Berhasil Berjalan di Port 3000");
});
