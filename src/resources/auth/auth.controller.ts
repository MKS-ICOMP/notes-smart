import { Request, Response } from 'express';
import { login, signUp } from './auth.service';

export async function signUpController(req: Request, res: Response) {
  const result = await signUp(req.body);

  if (result.type === 'duplicate_email') {
    return res.status(400).json({ message: 'Email already in use' });
  }

  return res.status(201).json(result.user);
}

export async function loginController(req: Request, res: Response) {
  const result = await login(req.body);

  if (result.type === 'invalid_credentials') {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  req.session.userId = result.user.id;

  return res.status(200).json(result.user);
}

export async function logoutController(req: Request, res: Response) {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Could not logout' });
    }

    return res.status(200).json({ message: 'Logout successful' });
  });
}
