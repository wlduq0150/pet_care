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

}