const connection = require('../database/connection');

module.exports = {
    async store(request, response){
        const { name, password } = request.headers;
        const { user_id, book_id } = request.query;
        
        const user = await connection('users')
            .where({
                name: name,
                passwd: password,
                id: user_id
            })
            .first();

        if(!name || !password || !user){
            response.status(401).json({error: 'Not allowed'})
        }

        let book = await connection('books')
            .where('id', book_id)
            .first();

        if(!book){
            return response.status(400).json({error: 'Something went wrong'});
        }

        const relation = await connection('book_users')
            .insert({
                user_id: user_id,
                book_id: book_id
            });

        return response.json(relation);
        
    },

    async index(request, response){
        const { name, password } = request.headers;
        const { user_id } = request.query;

        const user = await connection('users')
            .where({
                name: name,
                passwd: password,
                id: user_id
            })
            .first();

        if(!name || !password || !user){
            response.status(401).json({error: 'Not allowed'})
        }
        
        const books = await connection('books')
                .join('book_users', 'id', 'book_users.book_id')
                .where('user_id', user_id)
                .select('*');
        
        return response.json(books);
    },

    async delete(request, response) {
        const { name, password } = request.headers;
        const { user_id, book_id } = request.query;

        const user = await connection('users')
            .where({
                name: name,
                passwd: password,
                id: user_id
            })
            .first();

        if(!name || !password || !user){
            response.status(401).json({error: 'Not allowed'})
        }
        
        const relation = await connection('book_users')
            .where({
                user_id: user_id,
                book_id: book_id
            })
            .del();

        return response.json(relation);

    } 
}