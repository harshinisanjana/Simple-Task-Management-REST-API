# Simple Task Management API

This is my submission for Simple Task Management API. I’ve built a RESTful API to manage tasks using Node.js, Express, and MySQL. I focused on making the code modular and "production-ready" by using a layered architecture. I also included some of the bonus features like Dockerization and Pagination to show how I handle more complex requirements.

## Quick Start (The easiest way)
The fastest way to get this running is using Docker. I've set up a docker-compose file that handles the networking between the Node app and the MySQL database automatically.
1. Clone the repo.
2. Run: `docker-compose up --build`
3. The API will be live at `http://localhost:3000`.

*(Note: I added a health check in the compose file so the app waits for the DB to be fully ready before it starts up.)*

## Tech Stack & Design Choices
- **Backend:** Node.js with Express.
- **Database:** MySQL (using `mysql2` for performance and prepared statements).
- **Architecture:** I followed a Controller-Service-Repository pattern.
  - **Why?** It keeps the business logic separate from the database queries, making it much easier to write unit tests later.
- **ID System:** I used UUIDs instead of auto-incrementing integers. It’s a bit more secure because it prevents people from guessing how many tasks are in the system.
- **Validation:** Used Zod to validate incoming requests. If the data is wrong, the API returns a clean 400 error instead of just crashing.

## API Endpoints
All routes require a simple Bearer token for authentication.  
**Header:** `Authorization: Bearer secret-token`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a new task. |
| GET | `/api/tasks` | Get all tasks (Supports `?page=1&limit=5`). |
| PATCH | `/api/tasks/:id` | Update task status (Pending/In-Progress/Completed). |
| DELETE | `/api/tasks/:id` | Soft delete a task. |

## Project Structure
```plaintext
/src
  ├── controllers/  # Request/Response handling
  ├── services/     # Business Logic (The "Brain")
  ├── repositories/ # Raw SQL Queries
  ├── middlewares/  # Auth, Validation, and Global Error Handling
  └── config/       # DB Connection & Env variables
/db
  └── schema.sql    # Database schema for MySQL initialization
```

## Setup Instructions

### Option 1: Using Docker (Recommended)
This method requires zero configuration.
1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Open your terminal in the project directory and run: 
   ```bash
   docker-compose up --build
   ```
3. The API will automatically handle the networking and start on `http://localhost:3000`.

### Option 2: Running Locally (Without Docker)
1. Ensure you have **Node.js** and **MySQL Server** installed.
2. Rename the provided `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open the `.env` file and update your `DB_PASSWORD` to match your local MySQL root password.
4. Open your MySQL client (or terminal) and initialize the database schema by importing the `db/schema.sql` file:
   ```bash
   mysql -u root -p < ./db/schema.sql
   ```
5. Install backend dependencies:
   ```bash
   npm install
   ```
6. Start the server:
   ```bash
   npm start
   ```
   *(The terminal will show `Server is running on port 3000`)*

## Testing
I’ve included a Postman Collection (`Task_Management_API_Collection.json`) in the root folder.
1. Import it into Postman.
2. Set the `base_url` variable to `http://localhost:3000`.
3. I've also written a few test scripts inside the collection to automatically check if the status codes are correct.

## cURL Commands
You can test the API interactively from a terminal (Use **Git Bash** or a Linux/Unix terminal for these exactly as written):

**1. Create a Task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
-H "Authorization: Bearer secret-token" \
-H "Content-Type: application/json" \
-d '{"title": "Test Task", "description": "Testing via cURL"}'
```

**2. Get All Tasks:**
```bash
curl -X GET "http://localhost:3000/api/tasks?page=1&limit=5" \
-H "Authorization: Bearer secret-token"
```

**3. Update a Task:**
```bash
curl -X PATCH http://localhost:3000/api/tasks/ENTER_TASK_ID_HERE \
-H "Authorization: Bearer secret-token" \
-H "Content-Type: application/json" \
-d '{"status": "in_progress"}'
```

**4. Delete a Task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/ENTER_TASK_ID_HERE \
-H "Authorization: Bearer secret-token"
```
