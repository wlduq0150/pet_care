import { db } from "../../models/index.js";

export class BookRepository {
    findBook = async (id) => {
        const book = await db.Book.findOne({ where: { id } });
        return book;
    };

    createBook = async (createBookData) => {
        const result = await db.Book.create({
            ...createBookData,
        });
        return result;
    };

    cancleBook = async (id) => {
        const result = await db.Book.destroy({ where: { id } });
        return result;
    }
}
