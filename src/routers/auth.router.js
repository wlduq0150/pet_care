import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

const authController = new AuthController();

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

export { router as AuthRouter };