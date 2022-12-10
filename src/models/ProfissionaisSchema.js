const mongoose = require('mongoose');

const ProfissionaisSchema = new mongoose.Schema({
   id:{
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId
   },
    name: {
        type: String, 
        required: true
    },
    telefone: {
        type: Number, 
        required: true
    },
       cidade:{
        type: String, 
        required: true
       },
       cep:{
        type: Number, 
        required: true
       },
    profissao:{
     type: String, 
     required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
        
    }
, { timestamps : true })

module.exports = mongoose.model("Profissionais", ProfissionaisSchema)