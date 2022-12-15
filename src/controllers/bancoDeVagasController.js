
const mongoose = require("mongoose");
const bancoDeVagasSchema = require("../models/bancoDeVagasSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const buscarvagas = async (request, response) => {
    try {
      const vagas= await bancoDeVagasSchema.find();
  
      if (vagas.length > 1) {
        return response.status(200).json({
          message: `Encontramos ${vagas.length} vagas.`,
          vagas,
        });
      } else if (vagas.length == 1) {
        return response.status(200).json({
          message: `Encontramos ${vagas.length} vaga.`,
          vagas,
        });
      } else {
        return response.status(404).json({
          message: `Nenhuma vaga cadastrada até o momento.`,
        });
      }
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
  const criarvaga = async (request, response) => {
    const {
      
      empresa,
      cargo,
      salario,
      cidade,
      descricao,
      requisitos,
      quantidade_de_vagas,
    } = request.body;
    
   
   
  
    try {
      const vagas = new bancoDeVagasSchema({
        
        empresa: empresa,
        cargo: cargo,
        salario: salario,
        cidade: cidade,
        descricao: descricao,
        requisitos: requisitos,
        quantidade_de_vagas: quantidade_de_vagas
      
      });
  
      const salvarVagas = await vagas.save();
      response.status(201).json({
        vaga_cadastrada: salvarVagas,
      });
    } catch (error) {
      response.status(400).json({
        message: error.message,
      });
    }
  };
  const buscarVagaByCargo = async (request, response) => {
    const { cargo } = request.body;
  
    try {
      const buscaCargo = await bancoDeVagasSchema.find({cargo}) 
      if(cargo.length > 1){
        response.status(200).json({
            message:`Encontramos ${buscaCargo.length} vagas para o cargo [${request.body.cargo}].`, 
            lista_vagas: buscaCargo
          });
      }else{
        
          return response.status(404).json({
            Prezades: `Nenhum Profissional cadastrado até o momento.`
          });
        }
      
     
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };

 
  const buscarvagaId = async (request, response) => {
    const { id } = request.params;
  
    try {
      if (id.length < 24 || id.length > 24) {
        return response.status(404).json({
          message: `Por favor digite o id da vaga corretamente, o mesmo possui 24 caracteres.`,
        });
      }
      const vaga= await bancoDeVagasSchema.find({
        id,
      });
      if (vaga.length == 0) {
        return response.status(200).json({
          message: `A vaga não foi encontrada.`,
        });
      }
      response.status(200).json(vaga);
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
  const atualizarvaga= async (request, response) => {
    const { id } = request.params;
    const {
        empresa,
        cargo,
        salario,
        cidade,
        descricao,
        requisitos,
        quantidade_de_vagas,
      
    } = request.body;
    
  
    try {
      if (id.length < 24 || id.length > 24) {
        return response.status(404).json({
          message: `Por favor digite o id da vaga corretamente, o mesmo possui 24 caracteres.`,
        });
      }
      const vagasEncontrada = await bancoDeVagasSchema.updateOne({
        empresa: empresa,
        cargo: cargo,
        salario: salario,
        cidade: cidade,
        descricao: descricao,
        requisitos: requisitos,
        quantidade_de_vagas: quantidade_de_vagas
        
      });
      const vagasporId = await bancoDeVagasSchema.find({
        id,
      });
      if (vagasporId.length == 0) {
        return response.status(404).json({
          message: `A vaga não foi encontrada.`,
        });
      }
      response.json({
        vagasporId,
      });
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
  const deletarvaga = async (request, response) => {
    const { id } = request.params;
  
    try {
      if (id.length < 24 || id.length > 24) {
        return response.status(404).json({
          message: `Por favor digite o id da vaga corretamente, o mesmo possui 24 caracteres.`,
        });
      }
      const vagasEncontrada = await bancoDeVagasSchema.deleteOne({
        id,
      });
      if (vagasEncontrada.deletedCount === 1) {
        return response.status(200).send({
          message: `A vaga foi deletada com sucesso!`,
        });
      } else {
        return response.status(404).send({
          message: "A vaga não foi encontrada.",
        });
      }
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
  module.exports = {
    buscarvagas,
    criarvaga,
    buscarVagaByCargo,
    buscarvagaId,
    atualizarvaga,
    deletarvaga
  }
