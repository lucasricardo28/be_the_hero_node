const express = require('express');
const routes = express.Router();
const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const SessionsController = require('./controllers/SessionsController');

routes.post('/ongs', OngsController.store);
routes.get('/ongs', OngsController.index);
routes.get('/ongs/incidents',OngsController.getAllIncidentsByOng);

routes.post('/login',SessionsController.login);

routes.post('/incidents',IncidentsController.store);
routes.get('/incidents',IncidentsController.index);
routes.delete('/incidents/:id',IncidentsController.delete);

module.exports = routes;