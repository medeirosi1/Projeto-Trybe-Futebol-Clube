import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
  static sign(payload: { email: string, password: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}
