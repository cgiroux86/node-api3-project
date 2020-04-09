const express = require("express");
const app = express();
const logger = require("./utils/middleware");
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

app.use(express.json());
app.use(logger);
app.use("/api/users", userRouter.router);
app.use("/api/posts", postsRouter);

app.listen(process.env.PORT || 4444, () => {
  console.log("listening on port 5005");
});
