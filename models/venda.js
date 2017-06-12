// Venda.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cria um novo Schema com os campos que iremos utilizar no model
const VendaSchema = Schema(
	{
	  anuncio: { type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' },
	  data_venda: { type: Date, default: Date.now },
	  comprador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
	  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
	  avaliacao: { type: Number, required: true, min: 0 }
	}
);
 
//Define o model
module.exports = mongoose.model('Venda', VendaSchema);