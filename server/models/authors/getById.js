const { ObjectId } = require("mongodb");
const { getMainDatabase } = require("../../services/databases");
const { collectionName } = require("./helpers/config");

const getAuthorById = async (id) => {
  const db = await getMainDatabase();

  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
};

module.exports = getAuthorById;
