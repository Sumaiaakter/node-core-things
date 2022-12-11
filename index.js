//dependencies

const http = require('http');
const { reqResHandler } = require('./helpers/reqResHandler');


// module wrapper
const app = {};

app.config = {
    port:8000,
}

app.createServer = () => {
    const server = http.createServer(reqResHandler);
    server.listen(app.config.port, () => {
        console.log('server is running on port:',app.config.port)
    })
}

// app.reqResHandler = reqResHandler;

// server initialize
app.createServer();