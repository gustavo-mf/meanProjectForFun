// Usuario.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt   = require('bcrypt-nodejs');

// Cria um novo Schema com os campos que iremos utilizar no model
const UsuarioSchema = Schema(
	{
	  nome: String,
	  login: String,
	  data_nasc: Date,
	  email: { type: String, required: true, lowercase: true },
	  foto: { type: String, required: true, trim: true },
	  telefone: String
	}
);

// methods ======================
// generating a hash
UsuarioSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UsuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
 
//Define o model
module.exports = mongoose.model('Usuario', UsuarioSchema);