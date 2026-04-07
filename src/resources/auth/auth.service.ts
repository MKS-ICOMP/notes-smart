import bcrypt from 'bcryptjs';
import prisma from '../../database/prisma';
import { LoginInput, SignUpInput } from './auth.types';

const SALT_ROUNDS = 10;
const DUMMY_PASSWORD_HASH =
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8wAq2u6KDAdAm8ZI1sC3yRyvE4s46W';

export async function signUp(data: SignUpInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return { type: 'duplicate_email' as const };
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      fullname: data.fullname,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      fullname: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return { type: 'success' as const, user };
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      email: true,
      fullname: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const passwordHash = user?.password || DUMMY_PASSWORD_HASH;
  const isPasswordValid = await bcrypt.compare(data.password, passwordHash);

  if (!user || !isPasswordValid) {
    return { type: 'invalid_credentials' as const };
  }

  return {
    type: 'success' as const,
    user: {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}
