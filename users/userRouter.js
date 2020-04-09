const express = require("express");

const router = express.Router();

const data = require("./userDb");
const posts = require("../posts/postDb");

module.exports = { router, validateUser };

router.post("/", validateUser, (req, res) => {
  data
    .insert(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => console.log(err));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  posts
    .insert(req.body)
    .then((all) => res.status(201).json(all))
    .catch((err) => res.status(500).json({ error: "server error" }));
});

router.get("/", (req, res) => {
  data.get().then((users) => res.send(users));
});

router.get("/:id", validateUserId, (req, res) => {
  data.getById(req.params.id).then((user) => res.status(200).json(user));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  data
    .getUserPosts(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: "server error" }));
});

router.delete("/:id", validateUserId, (req, res) => {
  data
    .remove(req.params.id)
    .then((id) => res.status(200).json(`${id} records deleted`))
    .catch((err) => res.status(500).json({ error: "server error" }));
});

router.put("/:id", validateUserId, (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  data
    .update(req.params.id, req.body)
    .then((updated) =>
      res
        .status(201)
        .json(`${updated} item updated, with id of ${req.params.id}`)
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//custom middleware

function validateUserId(req, res, next) {
  data
    .getById(Number(req.params.id))
    .then((result) =>
      result === undefined
        ? res.status(404).json({ error: "invalid user id" })
        : next()
    )
    .catch((err) => res.status(500).json({ error: "server error" }));
}

function validateUser(req, res, next) {
  req.body.hasOwnProperty("name")
    ? next()
    : res.status(404).json({ error: "missing post data" });
}

function validatePost(req, res, next) {
  console.log(req.body);
  req.body == {}
    ? res.status(400).json({ error: "missing post data" })
    : !req.body.hasOwnProperty("text")
    ? res.status(400).json({ error: "missing required text field" })
    : next();
}
