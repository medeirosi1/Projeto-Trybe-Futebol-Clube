import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserFace from '../interfaces/IUser';

export default class JwtService {
  static sign(payload: { email: string, password: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret');
  }

  static verifyToken(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
      return data as UserFace;
    } catch (e) {
      const error = new Error('Invalid token');
      error.name = 'Unauthorized';
      throw error;
    }
  }
}
