 
import type { Request, Response } from 'express';
import { validateUser } from '../services/userService';
import { signJwt } from '../utils/jwtUtil';
 
 export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const validUser = await validateUser(username, password);
  if (!validUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  } 

  // Generate JWT token with user details
  const token = signJwt({
    id: validUser.id,
    username: validUser.username,
    email: validUser.email
  }, { expiresIn: '1d' });

  // Attach cookie to response
  res.cookie("authToken", token, {
    httpOnly: true,       // Not accessible via JS
    secure: true,         // make this false if you dont have HTTPS
    sameSite: "lax",      // important for most frontend-backend setups
    path: "/",            // send for ALL routes
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  return res.json({ message: "Login successful" });
}