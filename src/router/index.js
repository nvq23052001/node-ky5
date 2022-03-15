import products from "./products";

function route(app) {
  app.use("/api", products);
}

export default route;
