import {
  UsersService
} from "../services/user.service.js";
export class UsersController {
  usersService = new UsersService();

  readMyInfo = async (req, res, next) => {
    try {
      // session에서 userId를 받아와야 함
      // this. === UsersController.
      const me = await this.usersService.getUserById(1);

      return res.status(200).json({
        success: true,
        message: '펫 시터 프로필 조회에 성공했습니다.',
        data: me,
      });

    } catch (error) {
      next(error);
    }
  };

  readUsers = async (req, res, next) => {
    try {
      const users = await this.usersService.getUsers();

      return res.status(200).json({
        success: true,
        message: '유저 프로필 조회에 성공했습니다.',
        data: users,
      });

    } catch (error) {
      next(error);
    }
  }

  readUserInfo = async (req, res, next) => {
    try {
      const {
        id
      } = req.params; // :id 받는 과정
      const user = await this.usersService.getUserById(id);

      return res.status(200).json({
        success: true,
        message: '유저 상세프로필 조회에 성공했습니다.',
        data: user,
      });

    } catch (error) {
      next(error);
    }
  }

  updateUserInfo = async (req, res, next) => {
    try {
      // session에서 userId를 받아와야 함
      const id = '1'; // 하드 코딩
      const body = req.body;
      await this.usersService.updateUserById(id, body);

      return res.status(200).json({
        success: true,
        message: '유저 프로필 조회에 성공했습니다.',
      })
    } catch (error) {
      next(error);
    }
  }

  deleteMyId = async (req, res, next) => {
    try {
      // session에서 userId를 받아와야 함
      const id = '1'; // 하드 코딩
      await this.usersService.deleteUserById(id);

      return res.status(200).json({
        success: true,
        message: '유저 프로필 조회에 성공했습니다.',
      })
    } catch (error) {
      next(error);
    }
  }
}