import bcrypt from 'bcrypt';
import User from '../models/User.model';
import { generateTokens, verifyToken } from '../utils/token.utils';
import { Error } from 'mongoose';

export const register = async (payload: { email: string; password: string }) => {
  const hashed = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ email: payload.email, password: hashed });
  return { id: user._id, email: user.email };
};

export const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(payload.password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const { accessToken, refreshToken } = generateTokens({ userId: user._id });

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, email: user.email },
  };
};

export const refresh = async (refreshToken: string) => {
  try {
    const decoded = verifyToken(refreshToken) as any;
    const accessToken = generateTokens({ userId: decoded.userId }).accessToken;
    return accessToken;
  } catch (err) {
    throw new Error('Invalid or expired refresh token');
  }
};
