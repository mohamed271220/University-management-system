# University Management System

## Overview

The University Management System is a solution designed to manage various aspects of a university's operations, including student enrollment, course management, scheduling, and more. The system is composed of the following components:

1. **Express API**: A backend service built with Express.js and TypeScript, providing RESTful endpoints for managing university resources.
2. **Landing Page**: A static landing page designed to showcase the features of the University Management System and provide access to the application.
3. **Future Plans**: The API will be rebuilt using NestJS to leverage advanced features like dependency injection, modular architecture, and built-in validation.

## Features

### Express API

- **Authentication & Authorization**: Secure authentication using JWT, with role-based access control for different user roles (students, professors, admin, etc.).
- **User Management**: CRUD operations for managing users, including professors, students, and administrative staff.
- **Course Management**: Manage courses, including enrollment, scheduling, and professor assignments.
- **Department & Hall Management**: Manage departments and their associated resources, such as lecture halls.
- **Timetable & Attendance Tracking**: Track and manage lecture schedules and student attendance.
- **Grades & Reports**: Manage and retrieve grades for students across various courses and semesters.

### Landing Page

- **Overview of Features**: A static landing page that highlights the system's capabilities and provides access links.
- **Responsive Design**: Accessible on both desktop and mobile devices.

### Future Plans: NestJS API

- **Modular Architecture**: Rebuild the API using NestJS for improved scalability and maintainability.
- **Dependency Injection**: Utilize NestJS's built-in dependency injection for cleaner and more testable code.
- **Enhanced Validation & Error Handling**: Leverage NestJS's advanced validation and error handling capabilities.

## Installation

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (for the Express API)
- React (for the SPA)

### Backend (Express API)

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamed271220/University-management-system
   cd university-management-system/express-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Build and run the API:
   ```bash
   npm run build
   npm start
   ```

### Landing Page

1. Navigate to the landing page directory:

   ```bash
   cd university-management-system/landing-page
   ```

2. Serve the static files using any web server (e.g., `http-server` or `nginx`).

## Testing

### Backend

Run tests for the Express API:

```bash
npm run test
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [NestJS](https://nestjs.com/) (planned for future development)
