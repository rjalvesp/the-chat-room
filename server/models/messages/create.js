const { ObjectId } = require("mongodb");
const { getMainDatabase } = require("../../services/databases");
const { collectionName } = require("./helpers/config");
const { ValidateSaveMessage } = require("./helpers/validators");

const createMessage = async (data) => {
  ValidateSaveMessage(data);
  const db = await getMainDatabase();
  const body = {
    ...data,
    authorId: new ObjectId(data.authorId),
    created: new Date(),
  };
  const response = await db.collection(collectionName).insertOne(body);
  db.close();
  return {
    _id: response.insertedId,
    ...body,
  };
};

module.exports = createMessage;
