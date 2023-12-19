const { StatusCodes } = require("http-status-codes");

const {
  ValidateSaveMessage,
} = require("../../../../models/messages/helpers/validators");

const ensureCreateMessageBody = (req, res, next) => {
  try {
    req.body = ValidateSaveMessage({
      authorId: req.author._id.toString(),
      ...req.body,
    });
    next();
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

module.exports = {
  ensureCreateMessageBody,
};
