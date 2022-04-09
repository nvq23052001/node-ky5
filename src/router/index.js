import products from "./products";
import category from "./category";
import User from "./auth";
import Users from "./users";
function route(app) {
  app.use("/api", products);
  app.use("/api", category);
  app.use("/api", User);
  app.use("/api", Users);
}

export default route;
