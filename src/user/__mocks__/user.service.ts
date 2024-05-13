import { userStub, usersStub } from '../stubs/user.stub';

export const userServices = jest.fn().mockReturnValue({
  getUser: jest.fn().mockResolvedValue(usersStub()),
  getUserById: jest.fn().mockResolvedValue(userStub()),
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  deleteUser: jest.fn().mockResolvedValue(userStub()),
});
