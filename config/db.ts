import mysql from 'mysql2';

// Use environment variables for security
const {
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_NAME
} = process.env;

const connectionString = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const pool = mysql.createPool(connectionString);

// Export the promise-based pool
export default pool.promise();
