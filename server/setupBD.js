const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
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

function runQuery(query){
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err);
            return;
        }
        console.log(`${query} foi rodada com sucesso`)
        if(results){console.log(results)}
    });
}

print("Rodando script do banco")
runQuery(`
    CREATE TABLE Teste(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NULL,
        descricao VARCHAR(50) NULL
    )
`);



