const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para processar o JSON enviado no body das requisições

// Conexão com MongoDB
const uri = "mongodb+srv://lucasolivato:2eEen56rtYSwjUwP@plantaofarmadb.bluqj.mongodb.net/?retryWrites=true&w=majority&appName=plantaoFarmaDB";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
  }
}

connect();

// Rota GET para obter todas as farmácias
app.get('/farmacias', async (req, res) => {
  try {
    console.warn('chegou aqui');
    const db = client.db("plantaoFarmaDB");
    console.warn('chegou aqui 2');
    
    const farmacias = await db.collection("Farmacias").find({}).toArray();
    console.warn('chegou aqui 3');
    res.json(farmacias);
  } catch (err) {
    console.error("Erro ao buscar farmácias", err);
    res.status(500).json({ error: "Erro ao buscar farmácias" });
  }
});

// Rota POST para adicionar uma nova farmácia
app.post('/farmacias', async (req, res) => {
  const { nome, endereco, telefone, latitude, longitude, abre, fecha } = req.body;

  if (!nome || !endereco || !telefone) {
    return res.status(400).json({ error: "Dados obrigatórios: nome, endereço e telefone." });
  }

  const novaFarmacia = {
    nome,
    endereco,
    telefone,
    latitude: latitude || null,
    longitude: longitude || null,
    abre: abre || null,
    fecha: fecha || null
  };

  try {
    const db = client.db("plantaoFarmaDB");
    const result = await db.collection("Farmacias").insertOne(novaFarmacia);
    res.status(201).json({ message: "Farmácia adicionada com sucesso", farmaciaId: result.insertedId });
  } catch (err) {
    console.error("Erro ao adicionar farmácia", err);
    res.status(500).json({ error: "Erro ao adicionar farmácia" });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
