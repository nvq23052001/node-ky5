import express from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./router/index";
import mongoose from "mongoose";
import fs, { readdirSync, _dirname } from "fs";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

route(app);

//!Solution 2: Route
// readdirSync(__dirname + "/router").forEach((fileName) => {
//   import("./router/" + fileName)
//     .then(({ default: router }) => router.default)
//     .then((router) => {
//       app.use("/api", router);
//     });
// });

mongoose
  .connect("mongodb://localhost:27017/web16310")
  .then(() => {
    console.log("Connect is successfully!");
  })
  .catch((err) => console.log(err));

const port = 3000;
app.listen(port, (err) => {
  console.log("Post 4000");
});
