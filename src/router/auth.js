import { Router } from "express";

import AuthController from "../controllers/auth";

const router = Router();
router.route("/login").post(AuthController.login);
router.route("/signup").post(AuthController.signup);

export default router;
