// User service for business logic and data access
import { User } from '../models/user';
import db  from '../config/db';

// Create a new user
export async function createUser(username: string, email: string, password: string): Promise<User> {
    const user = new User(
        0, // id will be set after insert
        username,
        email,
        password,
        new Date(),
        new Date()
    );

    // Hashing the password before saving to database
    await user.hashPassword();

    const isEmailValid = user.isEmailValid();
    if (!isEmailValid) {
        throw new Error('Invalid email format');
    }

    const [result] = await db.execute(
        'INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [user.username, user.email, user.password]
    );
    user.id = (result as any).insertId.toString();
    return user;
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | undefined> {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as any[];
    if (users[0]) {
        const u = users[0];
        return new User(u.id.toString(), u.username, u.email, u.password, u.createdAt, u.updatedAt);
    }
    return undefined;
}

// Find user by ID
export async function findUserById(id: string): Promise<User | undefined> {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const users = rows as any[];
    if (users[0]) {
        const u = users[0];
        return new User(u.id.toString(), u.username, u.email, u.password, u.createdAt, u.updatedAt);
    }
    return undefined;
}

// Validate user credentials 
export async function validateUser(email: string, password: string): Promise<User | undefined> {
    // compare hashed passwords
    const user = await findUserByEmail(email);
    const isValid = user ? await user.validatePassword(password) : false;
    if (isValid) {
        return user;
    } else {
        return undefined;
    }
}
