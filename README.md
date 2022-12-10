## 📂 ARQUITETURA MVC
```
 📁PROJETO FINAL
   |
   |-  📁 src
   |    |
   |    |- 📁 config
   |         |- 📑 database.js

   |    |- 📁 controllers
   |         |- 📑 bancoDeVagasController.js
   |         |- 📑 profissionaisController.js
   |
   |    |- 📁 middlewares
   |         |- 📑 auth.js
   |
   |    |- 📁 models
   |         |- 📑bancoDeVagasSchema.js
   |         |- 📑ProfissionaisSchema.js
   |
   |    |- 📁 routes
   |         |- 📑bancoDeVagasRoutes.js 
   |         |- 📑profissionaisRoutes.js 
   |     
   |
   |    |- 📑 app.js
   |    
   |
   |
   |- 📑 .env
   |- 📑 .gitignore
   |- 📑 package-lock.json
   |- 📑 package.json
   |- 📑 README.me
   |- 📑 server.js

## ROTAS
   
##  ROTAS - PROFISSIONAIS

| Método HTTP  | Endpoint              | Descrição                                  |
| ------------ | --------------------- | ------------------------------------------ |
| GET          | `/profissionais/buscartodos`         | Busca todos os profissionais cadastrados    
| GET          | `/profissionais/buscarporid:/id       | Busca todos os profissionais cadastrados por id           |
| POST        | `/profissionais/criarprofissionais   | Cadastro dos profissionais   
| POST        | `/profissionais/login   | Login dos usuarios           |
| PATCH     | `/profissionais/atualizar/:Id       | Atualizar o cadastro dos profissionais           |
| DELETE          | `profissionais/delete/:id`     | Deletar um cadastro por ID  |


    ##  ROTAS - VAGAS

| Método HTTP  | Endpoint              | Descrição                                  |
| ------------ | --------------------- | ------------------------------------------ |
| GET          | `/vagas/buscartodasvagas`         | Buscar todas os vagas cadastradas    
| GET          | `/vagas/buscarvaga:/id       | Buscar todas as vagas por id   
| GET          | `/vagas/buscarcargo      | Buscar vaga por cargo        
| POST        | `/vagas/criarvagas   | Cadastro das vagas   
| PATCH     | `/vagas/atualizarvaga/:id      | Atualizar o cadastro das vagas      
| DELETE          | `vagas/delete/:id`     | Deletar uma vaga por ID  |

