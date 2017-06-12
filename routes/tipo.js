'use strict';
// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Tipo = mongoose.model('Tipo');
 
// ROTA BUSCAR ============================================
//pega todos os tipos
router.get('/api/tipo', function(req, res) {  
  Tipo.find(function(err, tipo) {
    if (err)
        res.send(err);
    res.json(tipo); 
  });
});
 
// ROTA CRIAR =============================================
//cria um tipo
router.post('/api/tipo', function(req, res) {
  Tipo.create({
    descricao : req.body.descricao,
    done : false
  }, function(err, tipo) {
    if (err)
      res.send(err);
    Tipo.find(function(err, tipo) {
      if (err)
        res.send(err)
      res.json(tipo);
    });
  });
 
});
 
// ROTA DELETAR ============================================
//remove o tipo informado no Tipo_id
router.delete('/api/tipo/:Tipo_id', function(req, res) {
  Tipo.remove({
    _id : req.params.Tipo_id
  }, function(err, tipo) {
    if (err)
      res.send(err);
    Tipo.find(function(err, tipo) {
      if (err)
        res.send(err)
      res.json(tipo);
    });
  });
});
 
// ROTA EDITAR =============================================
//retorna os atributos do Tipo_id informado
router.get('/api/tipo/:Tipo_id', function(req, res) {
  Tipo.findOne({
    _id : req.params.Tipo_id
  }, function(err, tipo) {
    if (err)
      res.send(err);
    res.json(tipo);
  });
});
 
// ROTA ATUALIZAR ==========================================
//Atualiza os atributos informados no json
router.put('/api/tipo/:Tipo_id', function(req, res) {
  var TipoData = req.body;
  var id = req.params.Tipo_id;
  Tipo.update( 
    {_id: id }, 
    TipoData, 
    { upsert: true}, 
    function(err, tipo) {
      if (err) res.send(err);
      res.json(tipo);
  });
});
 
module.exports = router;