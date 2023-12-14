import { BookService } from "../services/book.service.js";

export class BookController {
    bookService = new BookService();

    createBook = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const createBookData = {
                ...req.body,
                userId
            };

            const isValidData =
                createBookData["userId"] &&
                "sitterId" in createBookData &&
                "requirement" in createBookData &&
                "date" in createBookData;

            if (!isValidData) {
                const error = new Error("유효하지 않은 데이터입니다.");
                error.status = 400;
                throw error;
            }

            const result = await this.bookService.createBook(createBookData);

            return res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    cancleBook = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const bookId = parseInt(req.params.bookId);

            const isValidId = bookId && !isNaN(bookId);

            if (!isValidId) {
                const error = new Error("유효하지 않은 데이터입니다.");
                error.status = 400;
                throw error;
            }

            const result = await this.bookService.cancleBook(userId, bookId);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}
