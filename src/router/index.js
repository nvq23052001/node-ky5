import products from "./products";
import category from "./category";
import User from "./auth";
function route(app) {
  app.use("/api", products);
  app.use("/api", category);
  app.use("/api", User);
}

export default route;
