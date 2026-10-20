# Task Management API

Simple CRUD API for tasks. Node + Express, data kept in memory.

## Run

```bash
npm install
npm start
```

Runs on http://localhost:3000

## Routes

| Method | Route | What it does |
|--------|-------|--------------|
| POST | /api/tasks | create a task |
| GET | /api/tasks | list all tasks |
| GET | /api/tasks/:id | get one task |
| PUT | /api/tasks/:id | update a task |
| DELETE | /api/tasks/:id | delete a task |

A task has `id`, `title`, `description`, `status` (pending / in_progress / done) and `created_at`.

## Examples

```bash
curl -X POST localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Design schema","description":"Tables for users and tasks"}'
curl localhost:3000/api/tasks
curl -X PUT localhost:3000/api/tasks/1 -H "Content-Type: application/json" -d '{"status":"done"}'
curl -X DELETE localhost:3000/api/tasks/1
```

Validation returns 400 with a message — empty title, unknown status, or a non-numeric id. Missing task gives 404.

## Structure

```
src/
  server.js      entry point
  app.js         express setup
  routes/        route definitions
  controllers/   handlers
  models/        in-memory store
  middleware/    validation
```

## Notes on building this with an AI agent

I built it step by step instead of asking for the whole thing at once: first the folder
structure, then the task model, then controllers and routes, then validation, and finally
had it run the server and test every endpoint with curl.

That worked well. The CRUD logic was right the first time and keeping each prompt to one
layer kept the files small.

Two things needed fixing. Validation started out inline in the controllers, and the status
field accepted any string, so I asked for it to be moved into middleware with the allowed
statuses defined once in the model. IDs like `/api/tasks/abc` also fell through to a 404
instead of a 400, so I added an id check. I also made sure PUT only updates the fields you
actually send, otherwise a partial update wiped the rest.
