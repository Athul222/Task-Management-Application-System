# Task Management Application using MERN Stack

## Overview

This project aims to build a basic project/task management application using the MERN stack (MongoDB, Express, React, Node.js). The application will allow users to register, log in, manage tasks, assign tasks to team members, track task statuses, and generate summary reports.

## Features

- User Registration and Login
- Create, Update, and Delete Tasks
- Assign Tasks to Team Members
- Track Task Statuses (e.g., "To Do", "In Progress", "Completed")
- Generate Summary Reports of Tasks for Each User

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/Athul222/Task-Management-Application-System.git
cd project-management-app
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string:

   ```plaintext
   DB_URL=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

## API Endpoints

### User Authentication

- **POST** `/register` - Register a new user
- **POST** `/login` - Log in a user

### Task Management

- **GET** `/tasks/all` - Get all tasks for the logged-in user
- **GET** `/tasks/:id` - Get a particular task based on the entered id parameter
- **POST** `/tasks/add` - Create a new task
- **PUT** `/tasks/:id` - Update a task by ID
- **DELETE** `/tasks/:id` - Delete a task by ID

### Task Status Tracking

- **PUT** `/tasks/:id` - Update the status of a task

### Summary Report

- **GET** `/tasks/reports/?date=''` or `/tasks/reports/?status=''` or `/tasks/report/?user=''` - Generate a summary report of tasks for the logged-in user

## Usage

1. Register a new user by sending a POST request to `/register`.
2. Create, update, delete, and assign tasks as needed.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MERN Stack Documentation](https://mern.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/en/docs/)