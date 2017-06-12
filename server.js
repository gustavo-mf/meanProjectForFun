// server.js
'use strict';

// INICIANDO ==========================================
const express = require('express');
// cria nossa aplicação Express
const app = express();
// mongoose for mongodb
const mongoose = require('mongoose');
// solicitações para log no console (express4)
const logger = require('morgan');
// puxar informações por POST HTML (express4)
const bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
const methodOverride = require('method-override');

const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// MONGODB ============================================
// conectando ao mongodb no localhost, criando o banco de dados Second Hand
mongoose.connect('mongodb://localhost:27017/desapega-te');
// Requisição dos arquivos models
require('./models/Usuario');
require('./models/Tipo');
require('./models/Anuncio');
require('./models/Venda');
require('./models/Comentario');

require('./config/passport')(passport); // pass passport for configuration
 
// DEFININDO A APLICAÇÃO ==============================
// definindo local de arquivos públicos
app.use(express.static(__dirname + '/public'));
// logando todas as requisições no console
app.use(logger('dev'));

app.use(session({ 
	secret: 'desapega-te',
	resave: true,
   	saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(cookieParser());

// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
 
 
// ROTAS ===============================================
// Incluindo nossas rotas definidas no arquivo routes/index.js
let index = require('./routes/index');
let user = require('./routes/usuario');
let tip = require('./routes/tipo');
let anun = require('./routes/anuncio');
let vend = require('./routes/venda');
let comen = require('./routes/comentario');

// definindo nossas rotas na aplicação
app.use(index);
app.use(user);
app.use(tip);
app.use(anun);
app.use(vend);
app.use(comen);

//require('./app/routes.js')(app, passport);
//app.use('/scripts/angular', express.static(__dirname + '/node_modules/angular/'));
 
// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 8080 onde será executada nossa aplicação
app.listen(8080);
// Imprime uma mensagem no console
console.log("Aplicação executada na porta 8080");