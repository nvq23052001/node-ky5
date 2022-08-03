import express from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./router/index";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import session from "express-session";
import fileUpload from "express-fileupload";

import fs, { readdirSync, _dirname } from "fs";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/uploads", express.static("uploads"));

const swaggerJSDocs = YAML.load("./api.yaml");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  console.log(`Post ${PORT}`);
});
