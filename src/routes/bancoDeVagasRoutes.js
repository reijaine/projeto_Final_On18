const express = require("express");
const router = express.Router();


const { checkAuth } = require("../middlewares/auth");

const bancoDeVagasController =require ("../controllers/bancoDeVagasController")


router.get("/buscartodasvagas",bancoDeVagasController.buscarvagas);
router.post("/criarvaga", bancoDeVagasController.criarvaga);
router.get("/buscarcargo", bancoDeVagasController.buscarVagaByCargo);
router.get("/buscarvaga/:id", bancoDeVagasController.buscarvagaId);
router.patch("/atualizarvaga/:id", bancoDeVagasController.atualizarvaga);
router.delete("/deletarvaga/:id", bancoDeVagasController.deletarvaga);
module.exports = router;