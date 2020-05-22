const connection = require('../database/connection');
const decode = require('../utils/decodeToken');

module.exports = {
    async store(request, response){
        const { token } = request.headers;
        const { book_id } = request.query;
        
        if(!token){
            response.status(401).json({error: 'Not allowed'})
        }

        try {
            const { user_id } = await decode(token);
            
            let book = await connection('books')
                .where('id', book_id)
                .first();
    
            if(!book){
                return response.status(400).json({error: 'Something went wrong'});
            }
    
            let relation = await connection('book_users')
                .where('user_id', user_id)
                .andWhere('book_id', book_id)
                .first();
            
            if(relation){
                return;
            }
    
            relation = await connection('book_users')
                .insert({
                    user_id: user_id,
                    book_id: book_id
                });
    
            return response.json(relation);
        } catch(err) {
            return response.status(401).json({ error: "Invalid token" });
        }
        
    },

    async index(request, response){
        const { token } = request.headers;

        if(!token){
            response.status(401).json({error: 'Not allowed'})
        }

        try{
            const { user_id } = await decode(token);
                
            const books = await connection('books')
                    .join('book_users', 'id', 'book_users.book_id')
                    .where('user_id', user_id)
                    .select('*');
            
            return response.json(books);
        } catch(err) {
            return response.status(401).json({ error: "Invalid token" });
        }
    },

    async delete(request, response) {
        const { token } = request.headers;
        const { book_id } = request.query;

        if(!token){
            response.status(401).json({error: 'Not allowed'})
        }

        try {
            const { user_id } = await decode(token);
            
            const relation = await connection('book_users')
                .where({
                    user_id: user_id,
                    book_id: book_id
                })
                .del();
    
            return response.json(relation);
        } catch (err) {
            return response.status.json({ error: "Invalid token" });
        }
    } 
}