import { db } from "../../models/index.js"

export class BookRepository {

    createBook = async (createBookData) => {
        const result = await db.Book.create({
            ...createBookData
        });
        return result;
    }

}