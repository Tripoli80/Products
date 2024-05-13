import { User } from '../user.schema';

export const userAdminStub = (): User => {
  return {
    id: '1',
    email: 'ex@ex.us',
    password: 'A1111111!!!dlfkld',
    name: 'Test',
    token: "sdklckldslclds,cdsl;cds'cds",
    role: 'admin',
    createdAt: undefined,
    updatedAt: undefined,
  };
};
export const userStub = (): User => {
  return {
    id: '1',
    email: 'ex@ex.us',
    password: 'A1111111!!!dlfkld',
    name: 'Test',
    token: "sdklckldslclds,cdsl;cds'cds",
    role: 'user',
    createdAt: undefined,
    updatedAt: undefined,
  };
};
export const usersStub = (): User[] => {
  return [
    {
      id: '5',
      email: 'ex@ex.us',
      password: 'A1111111!!!dlfkld',
      name: 'Test',
      token: "sdklckldslclds,cdsl;cds'cds",
      role: 'user',
      createdAt: undefined,
      updatedAt: undefined,
    },
    {
      id: '2',
      email: 'XXXXXXXX',
      password: 'A1111111!!!dlfkld',
      name: 'Test',
      token: "sdklckldslclds,cdsl;cds'cds",
      role: 'user',
      createdAt: undefined,
      updatedAt: undefined,
    },
    {
      id: '3',
      email: 'XXXXXXXX',
      password: 'A1111111!!!dlfkld',
      name: 'Test',
      token: "sdklckldslclds,cdsl;cds'cds",
      role: 'user',
      createdAt: undefined,
      updatedAt: undefined,
    },
  ];
};
