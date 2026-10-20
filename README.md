# Task Management API

Simple REST API for tasks, built with Node.js + Express, in-memory storage.

## Run

```bash
npm install
npm start
```

Server: http://localhost:3000

## Endpoints

| Method | Route             | Description     |
|--------|-------------------|-----------------|
| POST   | /api/tasks        | Create a task   |
| GET    | /api/tasks        | Get all tasks   |
| GET    | /api/tasks/:id    | Get task by ID  |
| PUT    | /api/tasks/:id    | Update a task   |
| DELETE | /api/tasks/:id    | Delete a task   |

Task shape: `id`, `title`, `description`, `status` (`pending` | `in_progress` | `done`), `created_at`.

## Structure

```
src/
  app.js                 express app + routes mounting
  server.js              entry point
  routes/task.routes.js  route definitions
  controllers/           request handlers
  models/task.model.js   in-memory store
  middleware/validate.js request validation
```

## Sample requests

```bash
curl -X POST localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Write assignment","description":"Backend via AI agent"}'
curl localhost:3000/api/tasks
curl localhost:3000/api/tasks/1
curl -X PUT localhost:3000/api/tasks/1 -H "Content-Type: application/json" -d '{"status":"done"}'
curl -X DELETE localhost:3000/api/tasks/1
```

## Note on using the AI agent

**Prompts used** — I worked step by step instead of asking for everything at once:
1. "Create a clean project structure for a Task Management API in Express with routes/controllers/models/middleware folders."
2. "Generate the task model with id, title, description, status, created_at using an in-memory store."
3. "Create the controller and routes for the five CRUD endpoints."
4. "Add request validation: title required and non-empty, status restricted to an allowed list, id must be a positive integer."
5. "Run it locally and test every endpoint with curl, including the error cases."

**What worked well** — The agent produced the folder layout and CRUD logic correctly on the first pass, and splitting the work into model → controller → routes → validation kept each file small and focused. Asking it to run the server and curl every endpoint gave immediate proof the code actually works.

**Issues faced** — The first draft put validation inline in the controllers and allowed any string as `status`, which made the controllers noisy. ID handling also accepted non-numeric values and silently returned 404 instead of a clear 400.

**How I improved the output** — I asked the agent to pull validation into dedicated middleware, define the allowed statuses in one place (`STATUSES` in the model) and reuse it, and add an `validateId` middleware returning 400 for malformed IDs. I also had it confirm PUT only applies the fields actually sent, so a partial update does not wipe other fields.
