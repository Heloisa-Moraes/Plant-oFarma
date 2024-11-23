const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;  // Porta fixa para o ambiente local ou produção

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Para processar o JSON enviado no body das requisições

// Conexão com o MongoDB
const uri = "mongodb+srv://lucasolivato:4vVi5OEZ6SiA575k@plantaofarmadb.bluqj.mongodb.net/?retryWrites=true&w=majority&appName=plantaoFarmaDB";
const client = new MongoClient(uri);

// Conectar ao MongoDB
async function connect() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
    throw err;  // Re-throw para que o servidor não seja iniciado sem a conexão
  }
}

// Rota para a raiz "/"
app.get('/', (req, res) => {
  res.status(200).send('API funcionando! Acesse /farmacias para ver a lista de farmácias ou /postos para ver a lista de postos de saúde.');
});

// Rota GET para obter todas as farmácias
app.get('/farmacias', async (req, res) => {
  try {
    const db = client.db("plantaoFarmaDB");
    const farmacias = await db.collection("Farmacias").find({}).toArray();
    res.status(200).json(farmacias);
  } catch (error) {
    console.error("Erro ao buscar farmácias:", error);
    res.status(500).json({ error: "Erro ao buscar farmácias" });
  }
});

// Rota GET para obter todos os postos de saúde
app.get('/postos', async (req, res) => {
  try {
    const db = client.db("plantaoFarmaDB");
    const postos = await db.collection("Postos").find({}).toArray();
    res.status(200).json(postos);
  } catch (error) {
    console.error("Erro ao buscar postos de saúde:", error);
    res.status(500).json({ error: "Erro ao buscar postos de saúde" });
  }
});

// Iniciar o servidor após a conexão com o MongoDB
async function startServer() {
  try {
    await connect();  // Conectar ao MongoDB antes de iniciar o servidor
    app.listen(port, '0.0.0.0', () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);  // Caso não consiga conectar ao MongoDB, não inicie o servidor
  }
}

startServer();
