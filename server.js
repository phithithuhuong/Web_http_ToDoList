const http = require('http');
const fs = require('fs');//dùng để đọc file
const qs = require('qs');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('todo.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });

    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const work = qs.parse(data);
            fs.readFile('display.html', 'utf8', function (err, datatodo) {
                if (err) {
                    console.log(err);
                }
                datatodo = datatodo.replace('{list}', work.list);
                datatodo = datatodo.replace('{times}', work.times);
                datatodo = datatodo.replace('{date}', work.date);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datatodo);
                return res.end();

            })
        });
        req.on('error', () => {
            console.log('err')
        })
    }

})
server.listen(3030, function () {
    console.log('To do list running !')

})