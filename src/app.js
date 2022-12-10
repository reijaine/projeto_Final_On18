const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config();

const db = require('./config/database');
const userRoutes = require('./routes/profissionaisRoutes');
const vagasRoutes = require('./routes/bancoDeVagasRoutes');
const indexRouter = require('./routes/indexRoutes')

db.connect();

app.use(indexRouter)
app.use(cors());
app.use(express.json());
app.use("/profissionais", userRoutes);
app.use("/vagas", vagasRoutes);
module.exports = app;
