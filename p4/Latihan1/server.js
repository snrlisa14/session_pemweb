const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200; //server berjalan dengan baik
    res.setHeader = ('Content-Type', 'text/html');
    res.end('Hello World!');
});

server.listen(3000, () =>{
    console.log("Server Berhasil Berjalan di Port 3000");
});
