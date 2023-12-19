const z = require("zod");

const ValidateSaveAuthor = z.object({
  nickname: z.string().max(255),
}).parse;

module.exports = {
  ValidateSaveAuthor,
};
