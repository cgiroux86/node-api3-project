const express = require("express");
const app = express();
const dotEnv = require("dotenv").config();
const logger = require("./utils/middleware");
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const port = process.env.PORT || 4444;

app.use(express.json());
app.use(logger);
app.get("/", (req, res) => {
  res.status(200).json(process.env.MESSAGE);
});
app.use("/api/users", userRouter.router);
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
