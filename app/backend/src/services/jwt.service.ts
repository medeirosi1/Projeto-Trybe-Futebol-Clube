import { sign } from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
  static sign(payload: { email: string, password: string }): string {
    return sign(payload, process.env.JWT_SECRET || 'jwt_secret');
  }
}
