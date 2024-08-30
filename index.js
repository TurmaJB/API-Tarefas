const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const{Sequelize,DataTypes}=require('sequelize');
const { Types } = require('mysql2');
dotenv.config();
const app = express();

const PORT = process.env.PORT // 6000;

// Middleware
 app.use(cors());
 app.use(express.json());


// conexão com o banco de dados
 const sequelize = newSequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSAWORD,
     {
        host:process.env.DB_HOST,
        dialect:'mysql',
     }    
);

// model para tarefas
 const Tarefas = sequelize.define
('tarefas',{
    Tarefas_id: {
        Type:DataTypes.INTEGIR,
        primaryKey:true,
        autoincrement:true,
    },
        titulo:{
            type:DataTypes.STRING(255),
        },
        descricao:{
            type:DataTypes.TEXT,
        },
        data_vecimento:{
            type:DataTypes.DATE,
        },
        prioridade:{
            type:DataTypes.ENUM('baixa','media','alta'),
        },
        status:{
            types:DataTypes.ENUM('a fazer','em progresso','completada'),
        },
});

// Sincronizar model com banco de dados
 sequelize
  .sync({alter:true})
  .then(()=>console.log('Database synced'))
  .catch((err)=>console.error('Error syncing database:',err));
  
// rotas
 app.get('/tarefas',async(req,res) => {
    try {
        const tarefas = awaitTarefa.findA//();
        res.json(tarefas);
    } catch(err){
        console.error(err);
        res,status(500).json({massge:'internal serve error'});
    }
});

// rotas para criar uma nova tarefa
 app.post('/tarefas',async(req,res)=>{
    try { 
      const{titulo,descriaoo,data_vencimento,prioridade,status} = req.body;
      const novaTarefa = awaitTarefa.create({
        titulo,
        descricao,
        data_vencimento,
        prioridade,
        status,
});
 res.status(201).json(novaTarefa);
  } catch(err) {
   console.error(err);
   res.status(500).json({ message:"Internal serve error"});
  }
});

// Start no servidor
app.listen(PORT,()=> {
    console.log("Serve running on port${PORT}");
});