'use strict';
// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');
const async = require('async');

 
// ROTA BUSCAR ============================================
// todos os anuncios
router.get('/api/anuncioAll', function(req, res) { 
  Anuncio.find().sort('-created').populate('criador').populate('categoria').exec(function(err, anuncios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(anuncios);
    }
  });
});
 
router.get('/api/anuncio', function(req, res) {
  //typeof(x.attribute) 
  let search = {};
  if ((typeof(req.query.titulo) !== 'undefined' && req.query.titulo !== '')) {
    search.titulo = req.query.titulo;
  }
  if ((typeof(req.query.descricao) !== 'undefined' && req.query.descricao !== '')) {
    search.titulo = req.query.descricao;
  }
  if ((typeof(req.query.criador) !== 'undefined' && req.query.criador !== '')) {
    //procura criador
  }

  Anuncio.find(search).sort('-created').populate('criador').populate('categoria').exec(function(err, anuncios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(anuncios);
    }
  });
});

// todos os anuncios do usuario logado
router.get('/api/anuncioMeus/:User_id', function(req, res) {
  Anuncio.find({criador : req.params.User_id}).sort('-created').populate('criador').populate('categoria').exec(function(err, anuncios) {
    if (err)
        res.send(err)
      //console.log(anuncios);
      res.json(anuncios);
  });
});
 
// ROTA CRIAR =============================================
router.post('/api/anuncio', function(req, res) {
  // Cria um Anuncio, as informações são enviadas por uma requisição AJAX pelo Angular
  let today = Date.now();
  Anuncio.create({
    titulo : req.body.titulo,
    //imagens : req.body.imagens,
    descricao : req.body.descricao,
    valor : req.body.valor,
    data_post : today,
    situacao : 'Disponivel',
    categoria : req.body.categoria,
    local: req.body.local,
    criador : req.body.criador,
    done : false
  }, function(err, anuncio) {
    if (err)
      res.send(err);
    Anuncio.find(function(err, anuncio) {
      if (err)
        res.send(err)
      res.json(anuncio);
    });
  });
 
});
 
// ROTA DELETAR ============================================
router.delete('/api/anuncio/:Anuncio_id', function(req, res) {
  Anuncio.remove({
    _id : req.params.Anuncio_id
  }, function(err, anuncio) {
    if (err)
      res.send(err);
    Anuncio.find(function(err, anuncio) {
      if (err)
        res.send(err)
      res.json(anuncio);
    });
  });
});
 
// ROTA EDITAR =============================================
router.get('/api/anuncio/:Anuncio_id', function(req, res) {
  // Busca o Anuncio no Model pelo parâmetro id
  Anuncio.findOne({
    _id : req.params.Anuncio_id
  }, function(err, anuncio) {
    if (err)
      res.send(err);
    res.json(anuncio);
  });
});
 
// ROTA ATUALIZAR ==========================================
router.put('/api/anuncio/:Anuncio_id', function(req, res) {
  // Busca o Anuncio no Model pelo parâmetro id
  let anuncioData = req.body;
  let id = req.params.Anuncio_id;
  Anuncio.update({_id: id },anuncioData,{ upsert: true},
    function(err, anuncio) {
      if (err) return res.json(err);
      res.json(anuncio);
  });
});

router.get('/api/anuncioById', function(req, res, next, id) { 
  Anuncio.findById(id).populate('criador').populate('categoria').exec(function(err, anuncio) {
    if (err) return next(err);
    if (! anuncio) return next(new Error('Falha ao carregar o anuncio ' + id));
    req.anuncio = anuncio ;
    next();
  });
});

module.exports = router;