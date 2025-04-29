const mysql = require("mysql2");
const fs = require("fs");
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

async function runMigrations() {
    // Define a pasta onde estão os arquivos de migração
    const migrationsDir = path.join(__dirname, 'migrations');

    // Verifica se a pasta de migrações existe
    const files = fs.readdirSync(migrationsDir);

    // Verifica se existem arquivos .sql na pasta de migrações e os ordena em 
    // ordem alfabética (ou numérica, dependendo do nome do arquivo)
    const sqlFiles = files.filter(file => file.endsWith('.sql')).sort();

    console.log(sqlFiles)
}

// Run the migration function
runMigrations();

