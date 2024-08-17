# University-Express-API

## Overview

`University-Express-API` is a robust and scalable backend API built using Express.js and TypeScript. This API is designed to manage university operations, including student management, course enrollment, professor assignments, and more. It leverages Sequelize for ORM with PostgreSQL as the database, and includes JWT-based authentication, role-based authorization, and Swagger documentation for easy API consumption.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Create, update, delete, and fetch users with role-based access control.
- **Course Management**: Manage courses, including assigning professors and enrolling students.
- **Authentication & Authorization**: Secure API with JWT tokens, supporting role-based access.
- **Comprehensive Testing**: Includes unit and integration tests using Jest and Supertest.
- **Swagger Documentation**: Interactive API documentation for quick reference and testing.
- **Security Enhancements**: Utilizes Helmet, CORS, and other security best practices.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Sequelize**: Promise-based Node.js ORM for PostgreSQL.
- **PostgreSQL**: Relational database system.
- **JWT**: JSON Web Tokens for secure authentication.
- **Jest**: Testing framework for unit and integration tests.
- **Swagger**: API documentation tool.

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamed271220/University-management-system
   cd express-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```env
   DB_NAME= Your database name.
   DB_USER= Your user name.
   DB_PWD= Your password.
   JWT_SECRET=your_jwt_secret
   ```

```
Replace db info and `your_jwt_secret` with appropriate values.
```

4. Run the database migrations (if any):

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Build the TypeScript files:
   ```bash
   npm run build
   ```

## Usage

### Start the Development Server

To start the development server with hot reloading:

```bash
npm run serve
```

### Start the Production Server

To build and start the production server:

```bash
npm run build
npm start
```

## Scripts

- `npm run build-ts`: Compiles TypeScript files.
- `npm run build`: Compiles TypeScript files and prepares for production.
- `npm run debug`: Builds and runs the server in debug mode.
- `npm run serve-debug`: Runs the server with Node.js inspector for debugging.
- `npm run serve`: Runs the server with hot reloading (Nodemon).
- `npm run start`: Starts the server in production mode.
- `npm run test`: Runs all tests with coverage.
- `npm run watch-node`: Runs the server with Nodemon.
- `npm run watch-test`: Runs tests in watch mode.
- `npm run watch-ts`: Watches TypeScript files for changes.

## API Documentation

API documentation is provided via Swagger. Once the server is running, you can access the documentation at:

```
http://localhost:3000/api-docs
```

## Environment Variables

- `DATABASE_URL`: The URL of your PostgreSQL database.
- `JWT_SECRET`: The secret key used to sign JWT tokens.
- `JWT_REFRESH_SECRET`: The secret key used to sign the refresh tokens.
- `NODE_ENV`: The environment in which the application is running (`development`, `production`, etc.).
- `DB_NAME`: Your database name.
- `DB_USER`: Your user name.
- `DB_PWD`: Your password.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.
