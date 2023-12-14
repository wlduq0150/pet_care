import express from "express";
import { BookController } from "../controllers/book.controller.js";
import { isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

const bookController = new BookController();

router.post("/book", isAuth, bookController.createBook);

router.delete("/book/:bookId", isAuth, bookController.cancleBook);

export { router as BookRouter };