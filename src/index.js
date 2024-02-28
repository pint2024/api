const { sequelize, models } = require('./config/database.config.js');
const express = require('express');
const { SV_PORT } = require('./data/constants');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./routes/init.routes.js');


// Configurar CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Configurações
app.set('port', SV_PORT);

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas
app.use('/', Routes)

//Listen
app.listen(app.get('port'), () => {
	console.log("Start server on port " + app.get('port'))
})