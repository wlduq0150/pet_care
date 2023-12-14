import { BookRepository } from "../repository/book.repository.js";
import { UsersService } from "./user.service.js";

export class BookService {

    bookRepository = new BookRepository();
    userService = new UsersService();  

    findBooks = async (userId) => {
        const user = await this.userService.getUserById(userId);

        const idType = user.role === "customer" ? "userId" : "sitterId";

        const books = await this.bookRepository.findBooks(idType, userId);

        return {
            ok: true,
            message: "예약을 조회하셨습니다.",
            data: books
        };
    }

    createBook = async (createBookData) => {
        const { userId, sitterId } = createBookData;

        const user = await this.userService.getUserById(userId);
        const sitter = await this.userService.getUserById(sitterId);

        if (!user || !sitter) {
            const error = new Error("존재하지 않는 사용자입니다.");
            error.status = 404;
            throw error;
        }

        const result = await this.bookRepository.createBook(createBookData);

        return {
            ok: true,
            message: "예약을 성공적으로 등록하셨습니다.",
            data: result
        };
    }

    cancleBook = async (userId, bookId) => {
        const book = await this.bookRepository.findBookById(bookId);

        if (!book) {
            const error = new Error("존재하지 않는 예약 정보입니다.");
            error.status = 404;
            throw error;
        }

        if (book.userId !== userId) {
            const error = new Error("예약을 취소할 권한이 없습니다.");
            error.status = 403;
            throw error;
        }

        await this.bookRepository.cancleBook(bookId);
        
        return {
            ok: true,
            message: "예약을 성공적으로 취소했습니다."
        };
    }

}