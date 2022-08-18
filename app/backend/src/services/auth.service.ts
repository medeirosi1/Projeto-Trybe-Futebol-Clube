import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import Login from '../interfaces/ILogin';
import User from '../database/models/User';
import JwtService from './jwt.service';

export default class Auth {
  validateLogin = (data: object) => {
    const schema = Joi.object({
      email: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'All fields must be filled',
      }),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;

    return value;
  };

  login = async (login: Login): Promise<string> => {
    const { email, password } = login;
    const user = await User.findOne({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      const e = new Error('Incorrect email or password');
      e.name = 'Unauthorized';
      throw e;
    }
    const token = JwtService.sign({ email, password });
    return token;
  };

  loginValidate = async (token: string): Promise<string> => {
    const verifyToken = JwtService.verifyToken(token);
    const { email } = verifyToken;
    const user = await User.findOne({ where: { email } });
    return user?.getDataValue('role');
  };
}
