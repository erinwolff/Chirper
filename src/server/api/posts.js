const { ServerError } = require("../errors");
const prisma = require("../prisma");

const router = require("express").Router();
module.exports = router;

/** User must be logged in to access posts. */
router.use((req, res, next) => {
  if (!res.locals.user) {
    return next(new ServerError(401, "You must be logged in."));
  }
  next();
});

/** Gets all posts */
// /api/posts
router.get("/", async (req, res, next) => {
  try {
    const result = await prisma.post.findMany({
      where: { userId: res.locals.user.id },
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// /** Creates new post and sends it */
// /api/posts
router.post("/", async (req, res, next) => {
  try {
    const { post } = req.body;
    if (!post) {
      throw new ServerError(400, "Post text required.");
    }

    const newPost = await prisma.post.create({
      data: {
        post: post,
        user: {
          connect: { id: res.locals.user.id }
        }
      },
    });
    res.json(newPost);
  } catch (err) {
    next(err);
  }
});

/** Checks if post exists and belongs to given user */
const validatePost = (user, post) => {
  if (!post) {
    throw new ServerError(404, "Post not found.");
  }

  if (post.userId !== user.id) {
    throw new ServerError(403, "This post does not belong to you.");
  }
};

// /** Sends single post by id */
// router.get("/:id", async (req, res, next) => {
//   try {
//     const id = +req.params.id;

//     const task = await prisma.task.findUnique({ where: { id } });
//     validateTask(res.locals.user, task);

//     res.json(task);
//   } catch (err) {
//     next(err);
//   }
// });

// /** Updates single post by id */
// router.put("/:id", async (req, res, next) => {
//   try {
//     const id = +req.params.id;
//     const { description, done } = req.body;

//     const task = await prisma.task.findUnique({ where: { id } });
//     validateTask(res.locals.user, task);

//     const updatedTask = await prisma.task.update({
//       where: { id },
//       data: { description, done },
//     });
//     res.json(updatedTask);
//   } catch (err) {
//     next(err);
//   }
// });

// /** Deletes single post by id */
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const post = await prisma.post.findUnique({ where: { id } });
    validatePost(res.locals.user, post);

    await prisma.post.delete({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
