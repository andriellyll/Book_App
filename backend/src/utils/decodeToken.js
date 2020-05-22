const jwt = require('jsonwebtoken');

const decode = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "qwaszxerdfcv",  
            function(err, decoded){
                if(err) {
                    reject(err);
                }

                resolve(decoded);
            })
    });
}

module.exports = decode;