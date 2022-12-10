const mongoose = require("mongoose");
const ProfissionaisSchema = require("../models/ProfissionaisSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        
        ProfissionaisSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("Esse é o usuário:", user)
            
            if(!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado',
                    email: `${req.body.email}`
                });
            }
            
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            
            if(!validPassword){
                return res.status(401).send({
                message: "Senha inválida.",
                statusCode: 401
                })
            }
            
            // jwt.sign(nome do usuário, SEGREDO)
            const token = jwt.sign({name: user.name}, SECRET);
            console.log("O token é esse:", token)
            
            res.status(200).send({
                message: "Login efetuado com sucesso!",
                token
            })
        })
    } catch(err) {
        console.error(err)
    }
};

const buscarTodosprofissionais = async (request, response) => {
  try {
    const profissionais= await ProfissionaisSchema.find();

    if (profissionais.length > 1) {
      return response.status(200).json({
        message: `Encontramos ${profissionais.length} profissionais.`,
        profissionais,
      });
    } else if (profissionais.length == 1) {
      return response.status(200).json({
        message: `Encontramos ${profissionais.length} profissionais.`,
        profissionais,
      });
    } else {
      return response.status(404).json({
        message: `Nenhum profissional está cadastrada até o momento.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const buscarprofissionaisId = async (request, response) => {
  const { id } = request.params;

  try {
    if (id.length < 24 || id.length > 24) {
      return response.status(404).json({
        message: `Por favor digite o id da profissional corretamente, o mesmo possui 24 caracteres.`,
      });
    }
    const profissionais= await ProfissionaisSchema.find({
      id,
    });
    if (profissionais.length == 0) {
      return response.status(200).json({
        message: `O profissional não foi encontrado.`,
      });
    }
    response.status(200).json(profissionais);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const criarprofissionais = async (request, response) => {
  const {
    
    name,
   telefone,
    cidade,
    cep,
    profissao,
    email,
    password,
  } = request.body;
  
  const senhaHasheada = bcrypt.hashSync(request.body.password, 10);
  request.body.password = senhaHasheada
 

  try {
    const profissionais = new ProfissionaisSchema({
      
      name: name,
      telefone: telefone,
      cidade: cidade,
      cep: cep,
      profissao: profissao,
      email: email,
      password: senhaHasheada
    
    });

    const salvarProfissionais = await profissionais.save();
    response.status(201).json({
      profissionais_cadastrada: salvarProfissionais,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

const atualizarprofissionais= async (request, response) => {
  const { id } = request.params;
  const {
    name,
    telefone,
    cidade,
    cep,
    profissao,
    email,
    password

    
  } = request.body;
  const senhaHasheada = bcrypt.hashSync(request.body.password, 10);

  try {
    if (id.length < 24 || id.length > 24) {
      return response.status(404).json({
        message: `Por favor digite o id da profissionaiscorretamente, o mesmo possui 24 caracteres.`,
      });
    }
    const profissionaisEncontrado = await ProfissionaisSchema.updateOne({
      name,
      telefone,
      cidade,
      cep,
      profissao,
      email,
      password: senhaHasheada
      
    });
    const profissionaisporId = await ProfissionaisSchema.find({
      id,
    });
    if (profissionaisporId.length == 0) {
      return response.status(404).json({
        message: `A profissionaisnão foi encontrado.`,
      });
    }
    response.json({
      profissionaisporId,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};
const deletarprofissionais = async (request, response) => {
  const { id } = request.params;

  try {
    if (id.length < 24 || id.length > 24) {
      return response.status(404).json({
        message: `Por favor digite o id do Profissional corretamente, o mesmo possui 24 caracteres.`,
      });
    }
    const profissionaisEncontrado = await ProfissionaisSchema.deleteOne({
      id,
    });
    if (profissionaisEncontrado.deletedCount === 1) {
      return response.status(200).send({
        message: `O profissional foi deletado com sucesso!`,
      });
    } else {
      return response.status(404).send({
        message: "O profissional não foi encontrada.",
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  buscarTodosprofissionais,
  buscarprofissionaisId,
  criarprofissionais,
  deletarprofissionais,
  atualizarprofissionais,
  login
};
