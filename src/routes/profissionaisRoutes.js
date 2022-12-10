const express = require("express");
const router = express.Router();

const profissionaisController= require("../controllers/profissionaisController")

const { checkAuth } = require("../middlewares/auth");



router.post("/login", profissionaisController.login);
router.get("/buscartodos",profissionaisController.buscarTodosprofissionais);
router.post("/criarprofissionais", profissionaisController.criarprofissionais);
router.get("/buscarporid/:id", profissionaisController.buscarprofissionaisId)
router.delete("/deletar/:id", checkAuth, profissionaisController.deletarprofissionais)
router.patch("/atualizar/:id", profissionaisController.atualizarprofissionais)

module.exports = router;