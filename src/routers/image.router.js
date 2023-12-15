import express from "express";
import { uploadThumbnail } from "../../middlewares/imgUploadMiddleware.js";
import { ImageController } from "../controllers/image.controller.js";

const router = express.Router();

const imageController = new ImageController();

router.post("/image/upload", uploadThumbnail, imageController.uploadImage);

export { router as ImageRouter };