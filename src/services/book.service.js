import { BookRepository } from "../repository/book.repository.js";

export class BookService {

    bookRepository = new BookRepository();
    // userRepository = new UserRepository();  

    createBook = async (createBookData) => {
        const { userId, sitterId } = createBookData;

        // const user = await this.userRepository.findByID(userId);
        // const sitter = await this.userRepository.findByID(sitterId);

        // if (!user || !sitter) {
        //     const error = new Error("존재하지 않는 사용자입니다.");
        //     error.status = 404;
        //     throw error;
        // }

        const result = await this.bookRepository.createBook(createBookData);

        return {
            ok: true,
            message: "예약을 성공적으로 등록하셨습니다.",
            data: result
        };
    }

    cancleBook = async (userId, bookId) => {
        const book = await this.bookRepository.findBook(bookId);

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