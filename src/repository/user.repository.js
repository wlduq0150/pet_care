import bcrypt from 'bcrypt';
import { db } from "../../models/index.js";

const {
  User
} = db;

export class UsersRepository {
  readMany = async () => {
    const users = await User.findAll({
      where: {
        role: 'sitter'
      }
    });

    return users;
  }

  readOneById = async (id) => {
    const user = await User.findOne({
      where: {
        id
      }
    });

    return user;
  };

  updateOneById = async (id, {
    email,
    password,
    experience,
    role
  }) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 첫 번째 object : database에 변경할 내용
    // 두 번째 object : 변경할 행에 대한 조건문(where)
    const result = await User.update({
      email,
      password: hashedPassword,
      experience,
      role
    }, {
      where: {
        id
      }
    });

    console.log(result);

    return result;
  }

  deleteOneById = async (id) => {
    const result = await User.destroy({
      where: {
        id
      }
    });

    console.log(result);

    return result;
  };
  signup = async (hashCreateAuthData) => {
    const result = await db.User.create({
        ...hashCreateAuthData,
    });
    return result;
    }

    findUser = async (email) => {
    const user = await db.User.findOne({ where: {email} })
    return user;
    }
};