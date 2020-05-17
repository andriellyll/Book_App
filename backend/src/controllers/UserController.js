const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const users = await connection('users').select();

        return response.json(users);
    },

    async store (request, response) {
        const { name, password } = request.headers;

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
        const { id } = request.params;
        const {name, password} = request.headers;

        let user = await connection('users')
            .where('id', id)
            .first();
        
        if(!user){
            return response.status(400).json({ error: 'No user found' });
        }
    
        let userCheckName = await connection('users')
                .whereNot('id', id)
                .andWhere('name', name)
                .first();
    
        if(!userCheckName){
            user = await connection('users')
            .where('id', id)
            .update({
                name: name,
                passwd: password       
            });

            return response.status(200).json('User updated');
        }

        return response.status(400).json({error: 'Username already being used.'});
    },

    async session(request, response){
        const {name, password} = request.headers;

        let user = await connection('users')
            .where({
                name: name,
                passwd: password
            })
            .first();
        
        if(!user){
            return response.status(400).json({ error: 'Invalid username or password' });
        }

        const info = await connection('users')
            .where({
                name: name,
                passwd: password
            })
            .select('id')
            .first();

        return response.json(info);
    }
}