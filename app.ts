// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import { verifyJwt } from './utils/jwtUtil';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware to handle cookies
app.use((req: Request, res: Response, next: NextFunction) => {
    // Skip token verification for /login and /api-docs routes
    if (req.path === '/login' || req.path.startsWith('/api-docs')) {
        return next();
    }
    const token = req.cookies.authToken;
    const isTokenValid = validateToken(token);
    if (!isTokenValid) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

function validateToken(token: string | undefined): boolean {
    if (!token) return false;
    const jsonPayload = verifyJwt(token);
    if (!jsonPayload) {
        return false;
    }
    return true;
}
