import { Router } from "express";

import UserController from "../controllers/user";

const router = Router();
router.route("/users").get(UserController.getUser);

export default router;
