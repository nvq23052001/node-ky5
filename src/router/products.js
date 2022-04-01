import Router from "express";
import express from "express";

import {
  checkAuth,
  isAdmin,
  isAuth,
  requiredSigin,
} from "../middlewares/checkAuth";
import products from "../controllers/products";
import user from "../controllers/user";

const router = Router();

router.route("/products").get(checkAuth, products.getAllProduct);

router
  .route("/products/:userId")
  .post(requiredSigin, isAuth, isAdmin, products.createProduct);

router
  .route("/product/:id/:userId")
  .get(products.getProduct)
  .delete(requiredSigin, isAuth, isAdmin, products.deleteProduct)
  .put(requiredSigin, isAuth, isAdmin, products.updateProduct);

// Author
router.param("userId", user.userById);

// Search
router.route("/products/search").get(products.searchProduct);

export default router;
