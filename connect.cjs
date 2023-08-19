/* eslint-disable no-console */
// configuración copiada de un ejemplo
// tal vez hay que cambiar

const { MongoClient } = require('mongodb');
const config = require('./config');

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log('Databases:');
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }

// async function main() {
const client = new MongoClient(config.dbUrl);

async function connect() {
  try {
    await client.connect();
    const db = client.db('db');
    console.log(db);
    return db;

    // Make the appropriate DB calls
    // await listDatabases(client);
  } catch (error) {
    //
    console.error(error);
  }
  //   finally {
  //     await client.close();
  //   }
}

// main().catch(console.error);

module.exports = { connect };
