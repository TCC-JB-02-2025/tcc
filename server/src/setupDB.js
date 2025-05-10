const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

console.log("Conectando ao banco de dados");
console.log("Host: ", process.env.DB_HOST);
console.log("Porta: ", process.env.DB_PORT);
console.log("Banco (Lembre-se de criar o banco antes): ", process.env.DB_NAME);

// SQL para dropar e criar o banco de dados
const SETUP_DATABASE_SQL = `
-- Dropar o banco de dados existente (se houver)
-- Isso pode falhar se houver conexões ativas, mas é útil para limpeza em desenvolvimento
DROP DATABASE IF EXISTS ${process.env.DB_NAME};

-- Criar o banco de dados
CREATE DATABASE ${process.env.DB_NAME};
`;

// --- Função para rodar uma única consulta ---
function runSingleQuery(connection, query, description) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error(`Erro ao executar a consulta (${description}):`, err);
                console.log("Consulta que falhou:", query);
                return reject(err);
            }
            console.log(`${description} rodada com sucesso`);
            resolve(results);
        });
    });
}

// --- Função principal para rodar as migrações ---
async function runMigrations() {
    const migrationsDir = path.join(__dirname, '..', 'migrations');

    // --- Fase 1: Configurando o banco de dados (Drop e Create) ---
    console.log("--- Fase 1: Configurando o banco de dados ---");
    let initialConnection;
    try {
        // Conecta SEM especificar o banco de dados inicialmente
        initialConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true, // Permite múltiplas instruções SQL
        });

        await new Promise((resolve, reject) => {
            initialConnection.connect(err => {
                if (err) return reject(err);
                console.log("Conectado ao servidor MySQL (sem banco de dados selecionado).");
                resolve();
            });
        });

        // Executa o SQL de setup inicial diretamente da string
        await runSingleQuery(initialConnection, SETUP_DATABASE_SQL, `Setup inicial do banco '${process.env.DB_NAME}'`);

    } catch (error) {
        console.error("Erro na Fase 1 de configuração do banco de dados:", error);
        // Garante que a conexão seja fechada antes de sair
        if (initialConnection) initialConnection.end();
        process.exit(1); // Sai do processo se a configuração inicial falhar
    } finally {
        // Garante que a conexão seja fechada
        if (initialConnection) initialConnection.end();
        console.log("Conexão inicial fechada.");
    }

    // --- Fase 2: Rodar as migrações restantes ---
    console.log("\n--- Fase 2: Rodando as migrações ---");
    let migrationsConnection;
    try {
        // Conecta AGORA especificando o banco de dados
        migrationsConnection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME, // Agora especifica o banco
            multipleStatements: true,
        });

        await new Promise((resolve, reject) => {
            migrationsConnection.connect(err => {
                if (err) return reject(err);
                console.log(`Conectado ao banco de dados '${process.env.DB_NAME}' para migrações.`);
                resolve();
            });
        });

        // Lê e ordena os arquivos .sql na pasta de migrações
        const files = fs.readdirSync(migrationsDir);
        const sqlFiles = files.filter(file => file.endsWith('.sql')).sort();

        // Filtra qualquer arquivo que possa ter sido usado para setup inicial (como 000_setup_db.sql)
        // Embora agora o SQL esteja inline, mantemos a robustez caso o arquivo exista.
        const remainingSqlFiles = sqlFiles.filter(file => !file.startsWith('000_')); // Assume que arquivos de setup começam com 000_

        for (const file of remainingSqlFiles) {
            const filePath = path.join(migrationsDir, file);
            const sqlStr = fs.readFileSync(filePath, 'utf8');
            await runSingleQuery(migrationsConnection, sqlStr, file); // Passa o nome do arquivo como descrição
        }

    } catch (error) {
        console.error("Erro na Fase 2 das migrações:", error);
        // O erro específico já foi logado pela runSingleQuery
    } finally {
        if (migrationsConnection) {
            migrationsConnection.end(err => {
                if (err) {
                    console.error("Erro ao fechar a conexão das migrações:", err);
                } else {
                    console.log("Conexão das migrações fechada com sucesso.");
                }
            });
        }
    }
}

// Inicia o processo de migração
runMigrations();
