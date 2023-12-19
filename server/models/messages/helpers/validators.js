const z = require("zod");

const ValidateSaveMessage = z.object({
  authorId: z.string(24),
  text: z.string().max(255),
}).parse;

const ValidatePreviousDateMessagesParams = z.object({
  limit: z.number().int().lte(100).default(0),
  previousDate: z.string().datetime(),
}).parse;

module.exports = {
  ValidateSaveMessage,
  ValidatePreviousDateMessagesParams,
};
