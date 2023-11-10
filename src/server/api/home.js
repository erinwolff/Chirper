const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;


/** Gets all posts made by all users */
// /api/home
router.get("/", async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (err) {
    next(err);
  }
});