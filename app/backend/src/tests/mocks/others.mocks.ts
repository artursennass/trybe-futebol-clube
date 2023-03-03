import GenerateToken from '../../middleware/generateToken';


export const LOGIN = {
    email: 'alberto@teste.com',
    password: 'albertoFofao$$'
  };

export const INVALID_LOGIN = {
    email: 'teste@teste.com',
    password: 'Fofao$$'
  };

export const USER = {
      id: 1,
      username: 'Alberto',
      role: 'adimin',
      email: 'alberto@teste.com',
  }

  export const TOKEN = GenerateToken.newToken(USER);