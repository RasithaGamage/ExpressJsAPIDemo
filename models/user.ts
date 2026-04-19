
// User model as a class with business logic

import bcrypt from 'bcrypt';

export class User {
	id: number;
	username: string;
	email: string;
	password: string; // hashed password
	createdAt: Date;
	updatedAt: Date;

	constructor(
		id: number,
		username: string,
		email: string,
		password: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt || new Date();
		this.updatedAt = updatedAt || new Date();
	}

	// Business logic: validate password 
	async validatePassword(inputPassword: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(inputPassword, this.password);
		return isMatch;
	}

	// Business logic: hashing password
	async hashPassword(): Promise<void> {
		const hash = await bcrypt.hash(this.password, 10);
		this.password = hash; 
	}


	// Business logic: update user info, allow only to update username and email
	updateProfile(newUsername: string, newEmail: string) {
		this.username = newUsername;
		this.email = newEmail;
		this.updatedAt = new Date();
	}

	// Business logic: check if email is valid (simple regex)
	isEmailValid(): boolean {
		return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email);
	}

	// Business logic: change password
	changePassword(newPassword: string) {
		// In production, hash the password
		this.password = newPassword;
		this.updatedAt = new Date();
	}
}

