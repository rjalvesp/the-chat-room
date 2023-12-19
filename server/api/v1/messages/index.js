const { pick } = require("ramda");
const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();
const { emitMessage } = require("../../../bin/socket");

const MessagesModel = require("../../../models/messages");
const {
  ensureCreateMessageBody,
  ensureSearchMessageBody,
} = require("./middlewares");

router.post("/", ensureCreateMessageBody, async (req, res, next) => {
  try {
    const {
      author: { _id: authorId },
      body,
    } = req;
    const data = await MessagesModel.save({ authorId, ...body });
    emitMessage({ ...data, authorInfo: req.author });
    res.status(StatusCodes.CREATED).json(pick(["id"], data));
  } catch (e) {
    next();
  }
});

router.post("/search", ensureSearchMessageBody, async (req, res, next) => {
  try {
    const data = await MessagesModel.fetchOlder(req.body);
    res.status(StatusCodes.OK).json(data);
  } catch (e) {
    next();
  }
});

module.exports = router;
