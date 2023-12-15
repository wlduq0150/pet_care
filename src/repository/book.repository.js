import { Sequelize } from "sequelize";
import { db } from "../../models/index.js";

export class BookRepository {
    findBooks = async (idType, id) => {
        const books = await db.Book.findAll({
            where: {
                [idType]: id
            },
            include: {
                model: db.User,
                as: "sitter",
                attributes: ["name"]
            }
        });
        return books;
    }

    findBookById = async (id) => {
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
