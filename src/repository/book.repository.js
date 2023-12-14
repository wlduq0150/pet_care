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
                as: "sitters"
            }
        });

        // const books = await db.sequelize.query(
        //     "select b.*, u.name as sitter from books b " + 
        //     "inner join users u " + 
        //     "on b.sitterId = u.id " + 
        //     "where userId = 19;"
        // );
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
