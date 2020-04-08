const express = require("express");
const app = express();
const logger = require("./utils/middleware");
const userRouter = require("./users/userRouter");
// const validateUser = require("./users/userRouter");

app.use(express.json());
app.use(logger);

app.use("/", userRouter.router);

app.listen(5005, () => {
  console.log("listening on port 5005");
});
