const { getMainDatabase } = require("../../services/databases");
const { collectionName } = require("./helpers/config");
const { ValidateSaveAuthor } = require("./helpers/validators");

const createAuthor = async (data) => {
  ValidateSaveAuthor(data);
  const db = await getMainDatabase();
  const body = {
    ...data,
    created: new Date(),
  };
  const response = await db.collection(collectionName).insertOne(body);
  db.close();
  return {
    _id: response.insertedId,
    ...body,
  };
};

module.exports = createAuthor;
