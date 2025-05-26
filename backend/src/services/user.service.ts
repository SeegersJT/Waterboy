import * as userRepo from '../repositories/user.repositories';

export const getAllUsers = async () => {
  return await userRepo.findAllUsers();
};

export const getUserById = async (id: string) => {
  return await userRepo.findUserById(id);
};
