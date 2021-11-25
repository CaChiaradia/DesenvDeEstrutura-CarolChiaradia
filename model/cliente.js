const mongoose = require("mongoose");
const bcrypt = require ('b')






const tabela = new mongoose.Schema({
    nome:{type:String, required:true},
    email:{type:String, required:true},
    cpf:{type:String, required:true},
    telefone:String,
    idade:{type:String, required:true},
    senha:String,
    datacadastro:{type:Date, default: Date.now}

});