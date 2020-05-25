const connection = require('../database/connection');
const decode = require('../utils/decodeToken');

module.exports = {
    async index (request, response) {
        const books = await connection('books').select();

        return response.json(books);
    },

    async store (request, response) {
        const { token } = request.headers;
        const {name, author, genre} = request.body;

        const { admin } = await decode(token);

        if(!admin){
            response.status(401).json({error: 'Not allowed'});
        }

        let book = await connection('books').where('name', name).first();

        if(!book){
            book = await connection('books').insert({
                name: name,
                author: author,
                genre: genre,
            });
        }

        return response.json(book);
    },

    async find (request, response) {
        const { name } = request.query;
        
        let book = await connection('books').where('name', name).first();
    
        if(!book){
            return response.status(400).json({ error: 'No book found' });
        }

        return response.json([book])
    },

    async update (request, response) {
        const { token } = request.headers;
        const { id } = request.params;
        const { name, author, genre } = request.body;        
        const { admin } = await decode(token);

        if(!admin){
            response.status(401).json({error: 'Not allowed'});
        }

        let book = await connection('books').where('id', id).first();
    
        if(!book){
            return response.status(400).json({ error: 'No book found' });
        }

        const bookCheckName = await connection('books')
            .whereNot('id', id)
            .where('name', name)
            .first();
        
        if(!bookCheckName){
            await connection('books')
                .where('id', id)
                .update({
                    name: name,
                    author: author,
                    genre: genre       
                })

            return response.status(200).json('Book updated');
        }

        return response.status(400).json({ error: 'A book with this name already exists.' });
    },

    async delete (request, response) {
        const { token } = request.headers;
        const { id } = request.params;

        const { admin } = await decode(token);

        if(!admin){
            response.status(401).json({error: 'Not allowed'});
        }
        
        let book = await connection('books')
            .where('id', id)
            .del();

        return response.json(book);
    }
}