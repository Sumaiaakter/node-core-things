// dependencies

// module wrapper

const handler = {}

handler.usersRouteHandler = (reqProps, cb) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(reqProps.method)) {
        handler._users[reqProps.method](reqProps,cb)
        
    } else {
        cb(400, {
            err:"There was a problem in your request"
        })
    }
    




    //--------------------------------//
    // console.log(reqProps)
    // console.log('this is home route')
    // cb(200,{})
}

handler._users = {}

handler._users.get = (reqProps, cb) => {
    
    // console.log('get')
}


handler._users.post = (reqProps,cb) => {
    console.log(JSON.parse(reqProps));
    cb(200,{})
}


handler._users.put = (reqProps,cb) => {
    console.log('put')
}
handler._users.delete = (reqProps,cb) => {
    console.log('delete')
}



// export
module.exports = handler;