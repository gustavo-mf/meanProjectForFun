'use strict';
// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comentario = mongoose.model('Comentario');

 
// ROTA BUSCAR ============================================
// todos os comentarios
router.get('/api/anuncio/:Anuncio_id/comentario', function(req, res) {
  Comentario.find({anuncio : req.params.Anuncio_id},function(err, comentario) {
    if (err)
        res.send(err)
    res.json(comentario); 
  });
});


// ROTA CRIAR =============================================
// testar o Anuncio_id se tem que enviar ele ou o req.body.anuncio
router.post('/api/comentario', function(req, res) {
  Comentario.create({
    pergunta : req.body.pergunta,
    resposta : req.body.resposta,
    anuncio : req.body.anuncio,
    done : false
  }, function(err, Comentario) {
    if (err)
      res.send(err);
    Comentario.find(function(err, comentario) {
      if (err)
        res.send(err)
      res.json(comentario);
    });
  });
 
});
 
// ROTA DELETAR ============================================
//apaga um anuncio
router.delete('/api/comentario/:Comentario_id', function(req, res) {
  Comentario.remove({
    _id : req.params.Comentario_id
  }, function(err, Comentario) {
    if (err)
      res.send(err);
    Comentario.find(function(err, comentario) {
      if (err)
        res.send(err)
      res.json(comentario);
    });
  });
});
 
// ROTA EDITAR =============================================
// retorna atriutos do anuncio
router.get('/api/comentario/:Comentario_id', function(req, res) {
  Comentario.findOne({
    _id : req.params.Comentario_id
  }, function(err, Comentario) {
    if (err)
      res.send(err);
    res.json(Comentario);
  });
});
 
// ROTA ATUALIZAR ==========================================
//atualiza anuncio
router.put('/api/comentario/:Comentario_id', function(req, res) {
  var ComentarioData = req.body;
  var id = req.params.Comentario_id;

  Comentario.update( 
    {_id: id }, 
    ComentarioData, 
    { upsert: true}, 
    function(err, Comentario) {
      if (err) res.send(err);
      res.json(Comentario);
  });
});
 
module.exports = router;