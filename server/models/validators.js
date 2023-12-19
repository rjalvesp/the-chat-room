const z = require("zod");

const ValidateUUID = z.string().uuid().parse;

module.exports = {
  ValidateUUID,
};
