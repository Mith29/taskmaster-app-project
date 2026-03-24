# TaskMaster APP

##  Overview

TaskMaster is a RESTful backend API built for managing users, projects, and tasks. It supports secure authentication, project ownership, and task management within projects.

This project demonstrates backend development using Node.js, Express, MongoDB, and JWT-based authentication.

---

##  Project Structure

```
taskmaster/
│── config/
│   └── connection.js
│── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│── routes/api/
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│── utils/
│   └── auth.js
│── .env
│── .gitignore
│── server.js

```

---

##  Setup Instructions

### 1. Clone & Install

```
npm init -y
npm install express mongoose bcrypt jsonwebtoken dotenv
```

### 2. Environment Variables (.env)

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 3. Run Server

```
npm run dev
```


---

##  Data Models

###  User

* username (String, required)
* email (String, unique, required)
* password (String, required, hashed)

###  Project

* name (String, required)
* description (String)
* user (ObjectId → User, required)

###  Task

* title (String, required)
* description (String)
* status (String: "To Do", "In Progress", "Done")
* project (ObjectId → Project, required)

---

##  Authentication

### Register

**POST /api/users/register**

```
{
  "username": "bob",
  "email": "bob@email.com",
  "password": "pass1234"
}
```

### Login

**POST /api/users/login**

```
{
  "email": "bob@email.com",
  "password": "pass1234"
}
```

=> Returns JWT token

---

##  Project Routes 

### Create Project

**POST /api/projects**

### Get All Projects

**GET /api/projects**

### Get Single Project

**GET /api/projects/:id**

### Update Project

**PUT /api/projects/:id**

### Delete Project

**DELETE /api/projects/:id**

 * All routes require JWT
 * Users can only access their own projects

---

##  Task Routes 

### Create Task

**POST /api/projects/:projectId/tasks**

### Get Tasks for Project

**GET /api/projects/:projectId/tasks**

### Update Task

**PUT /api/tasks/:taskId**

### Delete Task

**DELETE /api/tasks/:taskId**

* Must verify project ownership before accessing tasks
* Tasks belong to projects

---

##  Authorization Rules

* Only logged-in users can access Projects and Tasks
* Users can only:

  * Access their own projects
  * Create tasks only inside their projects
  * Update/delete tasks only if they own the parent project

---

