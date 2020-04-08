// const express = require("express");

// const server = express();
// const morgan = require("morgan");
// const helmet = require("helmet");

// // server.use(morgan("dev"));
// const melon = (req, res, next) => {
//   const split = req.query;
//   split.pass == "melon" ? next() : res.status(400).json("not correct key");
// };
// server.use(helmet());
// server.use(express.json());
// server.use(melon);
// server.get("/", (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

// server.listen(3005, () => {
//   console.log("server listening on port 3005");
// });

// // function logger(req, res, next) {}

// module.exports = server;
