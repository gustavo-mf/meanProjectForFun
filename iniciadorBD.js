'use strict';

const async = require('async');
const Anuncio = require('./models/anuncio');
const Tipo = require('./models/tipo');
const Usuario = require('./models/usuario');
const Venda = require('./models/venda');
const Comentario = require('./models/comentario');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/desapega-te';
mongoose.connect(url);
let db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB erro de conexao:'));
let anuncios = [];
let tipos = [];
let usuarios = [];
let vendas = [];
let comentarios = [];

//Função que cria a Coleção Tipo
function criarTipo(descricao, callback) {
    let tipoDados = { descricao: descricao };
    let tipo = new Tipo(tipoDados);
    tipo.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('Novo Tipo: ' + tipo);
        tipos.push(tipo);
        callback(null, tipo);
    });
}

//Função que cria a Coleção Usuario
function criarUsuario(nome, login, data_nasc, email, senha, foto, telefone, callback) {
    let usuarioDados = { nome: nome, login: login, senha: senha, data_nasc: data_nasc, email: email, foto: foto, telefone: telefone };
    let usuario = new Usuario(usuarioDados);
    usuario.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('Novo Usuario: ' + usuario);
        usuarios.push(usuario);
        callback(null, usuario);
    });
}

//Função que cria a Coleção Anuncio
function criarAnuncio(titulo, imagens, descricao, valor, data_post, situacao, categoria, local, criador, callback) {
    let anuncioDados = { titulo: titulo, imagens: imagens, descricao: descricao, valor: valor, situacao: situacao, categoria: categoria, local: local, criador: criador };
    if (data_post != false) anuncioDados.data_post = data_post;
    let anuncio = new Anuncio(anuncioDados);
    anuncio.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('Novo Anuncio: ' + anuncio);
        anuncios.push(anuncio);
        callback(null, anuncio);
    });
}

//Função que cria a Coleção Comentario
function criarComentario(pergunta, resposta, anuncio, callback) {
    let comentarioDados = { pergunta: pergunta, resposta: resposta, anuncio: anuncio };
    let comentario = new Comentario(comentarioDados);
    comentario.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('Novo Comentario: ' + comentario);
        comentarios.push(comentario);
        callback(null, comentario);
    });
}

//Função que cria a Coleção Venda
function criarVenda(anuncio, comprador, avaliacao, data_venda, callback) {
    let vendaDados = { anuncio: anuncio, comprador: comprador, avaliacao: avaliacao };
    if (data_venda != false) vendaDados.data_venda = data_venda;
    let venda = new Venda(vendaDados);
    venda.save(function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('Nova Venda: ' + venda);
        vendas.push(venda);
        callback(null, venda);
    });
}

//Função que insere documentos na Coleção Tipo
function inserirTipos(callback) {
    async.parallel(
        [
            function (callback) {
                criarTipo('Esportivos', callback);
            },
            function (callback) {
                criarTipo('Informática', callback);
            },
            function (callback) {
                criarTipo('Móveis', callback);
            },
            function (callback) {
                criarTipo('Eletrodomésticos', callback);
            },
            function (callback) {
                criarTipo('Vestuário', callback);
            }
        ],
        callback
    );
}

//Função que insere documentos na Coleção Usuario
function inserirUsuarios(callback) {
    async.parallel(
        [
            function (callback) {
                criarUsuario('Sandro', 'sandrofig', new Date(1994,2,6), 'figueredo.sandro@gmail.com','1234','www.teste.com/img1.jpg', '51985726493', callback);
            },
            function (callback) {
                criarUsuario('Rafael', 'rafaeltorres', new Date(1997,12,8), 'rafael.torres@gmail.com','1234','www.teste.com/img2.jpg', '51981859565', callback);
            }
        ],
        callback
    );
}

//Função que insere documentos na Coleção Anuncio
function inserirAnuncios(callback) {
    async.parallel(
        [
            function (callback) {
                criarAnuncio('Chuteira', 'www.teste.com/img3.jpg', 'Azul, nº 41, para Futebol de Campo', 100, false, 'Disponivel', tipos[0], 'Alvorada', usuarios[1], callback);
            },
            function (callback) {
                criarAnuncio('Escrivaninha', 'www.teste.com/img4.jpg', 'Feita de MDF', 150, false, 'Disponivel', tipos[2], 'Centro Histórico', usuarios[0], callback);
            },
            function (callback) {
                criarAnuncio('Boné', 'www.teste.com/img5.jpg', 'Azul, da Billabong', 50, false, 'Disponivel', tipos[4], 'Capão da Canoa', usuarios[1], callback);
            },
            function (callback) {
                criarAnuncio('Iphone 4', 'www.teste.com/img6.jpg', 'Preto, 16GB interno', 300, false, 'Disponivel', tipos[1], 'Agronomia', usuarios[0], callback);
            },
            function (callback) {
                criarAnuncio('Geladeira', 'www.teste.com/img7.jpg', 'Branca, 50l', 200, false, 'Disponivel', tipos[3], 'Viamão', usuarios[1], callback);
            }
        ],
        callback
    );
}

//Função que insere documentos na Coleção Comentario
function inserirComentarios(callback) {
    async.parallel(
        [
            function (callback) {
                criarComentario('A tela esta arranhada?', 'A tela não está arranhada', anuncios[3], callback);
            },
            function (callback) {
                criarComentario('Ela tem suporte para teclado', false, anuncios[1], callback);
            }
        ],
        callback
    );
}

//Função que insere documentos na Coleção Vendas
function inserirVendas(callback) {
    async.parallel(
        [
            function (callback) {
                criarVenda(anuncios[3], usuarios[1], 5, false, callback);
            },
            function (callback) {
                criarVenda(anuncios[4], usuarios[0], 3, false, callback);
            },
        ],
        callback
    );
}


async.series([inserirTipos, inserirUsuarios, inserirAnuncios, inserirComentarios, inserirVendas], function (err, result) {
    if (err) {
        console.log('Erro: ' + err);
    } else {
        console.log('Dados: ' + tipos + '\n' + usuarios + '\n' + anuncios + '\n' + comentarios + '\n' + vendas);
    }
    mongoose.connection.close();
});