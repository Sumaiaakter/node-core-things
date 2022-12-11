// dependencies

// module wrapper

const handler = {}

handler.notFoundHandler = (reqProps,cb) => {
    console.log('Not Found Route')
    cb(404,"this is not found from cb")
}


// export
module.exports = handler;