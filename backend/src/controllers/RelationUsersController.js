const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const relations = await connection('relation_users').select();

        return response.json(relations);
    },
    
    async store(request, response){
        const { id } = request.headers;
        const { user1_id, user2_id } = request.query;
    
        if (id !== user1_id && id !== user2_id) {
            return response.status(401).json({ error: "Not allowed"});
        }

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
    },

    async list(request, response){
        const { user_id } = request.headers;

        const users = await connection('relation_users')
            .join('users', function() {
                this.on('users.id', '=', 'relation_users.user1_id')
                .orOn('users.id', '=', 'relation_users.user2_id')
              })
              .where('user1_id', user_id)
              .orWhere('user2_id', user_id)
              .andWhereNot('id', user_id)
              .select('*');
            
        return response.json(users);
    }
}