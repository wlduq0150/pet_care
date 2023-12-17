import {
    Router
} from 'express';
import {
    UsersController
} from '../controllers/user.controller.js';
const usersRouter = Router();
import {
     isAuth
} from "../../middlewares/authMiddleware.js";

const usersController = new UsersController();
//라우터 순서 중요하다
usersRouter.get('/users', usersController.readUsers); //모든 유저 정보 조회
usersRouter.get('/users/me', isAuth, usersController.readMyInfo); // 내 정보 조회

usersRouter.get('/users/:id', isAuth, usersController.readUserInfo); //상세 유저 정보 조회

usersRouter.patch('/users/me', isAuth, usersController.updateUserInfo) //내 정보 수정
usersRouter.delete('/users/me', isAuth, usersController.deleteMyId); //회원탈퇴
usersRouter.delete('/users/:id', isAuth, usersController.deleteUser); //강제회원삭제
export {
    usersRouter
};