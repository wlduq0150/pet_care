import express from "express";
import { BookController } from "../controllers/book.controller.js";
import { isAuth } from "../../middlewares/authMiddleware.js";

const router = express.Router();

const bookController = new BookController();

router.get("/books/me", isAuth, bookController.findMyBooks);

router.get("/books/:sitterId", bookController.findBooks);

router.post("/books", isAuth, bookController.createBook);

router.delete("/books/:bookId", isAuth, bookController.cancleBook);

export { router as BookRouter };