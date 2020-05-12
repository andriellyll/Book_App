const { Router } = require('express');
const BookController = require('./controllers/BookController');

const routes = Router();

routes.get('/', BookController.index);
routes.post('/', BookController.store);
routes.get('/search', BookController.find);
routes.put('/update/:id', BookController.update);
routes.delete('/delete/:id', BookController.delete);

module.exports = routes;