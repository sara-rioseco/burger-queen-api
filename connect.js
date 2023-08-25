const { MongoClient } = require('mongodb');
const config = require('./config');

const client = new MongoClient(config.dbUrl);

async function connect() {
  try {
    await client.connect();
    const db = client.db('db');
    console.log('Conexión a la base de datos establecida');
    return db;
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
  }
}

module.exports = { connect };
