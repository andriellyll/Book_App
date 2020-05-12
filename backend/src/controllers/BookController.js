const Book = require('../models/Book');

module.exports = {
    async index (request, response) {
        const books = await Book.find();

        return response.json(books);
    },

    async store (request, response) {
        const {name, author, genre} = request.body;

        let book = await Book.findOne({ name });
        
        if(!book){
            book = await Book.create({
                name: name,
                author: author,
                genre: genre,
            });
        }

        return response.json(book);
    },

    async find (request, response) {
        const { name } = request.query;

        let book = await Book.find({
            name: { $eq: name }
        })
    
        return response.json(book)
    },

    async update (request, response) {
        const { id } = request.params;
        const { name, author, genre } = request.body;

        let book = await Book.find({
            _id: { $eq: id }
        }).update({
            name: name,
            author: author,
            genre: genre       
        })

        return response.json(book);
    },

    async delete (request, response) {
        const { id } = request.params;
        
        let book = await Book.findOneAndRemove({ 
            _id: { $eq: id } 
        })

        return response.json(book);
    }
}