const config = require("config");
const { MongoClient } = require("mongodb");

const { connectionString, name } = config.databases.main;

const getMainDatabase = async () => {
  const client = await new MongoClient(connectionString).connect();
  const db = client.db(name);
  db.close = () => client.close();
  return db;
};

module.exports = { getMainDatabase };
