
// dependencies
const url = require('url');
const routes = require('./../routes')
const { notFoundHandler } = require('./../handlers/notFoundHandler');
const data = require('./lib/data');


// module wrapper

const handler = {};
const content = {
    name1: "node.js",
    library1:"express.js",
    library2:"python",
    
}
data.create('check', 'newfile', JSON.stringify(content), (err) => {
    if (!err) {
        console.log('successfuuly created')
    } else {
        console.log(err)
    }
})

// request and response handler


data.read('check', 'newfile', (err, content) => {
    if (!err && content) {
        console.log(content)
    } else {
        console.log(err.message)
    }
})

// data.update('check', "newfile", JSON.stringify(content), (err) => {
//     if (!err) {
//         console.log('updated')
//     } else {
//         console.log(err.message)
//     }
// })

data.delete('check', 'newfile', (err) => {
    if (!err) {
        console.log('file deleted')
    } else {
        console.log(err.message)
    }
})

handler.reqResHandler = (req, res) => {
    const method = req.method.toLowerCase();
    const headerObj = req.headers;
    const reqUrlObj = url.parse(req.url, true)
    const path = reqUrlObj.pathname;
    const formatedPath = path.replace(/^\/+|\/+$/g, '');
    const queryObj = reqUrlObj.query;
    // console.log(method)
    // console.log(path)
    // console.log(formatedPath)
    // console.log(queryObj)

    const acceptableContentType = ['application/json', 'text/plain'];
    let body = '';
    const reqProps = {
        method,
        headerObj,
        reqUrlObj,
        path,
        formatedPath,
        queryObj,
        body
    }
    if (acceptableContentType.includes(headerObj['content-type'])) {
        let rawDataArray = [];
        req.on('data', (buffer) => {
            rawDataArray.push(buffer)
        })
        req.on('end', () => {
            body += Buffer.concat(rawDataArray).toString();
            // console.log(body)

            const chosenHandler = routes[formatedPath] ? routes[formatedPath] : notFoundHandler;
            chosenHandler(reqProps, (statusCode, body) => {
                statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
                body = typeof (body) === 'object' ? body : {};
                res.writeHead(statusCode,{"content-type":"application/json"})
                res.write(JSON.stringify(body))
                res.end()
            })
            

        })
    } else {
        res.end("content type did not match")
    }
}

module.exports = handler;