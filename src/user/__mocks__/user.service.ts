import { userAdminStub, usersStub } from '../stubs/user.stub';

export const userServices = jest.fn().mockReturnValue({
  getUsers: jest.fn().mockResolvedValue(usersStub()),
  getUserById: jest.fn().mockResolvedValue(userAdminStub()),
  createUser: jest.fn().mockResolvedValue(userAdminStub()),
  updateUser: jest.fn().mockResolvedValue(userAdminStub()),
  deleteUser: jest.fn().mockResolvedValue(userAdminStub()),
});
