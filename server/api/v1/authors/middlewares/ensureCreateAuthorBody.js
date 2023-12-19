const { StatusCodes } = require("http-status-codes");

const {
  ValidateSaveAuthor,
} = require("../../../../models/authors/helpers/validators");

const ensureCreateAuthorBody = (req, res, next) => {
  try {
    req.body = ValidateSaveAuthor(req.body);
    next();
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

module.exports = {
  ensureCreateAuthorBody,
};
