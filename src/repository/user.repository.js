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
    };

    readOneById = async (id) => {
        const user = await User.findOne({
            where: {
                id,
            },
        });

        return user;
    };

    /**
     * body = {
     *  email:
     * }
     */

    updateOneById = async (id, {
        email,
        previousPassword,
        password,
        experience,
        type
    }) => {
        const user = await this.readOneById(id);
        /** 
         * user = {
         *  id: 
         *  email:
         *  password:
         *  ...
         * }
        */
        if (!bcrypt.compare(previousPassword, user.password)) {
            // 기존 패스워드 유효성이 틀린 경우 에러 메시지 출력
        } // 기존 패스워드 유효성 확인       

        const hashedPassword = bcrypt.hashSync(password, 10);
        const updateData = {};
        if (email) {
            updateData.email = email;
        }
        if (password) {
            updateData.password = password;
        }
        // experience 입력 AND user.role === 'sitter'
        if (experience && user.role === 'sitter') {
            updateData.experience = experience;
        }
        if (type && user.role === 'customer') {
            updateData.type = type;
        }
        // 첫 번째 object : database에 변경할 내용
        // 두 번째 object : 변경할 행에 대한 조건문(where)
        const result = await User.update({
            email,
            password: hashedPassword,
            experience,
            type,
        }, {
            where: {
                id,
            },
        });

        return result;
    };

    deleteOneById = async (id) => {
        const result = await User.destroy({
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