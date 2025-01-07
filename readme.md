Task Manager API - Node.js with MySQL

This is a Task Manager API built using Node.js, Express, and MySQL. The service allows users to manage tasks and includes features such as email notifications, password policies, and user authentication.

🚀 Getting Started

1. Clone the repository:

git clone <repository-url>
cd task-manager-api

2. Install dependencies:

npm install

3. Start the MySQL service with Docker Compose:

docker-compose up -d

This will start a MySQL container on port 3306 with the following credentials:

Database: task_manager

User: task_user

Password: task_password

4. Run the SQL script to create the tables:

Access your MySQL instance and execute the following SQL commands:

CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE Users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
status ENUM('pending', 'in progress', 'completed') DEFAULT 'pending',
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE PasswordHistories (
id INT AUTO_INCREMENT PRIMARY KEY,
userId INT NOT NULL,
password VARCHAR(255) NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

5. Start the Node.js server:

node server.js

The server will start on http://localhost:3000.

📋 API Endpoints

User Endpoints:

Method

Endpoint

Description

POST

/api/users/register

Register a new user

POST

/api/users/confirm

Confirm user account

PUT

/api/users/password

Update user password

Task Endpoints:

Method

Endpoint

Description

POST

/api/tasks

Create a new task

GET

/api/tasks

Get all tasks

GET

/api/tasks/:id

Get a task by ID

PUT

/api/tasks/:id

Update a task by ID

DELETE

/api/tasks/:id

Delete a task by ID

📧 Automated Email Features

The API includes the following automated email features:

Birthday Email:

Sends a "Happy Birthday" email to users at 8:30 AM on their birthday.

Task Notification:

Sends a reminder email 24 hours before a task's start date.

🔐 Password Policy

Users must change their password every 30 days.

The system stores the last 5 passwords and prevents reuse.

🧪 Testing

You can run unit tests and integration tests using the following command:

npm test

✅ HTTP Response Codes

201 Created: Resource created successfully.

200 OK: Request completed successfully.

400 Bad Request: Invalid input or missing parameters.

401 Unauthorized: Authentication required.

403 Forbidden: Access denied.

404 Not Found: Resource not found.

500 Internal Server Error: Server error.

📚 Project Structure

📦 task-manager-api
┣ 📂src
┃ ┣ 📂config
┃ ┃ ┗ database.js
┃ ┣ 📂controllers
┃ ┃ ┣ userController.js
┃ ┃ ┗ taskController.js
┃ ┣ 📂models
┃ ┃ ┣ User.js
┃ ┃ ┗ Task.js
┃ ┣ 📂routes
┃ ┃ ┣ userRoutes.js
┃ ┃ ┗ taskRoutes.js
┃ ┗ 📂services
┃ ┃ ┗ emailService.js
┣ 📂schedulers
┃ ┗ emailScheduler.js
┣ 📜 server.js
┣ 📜 .env
┣ 📜 docker-compose.yml
┗ 📜 package.json

💻 Environment Variables

Create a .env file with the following values:

DB_HOST=db
DB_USER=task_user
DB_PASS=task_password
DB_NAME=task_manager
PORT=3000

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

Replace your_email@gmail.com and your_email_password with your actual email credentials.

🤝 Contributing

Feel free to submit pull requests to improve the project.

📄 License

This project is licensed under the MIT License.

