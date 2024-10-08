import { Student } from '../models/userModel';
import bcrypt from 'bcrypt';

export const createUser = async (data: any) => {
  const saltRounds = 10; // Number of rounds for salting
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;
  return Student.create(data);
};



export const findAllUsers = async () => {
  return Student.findAll({
    where: {
      isDeleted: false
    },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt','isDeleted','token','otp'] }
  });
};