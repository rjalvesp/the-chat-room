const { StatusCodes } = require("http-status-codes");

const {
  ValidatePreviousDateMessagesParams,
} = require("../../../../models/messages/helpers/validators");

const ensureSearchMessageBody = (req, res, next) => {
  try {
    req.body = ValidatePreviousDateMessagesParams(req.body);
    next();
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

module.exports = {
  ensureSearchMessageBody,
};
