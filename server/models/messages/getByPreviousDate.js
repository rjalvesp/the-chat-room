const { getMainDatabase } = require("../../services/databases");
const { ValidatePreviousDateMessagesParams } = require("./helpers/validators");
const { collectionName } = require("./helpers/config");

const getPreviousDateMessages = async (data) => {
  ValidatePreviousDateMessagesParams(data);

  const db = await getMainDatabase();

  return db
    .collection(collectionName)
    .aggregate([
      {
        $match: {
          created: {
            $lt: new Date(data.previousDate),
          },
        },
        $lookup: {
          from: "authors",
          localField: "authorId",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: { path: "$authorInfo" } },
    ])
    .sort({ created: -1 })
    .limit(data.limit)
    .toArray();
};

module.exports = getPreviousDateMessages;
