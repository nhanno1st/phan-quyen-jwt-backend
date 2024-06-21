import { escapeId } from 'sequelize/lib/sql-string';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService';
require('dotenv').config();
import { createJWT } from '../middleware/JWTAction'
const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: 'The email is already exist',
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: 'The phone is already exist',
        EC: 1,
      };
    }
    let hashPass = hashPassword(rawUserData.password);
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPass,
      phone: rawUserData.phone,
      groupId: 3,
    });
    return {
      EM: 'A user is created successfully',
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: 'Something wrong in service....',
      EC: -2,
    };
  }
};
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleUserLogin = async (RawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: RawData.valueLogin }, { phone: RawData.valueLogin }],
      },
    });
    if (user) {
      let isCorrectPassword = checkPassword(RawData.password, user.password);
      if (isCorrectPassword === true) {
        // let token



       let groupWithRoles = await getGroupWithRoles(user);
      let payload = {
        email: user.email,
        groupWithRoles,
        username: user.username,
        
      }
      let token = createJWT(payload);

        return {
          EM: 'ok!',
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username
          },
        };
      }
    }
    console.log(
      '>>> Input user with email/phone: ',
      RawData.valueLogin,
      'password',
      RawData.password,
    );
    return {
      EM: 'Your email/phone or password is incorrect!',
      EC: 1,
      DT: '',
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something wrong in service....',
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  hashPassword,
  checkEmailExist,
  checkPhoneExist,
};
