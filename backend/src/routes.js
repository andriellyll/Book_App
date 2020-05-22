const { Router } = require('express');
const BookController = require('./controllers/BookController');
const UserController = require('./controllers/UserController');
const BookUsersController = require('./controllers/BookUsersController');
const RelationUsersController = require('./controllers/RelationUsersController');

const routes = Router();

routes.get('/books', BookController.index);
routes.post('/books', BookController.store);
routes.get('/books/search', BookController.find);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.get('/session', UserController.session);

routes.post('/users/relate', BookUsersController.store);
routes.get('/users/relate', BookUsersController.index);
routes.delete('/users/relate', BookUsersController.delete);

routes.get('/users/friends', RelationUsersController.index);
routes.post('/users/friends', RelationUsersController.store);
routes.get('/profile/friends', RelationUsersController.list);
routes.delete('/users/friends', RelationUsersController.delete);

module.exports = routes;