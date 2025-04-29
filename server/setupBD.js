const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();


const connection = mysql.createConnection({
    // Configurações do banco de dados usando as variaveis de ambiente
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true, // Permite múltiplas instruções SQL em uma única consulta
    

    waitForConnections: true, // Espera por conexões evitando criar novas
    connectionLimit: 10, // Limite de conexões simultâneas
    queueLimit: 0 // Sem limite de filas de espera
});

console.log("Conectando ao banco de dados");
console.log("Host: ", process.env.DB_HOST);
console.log("Porta: ", process.env.DB_PORT);
console.log("Banco (Lembre-se de criar o banco antes): ", process.env.DB_NAME);

function runQuery(query, file){
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err);
            console.log("Consulta: ", query);
            return;
        }
        console.log(`${file} foi rodada com sucesso`)
        //if(results){console.log(results)}
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

    sqlFiles.forEach( (file,fileIndex) => {
        const filePath = path.join(migrationsDir, file);
        const sqlStr = fs.readFileSync(filePath, 'utf8');

        //console.log("Rodando: ", file);
        runQuery(sqlStr, file);

        if (fileIndex === sqlFiles.length - 1) {
            setTimeout(() => {
                connection.end(err => {
                    if (err) {
                        console.error("Erro ao fechar a conexão:", err);
                    } else {
                        console.log("Conexão fechada com sucesso.");
                    }
                });
            }, 3000); // Aguarda 3 segundo antes de fechar a conexão
        }
    });
}

// Run the migration function
runMigrations();

