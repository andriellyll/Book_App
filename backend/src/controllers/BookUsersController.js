const connection = require('../database/connection');

module.exports = {
    async store(request, response){
        const { user_id, book_id } = request.params;
        
        let user = await connection('users')
        .where('id', user_id)
        .first();

        let book = await connection('books')
            .where('id', book_id)
            .first();

        if(!user || !book){
            return response.status(400).json({error: 'Something went wrong'});
        }
        
    },
}