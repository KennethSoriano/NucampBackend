const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if(req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/'){
            fileUrl = '/index.html';
        }

        const filepath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filepath);
        if ( fileExt === '.html') {
            fs.access(filepath, err => {
                if (err) {
                    res.status = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filepath).pipe(res);
            });
        } else {
            res.status = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.status = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${fileUrl} is not supported</h1></body></html>`);
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})