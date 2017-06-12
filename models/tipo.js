// Tipo.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cria um novo Schema com os campos que iremos utilizar no model
const TipoSchema = Schema(
	{
	  descricao: { type: String, required: true }
	}
);
 
//Define o model
module.exports = mongoose.model('Tipo', TipoSchema);