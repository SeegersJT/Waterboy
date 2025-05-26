import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN ?? '15m';
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? '7d';

const accessOptions: SignOptions = { expiresIn: accessExpiresIn as SignOptions['expiresIn'] };
const refreshOptions: SignOptions = { expiresIn: refreshExpiresIn as SignOptions['expiresIn'] };

export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, accessOptions);
  const refreshToken = jwt.sign(payload, JWT_SECRET, refreshOptions);

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
