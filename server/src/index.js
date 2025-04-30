//Funcionalidade principal
const express = require("express");
const mysql = require("mysql2");

//Coisas do Express
const bodyParser = require("body-parser");
const cors = require("cors");

//Inicialização do dotenv para usar variaveis de ambiente (estão no arquivo .env)
const dotenv = require("dotenv");
dotenv.config();

//Constantes
const PORT = process.env.PORT || 10000 

//Inicialização do servidor
const app = express();


// Configuração do servidor
app.use(bodyParser.json()); // Faz o parse do body das requisições para JSON
app.use(cors()); // Permite requisições de outros domínios (CORS)



// Criação do pool de conexões com o BD
// (pool é um conjunto de conexões que podem ser reutilizadas,
// o que melhora a performance do servidor e não precisa ficar
// criando e destruindo conexões toda hora)
const pool = mysql.createPool({
    // Configurações do banco de dados usando as variaveis de ambiente
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true, // Espera por conexões evitando criar novas
    connectionLimit: 10, // Limite de conexões simultâneas
    queueLimit: 0 // Sem limite de filas de espera
});

// Importando as rotas
const userRoutes = require("./userRoutes")(pool);

// Usando as rotas
app.use("/users", userRoutes);

// Printa no console o IP, método e URL de cada requisição
app.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;  // Get the IP address
    const method = req.method;
    const url = req.url;
  
    console.log(`${ip} ${method}: ${url}`);
  
    next();
});

app.get("/ping", (req, res) => {
    res.json({ message: "Pong!" });
});


app.get("/", (req,res) => {
    pool.query("SELECT * FROM teste", (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err);
            res.status(500).json({ error: "Erro ao executar a consulta" });
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, ()=>{
    //console.log(process.env)
    console.log(`Servidor rodando na porta ${PORT}`);
});
