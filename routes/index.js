'use strict';
// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
 
// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
//recebe notificações das vendas ou comentarios sobre o anuncio
router.get('/api/home', function(req, res) {
  res.json({
  	'sucess':['Compra bem sucedida.'],
  	'danger':['Voce tem uma venda pendente.']
  	});
});
 
module.exports = router;