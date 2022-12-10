const mongoose = require('mongoose');

const bancoDeVagasSchema = new mongoose.Schema({
   id:{
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId
   },
    empresa: {
        type: String, 
        required: true
    },
    cargo: {
        type: String, 
        required: true
    },
       salario:{
        type: Number, 
        required: true
       },
       cidade:{
        type: String, 
        required: true
       },
    descricao:{
     type: String, 
     required: true
    },
    requisitos:{
        type: Array,
        required: true
    },
    quantidade_de_vagas:{
        type: Number,
        required: true
    }
        
    }
, { timestamps : true })

module.exports = mongoose.model("bancoDeVagas", bancoDeVagasSchema)