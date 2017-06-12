// Anuncio.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cria um novo Schema com os campos que iremos utilizar no model
const AnuncioSchema = Schema(
	{
	  titulo: String,
	  imagens: [Buffer],
	  descricao: String,
	  valor: { type: Number, required: true, min: 0 },
	  data_post: { type: Date, default: Date.now },
	  situacao: { type: String, required: true, enum: ['Disponivel','Em processo', 'Vendido', 'Doado'], default: 'Disponivel' },
	  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo' },
	  local: { type: String, required: true },
	  criador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
	}
);
 
//Define o model
module.exports = mongoose.model('Anuncio', AnuncioSchema);