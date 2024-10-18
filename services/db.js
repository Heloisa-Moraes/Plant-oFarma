const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://lucasolivato:2eEen56rtYSwjUwP@plantaofarmadb.bluqj.mongodb.net/?retryWrites=true&w=majority&appName=plantaoFarmaDB";

let client;

async function connectToDatabase() {
  if (!client) {
    try {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log('Conectado ao MongoDB Atlas');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
      throw error;
    }
  }
  return client.db("plantaoFarmaDB");
}

// Função para buscar farmácias próximas com base na latitude e longitude do usuário
async function fetchFarmaciasProximas(latitude, longitude) {
  const db = await connectToDatabase();
  const collection = db.collection('Farmacias');

  try {
    // Encontra farmácias ordenadas pela proximidade usando GeoJSON
    const farmacias = await collection.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude] // Lembre-se de que MongoDB armazena coordenadas na ordem [longitude, latitude]
          },
          $maxDistance: 5000 // 5km de raio
        }
      }
    }).toArray();

    return farmacias;
  } catch (error) {
    console.error('Erro ao buscar farmácias próximas:', error);
    throw error;
  }
}

module.exports = { connectToDatabase, fetchFarmaciasProximas };
