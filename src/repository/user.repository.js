import bcrypt from "bcrypt";
import {
    db
} from "../../models/index.js";

const {
    User
} = db;

export class UsersRepository {
    readSitters = async () => {
        const users = await User.findAll({
            where: {
                role: "sitter",
            },
        });

        return users;
    }

    readOneById = async (id) => {
        const user = await User.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    /**
     * body = {
     *  email:
     * }
     */

    updateOneById = async (id, data
    ) => {
        const user = await this.readOneById(id);
        /** 
         * user = {
         *  id: 
         *  email:
         *  password:
         *  ...
         * }
        */
        // 첫 번째 object : database에 변경할 내용
        // 두 번째 object : 변경할 행에 대한 조건문(where)
        const result = await User.update({
         ...data
        }, {
            where: {
                id,
            },
        });

        return result;
    };

    deleteOneById = async (id) => {
        const result = await db.User.destroy({
            where: {
                id,
            },
        });

        return result;
    };

    createUser = async (hashCreateAuthData) => {
        const result = await db.User.create({
            ...hashCreateAuthData,
        });
        return result;
    };

    readOneByEmail = async (email) => {
        const user = await db.User.findOne({
            where: {
                email
            }
        });
        return user;
    };
}