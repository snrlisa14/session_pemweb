const http = require('http');
const tanggal = require('./modul')

const server = http.createServer((req, res) => {
    res.statusCode = 200; //server berjalan dengan baik
    res.setHeader = ('Content-Type', 'text/html');
    res.end('waktu Sekarang adalah: ' + tanggal.tanggalSekarang());
});

server.listen(3000, () =>{
    console.log("Server Berhasil Berjalan di Port 3000");
});
