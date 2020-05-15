const connection = require('../database/connection');

module.exports = {
    async store (request, response) {
        const name = request.headers.name;
        const password = request.headers.password;

        let user = await connection('users')
            .where('name', name)
            .first();

        if(!user){
            user = await connection('users').insert({
                name: name,
                passwd: password,
            });

            return response.json(user);
        }

        return response.status(400).json({error: 'Username already being used.'});
    },

    async update (request, response) {
        const {name, password} = request.headers;

        let user = await connection('users')
            .where({
                name: name
            }).first();
        
        if(!user){
            user.update({
                name: name,
                password: password
            });
    
            return response.json(user);
        }

        return response.status(400).json({error: 'Username already being used.'});
    },
}