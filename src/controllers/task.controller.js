import * as store from '../models/task.model.js';

export function create(req, res) {
  const task = store.createTask(req.body);
  res.status(201).json(task);
}

export function getAll(_req, res) {
  res.json(store.listTasks());
}

export function getOne(req, res) {
  const task = store.findTask(req.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
}

export function update(req, res) {
  const { title, description, status } = req.body;
  const changes = {};
  if (title !== undefined) changes.title = title;
  if (description !== undefined) changes.description = description;
  if (status !== undefined) changes.status = status;

  const task = store.updateTask(req.taskId, changes);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
}

export function remove(req, res) {
  if (!store.removeTask(req.taskId)) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).send();
}
