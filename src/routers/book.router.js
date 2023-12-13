import express from "express";
import { BookController } from "../controllers/book.controller.js";

const router = express.Router();

const bookController = new BookController();

router.post("/book", bookController.createBook);

router.delete("/book", isAuth, bookController.cancleBook);

export { router as BookRouter };