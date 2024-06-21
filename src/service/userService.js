import bcrypt from 'bcryptjs';
import pool from '../config/connectDB';
import db from '../models/index';
import { where } from 'sequelize/lib/sequelize';
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
  let check = bcrypt.compareSync(password, hashPassword); // true
  console.log(check);
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  
  try {
   await db.User.create({
      username: username,
      email: email,
      password: hashPass
    })
  } catch (error) {
    console.log('check error', error)
  }
};
const getUserList = async () => {
  let newUser = await db.User.findOne({
  where: {id: 1},
  attributes:["id","username","email"],
  include: {model: db.Group,attributes:["name","description"]},
  raw: true,
  nest: true
})

let roles = await db.Role.findAll({
  include: {model: db.Group, where:{id: 1}},
  raw: true,
  nest: true
})
console.log("check", newUser)
console.log("check", roles)
  let users = [];
  users = await db.User.findAll();
  return users;
};
const deleteUser = async (userId) => {
  await User.destroy({
where: {id: userId}
  })
};
const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {id: id}
  })
  return user.get({plain: true});
};
const updateUserInfo = async (email, username, id) => {
  await db.User.update({email: email, username: username},{
    where: {id: id}
  })
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
