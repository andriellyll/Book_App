const jwt = require('jsonwebtoken');

const generate = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, "qwaszxerdfcv", { algorithm: "HS256"}, 
            function(err, token){
                if(err) {
                    reject(err);
                }

                resolve(token);
            })
    });
}

module.exports = generate;