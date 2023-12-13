import { Router } from 'express';
import { UsersController } from '../controllers/user.controller.js';
const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/user',  usersController.readUsers); //모든 유저 정보 조회
usersRouter.get('/user/me',  usersController.readMyInfo); // 내 정보 조회
usersRouter.get('/user/:id',  usersController.readUserInfo);//상세 유저 정보 조회
usersRouter.patch('/user/me', usersController.updateUserInfo)//내 정보 수정
usersRouter.delete('/user/me',  usersController.deleteMyId);//회원탈퇴
export { usersRouter };