const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 10000 

const app = express();

app.use(bodyParser.json()); 
app.use(cors()); 


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // Convert port to a number
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0    
});
    

app.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;  // Get the IP address
    const method = req.method;
    const url = req.url;
  
    console.log(`${ip} ${method}: ${url}`);
  
    next();
});

  
// db.connect((err) => {
//     if (err) {
//         console.log("erro de conexão com o banco:",err);
//         return
//     }
//     console.log("Connected to MySQL");
// });

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

// app.post("/", (req,res) => {
//     //const {name, message} = req.body
//     const name = req.body.name
//     const message = req.body.message
    
//     console.log(req.body);
//     if(!name || !message){
//         res.status(400).json({error: "Name e Message são obrigatorios"});
//         return
//     }

//     db.query("INSERT INTO messages(name,message) VALUES (?,?)", [name,message], (err,results) =>{
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
        
//         const resposta = {
//             id: results.insertId,
//             name: name,
//             message: message
//         }
//         res.json(resposta);
//     });

// });

// app.delete('/:id', (req, res) => {
//     const id = req.params.id;

//     db.query('DELETE FROM messages WHERE id = ?', [id], (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Message not found' });
//         }
//         res.json({ message: 'Message deleted successfully' });
//     });
// });


app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta 3000`);
});