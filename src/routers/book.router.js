import express from "express";
import { BookController } from "../controllers/book.controller.js";

const router = express.Router();

const bookController = new BookController();

router.post("/book", bookController.createBook);

export { router as BookRouter };