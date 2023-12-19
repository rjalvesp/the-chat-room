const router = require("express").Router();
const ensureAuthenticated = require("./middlewares/ensureAuthenticated");

router.use("/messages", ensureAuthenticated, require("./messages"));
router.use("/authors", require("./authors"));

module.exports = router;
