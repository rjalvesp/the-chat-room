const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();

const AuthorsModel = require("../../../models/authors");
const { ensureCreateAuthorBody } = require("./middlewares");

router.post("/", ensureCreateAuthorBody, async (req, res, next) => {
  try {
    const data = await AuthorsModel.save(req.body);
    res.status(StatusCodes.CREATED).json(data);
  } catch (e) {
    next();
  }
});

module.exports = router;
