import {
    Router
} from 'express';
import {
    UsersController
} from '../controllers/user.controller.js';
const usersRouter = Router();
import {
    verifyToken
} from '../../middlewares/authMiddleware.js';

const usersController = new UsersController();
//라우터 순서 중요하다
usersRouter.get('/users', verifyToken, usersController.readUsers); //모든 유저 정보 조회
usersRouter.get('/users/me', verifyToken, usersController.readMyInfo); // 내 정보 조회

usersRouter.get('/users/:id', verifyToken, usersController.readUserInfo); //상세 유저 정보 조회
usersRouter.delete('/users/:id', verifyToken, usersController.deleteUser); //강제회원삭제

usersRouter.patch('/users/me', verifyToken, usersController.updateUserInfo) //내 정보 수정
usersRouter.delete('/users/me', verifyToken, usersController.deleteMyId); //회원탈퇴
export {
    usersRouter
};