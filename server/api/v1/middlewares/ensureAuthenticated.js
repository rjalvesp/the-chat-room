const { faker } = require("@faker-js/faker");
const { path, pipe, split } = require("ramda");

const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const AuthorsModel = require("../../../models/authors");

const ensureAuthenticated = async (req, res, next) => {
  const [_, id] = pipe(path(["headers", "authorization"]), split(" "))(req);
  if (!id) {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  req.author = await AuthorsModel.get(id);

  if (!req.author) {
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
    return;
  }

  next();
};

module.exports = ensureAuthenticated;
