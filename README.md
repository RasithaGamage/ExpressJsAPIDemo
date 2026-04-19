# TestExpressApi

A TypeScript-based Express.js REST API with JWT authentication, Swagger documentation, and modular structure.

## Features
- Express.js (TypeScript)
- JWT authentication (cookie-based)
- User management endpoints
- Swagger/OpenAPI documentation
- Modular folder structure (controllers, services, routes, utils)
- Type-safe with full TypeScript support

## Project Structure
```
TestExpressApi/
├── app.ts                # Main Express app
├── bin/www.ts            # Server entry point
├── config/               # Configuration files (db, swagger)
├── controllers/          # Route controllers
├── models/               # Data models / Business logic
├── public/               # Static files
├── routes/               # Express routers
├── services/             # Database Operations/ Business logic
├── utils/                # Utility functions (e.g., JWT)
├── package.json          # NPM scripts and dependencies
├── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Database Setup

Create the required MySQL table by running the following SQL script:

```sql

CREATE TABLE `<your_db_name>`.`users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `username` VARCHAR(100) NULL,
   `email` VARCHAR(100) NULL,
   `password` VARCHAR(100) NULL,
   `createdAt` DATETIME NOT NULL,
   `updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);


```

Make sure your MySQL server is running and the database `express_test` exists before running the script.

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/RasithaGamage/ExpressJsAPIDemo.git
   cd TestExpressApi
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Environment Setup

Before running the project, create a `.env` file in the project root with the following content (check the `example.env` file. you can make copy of `example.env` and rename it to .`env`):

```

# JWT secret key
JWT_SECRET=your_jwt_secret

# MySQL connection details
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=express_test

```

Replace the values as needed for your environment.

### Development
- Start the server with TypeScript using ts-node:
  ```sh
  $env:DEBUG='testexpressapi:*'; npm start   # Windows PowerShell
  # Or
  DEBUG='testexpressapi:*' npm start         # Linux/macOS
  ```
- The server runs on [http://localhost:3000](http://localhost:3000) by default.

### API Documentation
- Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- API docs are generated from JSDoc comments in the `routes/` folder.

### Project Scripts
- `npm start` — Start the server with ts-node
- `npm run build` — (Add if you want to compile to JS)
- `npm run lint` — (Add if you want to lint code)

## Authentication
- JWT tokens are issued on login and stored in cookies (`authToken`).
- All routes except `/login` and `/api-docs` require a valid JWT.

## Folder Details
- **controllers/**: Request handlers for each route
- **services/**: Data access
- **models/**: Data models / Business logic (e.g., User)
- **routes/**: Express routers for each endpoint
- **utils/**: Utility functions (e.g., JWT helpers)
- **config/**: Configuration files (DB, Swagger)
- **public/**: Static assets (HTML, CSS, JS)

## TypeScript
- All source files are written in TypeScript (`.ts`).
- Type definitions for all major dependencies are included.

