import {
    UsersRepository
} from "../repository/user.repository.js";
export class UsersService {
    usersRepository = new UsersRepository();
    getUsers = async () => {
        return await this.usersRepository.readMany();
    }

    getUserById = async (userId) => { // 1. 인수로 로그인 세션을 받으면
        return await this.usersRepository.readOneById(userId); // 2. 세션에 저장되어있는 userId를 매개변수로 전달
    }

    updateUserById = async (userId, body) => {
        return await this.usersRepository.updateOneById(userId, body);
    }

    deleteUserById = async (userId) => {
        return await this.usersRepository.deleteOneById(userId);
    }
}