const connection = require('../database/connection');
const decode = require('../utils/decodeToken');

module.exports = {

    async index (request, response) {
        const relations = await connection('relation_users').select();

        return response.json(relations);
    },
    
    async store(request, response){
        const { token } = request.headers;
        const { user2_id } = request.query;
    
        if (!token) {
            return response.status(401).json({ error: "Not allowed"});
        }

        try {
            const info = await decode(token);
            const user1_id = info.user_id;
    
            let relation = await connection('relation_users')
                .where('user1_id', user1_id)
                .andWhere('user2_id', user2_id)
                .first();
        
            if(relation){
                return;
            }
    
            relation = await connection('relation_users')
                .insert({
                    user1_id,
                    user2_id
                });
            
            return response.json(relation);
        
        } catch(err) {
            return response.status(401).json({ error: "Invalid token" });
        }
    },

    async list(request, response){
        const { token } = request.headers;

        if (!token) {
            return response.status(401).json({ error: "Not allowed"});
        }

        try{
            const { user_id } = await decode(token);
    
            const users = await connection('relation_users')
                .join('users', function() {
                    this.on('users.id', '=', 'relation_users.user1_id')
                    .orOn('users.id', '=', 'relation_users.user2_id')
                  })
                  .where(function() {
                    this.where('user1_id', user_id).orWhere('user2_id', user_id)
                  })
                  .andWhereNot('id', user_id)
                  .select('name', 'user1_id', 'user2_id', 'id');
       
                
            return response.json(users);
        } catch(err){
            return response.status(401).json({ error: "Invalid token" });
        }
    },

    async delete(request, response) {
        const { token } = request.headers;
        const { user2_id } = request.query;

        if(!token){
            return response.status(401).json({ error: "Not allowed"})
        }

        try{
            const info = await decode(token);
            const user1_id = info.user_id;

            await connection('relation_users')
                .where({
                    user1_id,
                    user2_id
                })
                .orWhere({
                    user1_id: user2_id,
                    user2_id: user1_id 
                })
                .del();
            return response.status(200).json({ message: "Relation deleted" });
        } catch(err) {
            return response.status(401).json({ error: "Invalid token" });
        }
    }

}