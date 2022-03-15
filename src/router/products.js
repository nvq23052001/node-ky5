import Router from "express";
import express from "express";

import { checkAuth } from "../middlewares/checkAuth";
import products from "../controllers/products";

const router = Router();

router
  .route("/products")
  .get(checkAuth, products.getAllProduct)
  .post(checkAuth, products.createProduct);

router
  .route("/product/:id")
  .get(checkAuth, products.getProduct)
  .delete(checkAuth, products.deleteProduct)
  .put(checkAuth, products.updateProduct);

export default router;
