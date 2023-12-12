import { BookService } from "../services/book.service.js";

export class BookController {
    bookService = new BookService();

    createBook = async (req, res, next) => {
        try {
            const createBookData = req.body;

            const isValidData =
                "userId" in createBookData &&
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
        } catch (e) {
            next(e);
        }
    };
}
