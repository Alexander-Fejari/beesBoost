import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    res.status(401).json({ error: `Unauthorized access: No token` });
    return ;  
  }

  jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
  if (error) {
    return res.status(403).json({ error: `Unauthorized access: Invalid token`});
  }

  if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'username' in decoded && 'role' in decoded) {
    req.user = {
      id: decoded.id as string,
      username: decoded.username as string,
      role: decoded.role as string
    };
  }
  else {
    res.status(403).json({ error: 'Invalid token structure' });
  }
  next();
  });
}

function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } 
    else {
      res.status(403).send('Access denied. You do not have permission to access this resource.');
    }
  };
}

export { authenticateToken, authorizeRoles }