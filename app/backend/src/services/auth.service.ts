import Login, { createLogin } from '../interfaces/ILogin';
// import User from '../database/models/User';
import JwtService from './jwt.service';

export default class Auth implements createLogin {
  login = async (login: Login): Promise<string> => {
    const { email, password } = login;
    // const user = User.findAll();
    const token = JwtService.sign({ email, password });
    return token;
  };
}
