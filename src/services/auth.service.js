import { UsersRepository } from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    usersRepository = new UsersRepository();

    signup = async (createAuthData) => {
        const { email, name, password, checkPassword, role, experience, type } = createAuthData;
        const hashPassword = await bcrypt.hash(password, 10);
        const hashCreateAuthData = { email, name, hashPassword, role, experience, type };

        if (password !== checkPassword) {
            const error = new Error("패스워드를 다시 확인해주세요.");
            error.status = 403;
            throw error;
        }

        const result = await this.usersRepository.createUser(hashCreateAuthData);

        return {
            ok: true,
            message: "회원가입이 성공적으로 완료되었습니다.",
            data: result
        };
    }

    signin = async (signinData) => {
        const { email, password } = signinData;

        const auth = await this.usersRepository.readOneByEmail(email);

        if (!auth) {
            const error = new Error("존재하지 않는 이메일입니다.");
            error.status = 404;
            throw error;
        }

        const matchPassword = await bcrypt.compare(password, auth.password);

        if (!matchPassword) {
            const error = new Error("패스워드가 일치하지 않습니다.");
            error.status = 403;
            throw error;
        }

        return jwt.sign({ userId: auth.email }, process.env.COOKIE_SECRET, {
            expiresIn: "2h",
        });
    }
}