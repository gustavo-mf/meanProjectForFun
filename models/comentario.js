// Comentariro.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cria um novo Schema com os campos que iremos utilizar no model
const ComentarioSchema = Schema(
	{
	  pergunta: String,
	  resposta: String,
	  anuncio: { type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' },
	}
);
 
//Define o model
module.exports = mongoose.model('Comentario', ComentarioSchema);