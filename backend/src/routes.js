const { Router } = require('express');
const BookController = require('./controllers/BookController');
const UserController = require('./controllers/UserController');

const routes = Router();

routes.get('/books', BookController.index);
routes.post('/books', BookController.store);
routes.get('/books/search', BookController.find);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

module.exports = routes;