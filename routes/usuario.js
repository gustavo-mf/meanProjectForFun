'use strict';
// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Usuario = mongoose.model('Usuario');
const passport = require('passport');
 
// ROTA BUSCAR ============================================
//busca todos os usuarios
router.get('/api/usuario', function(req, res) {
  Usuario.find(function(err, usuario) {
    if (err)
        res.send(err)
    res.json(usuario); 
  });
});
 
// ROTA CRIAR =============================================
//cria um usuario
router.post('/api/usuario', function(req, res) {
  Usuario.create({
    nome : req.body.nome,
    login : req.body.login,
    data_nasc : req.body.data_nasc,
    email : req.body.email,
    foto : req.body.foto, 
    telefone : req.body.telefone,
    done : false
  }, function(err, Usuario) {
    if (err)
      res.send(err);
    Usuario.find(function(err, usuario) {
      if (err)
        res.send(err)
      res.json(usuario);
    });
  });
 
});
 
// ROTA DELETAR ============================================
//remove o usuario do id informado
router.delete('/api/usuario/:Usuario_id', function(req, res) {
  Usuario.remove({
    _id : req.params.Usuario_id
  }, function(err, Usuario) {
    if (err)
      res.send(err);
    Usuario.find(function(err, usuario) {
      if (err)
        res.send(err)
      res.json(usuario);
    });
  });
});
 
// ROTA EDITAR =============================================
//edita o usuario do id informado
router.get('/api/usuario/:Usuario_id', function(req, res) {
  Usuario.findOne({
    _id : req.params.Usuario_id
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
});
 
// ROTA ATUALIZAR ==========================================
//atualiza usuario do id informado
router.put('/api/usuario/:Usuario_id', function(req, res) {
  let UsuarioData = req.body;
  let id = req.params.Usuario_id;

  Usuario.update( 
    {_id: id }, 
    UsuarioData, 
    { upsert: true}, 
    function(err, Usuario) {
      if (err) res.send(err);
      res.json(Usuario);
  });
    
});
// ROTA AUTENTICAR ==========================================
//atualiza usuario do id informado
router.post('/api/usuario/auth', function(req, res) {
  console.log(req.body);
  Usuario.findOne({
    email : req.body.email,
    senha : req.body.senha
  }, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

module.exports = router;