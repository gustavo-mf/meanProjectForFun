'use strict';
// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Venda = mongoose.model('Venda');
 
// ROTA BUSCAR ============================================
//retorna todas as vendas efetuadas do usuario
router.get('/api/vendaUser/:User_id', function(req, res) {
  Venda.find({criador : req.params.User_id}, function(err, venda) {
    if (err)
      res.send(err)
    res.json(venda); 
  });
});
 
// ROTA CRIAR =============================================
router.post('/api/venda', function(req, res) {
  // Cria uma Venda
  Venda.create({
    anuncio : req.body.anuncio,
    data_venda : req.body.data_venda,
    comprador : req.body.comprador,
    vendedor : req.body.vendedor,
    avaliacao : req.body.avaliacao,
    done : false
  }, function(err, Venda) {
    if (err)
      res.send(err);
    Venda.find(function(err, venda) {
      if (err)
        res.send(err)
      res.json(venda);
    });
  });
 
});
 
// ROTA DELETAR ============================================
//Apaga uma venda
router.delete('/api/venda/:Venda_id', function(req, res) {
  Venda.remove({
    _id : req.params.Venda_id
  }, function(err, Venda) {
    if (err)
      res.send(err);
    Venda.find(function(err, venda) {
      if (err)
        res.send(err)
      res.json(venda);
    });
  });
});
 
// ROTA EDITAR =============================================
//retorna atributos do Venda_id informado
router.get('/api/venda/:Venda_id', function(req, res) {
  Venda.findOne({
    _id : req.params.Venda_id
  }, function(err, Venda) {
    if (err)
      res.send(err);
    res.json(Venda);
  });
});
 
// ROTA ATUALIZAR ==========================================
//atualiza a venda
router.put('/api/venda/:Venda_id', function(req, res) {
  var VendaData = req.body;
  var id = req.params.Venda_id;
  Venda.update( 
    {_id: id }, 
    VendaData, 
    { upsert: true}, 
    function(err, Venda) {
      if (err) res.send(err);
      res.json(Venda);
  });
});
 
module.exports = router;