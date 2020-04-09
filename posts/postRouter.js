const express = require("express");
const router = express.Router();
const Posts = require("./postDb");

router.get("/", (req, res) => {
  Posts.get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res.status(500).json({ error: "server error", error: err })
    );
});

router.get("/:id", validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then((id) => res.status(200).json(id))
    .catch((err) =>
      res.status(500).json({ mesage: "server error", error: err })
    );
});

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then((deleted) => {
      deleted > 0 &&
        res
          .status(200)
          .json(
            `${deleted} items deleted. Post with id of ${req.params.id} removed`
          );
    })
    .catch((err) =>
      res.status(500).json({ message: "server error", error: err })
    );
});

router.put("/:id", validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) =>
      Posts.getById(req.params.id)
        .then((updated) => res.status(201).json(updated))
        .catch((err) => res.status(500).send("server error"))
    )
    .catch((err) =>
      res.status(500).json({ message: "server error", error: err })
    );
});

// custom middleware

function validatePostId(req, res, next) {
  Posts.getById(req.params.id).then((result) => {
    result === undefined
      ? res.status(404).json({ error: "couldnt find a matching post id" })
      : next();
  });
}

module.exports = router;
