// In-memory task store.
const tasks = [];
let nextId = 1;

export const STATUSES = ['pending', 'in_progress', 'done'];

export function createTask({ title, description = '', status = 'pending' }) {
  const task = {
    id: nextId++,
    title,
    description,
    status,
    created_at: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function listTasks() {
  return tasks;
}

export function findTask(id) {
  return tasks.find((t) => t.id === id);
}

export function updateTask(id, changes) {
  const task = findTask(id);
  if (!task) return null;
  Object.assign(task, changes);
  return task;
}

export function removeTask(id) {
  const i = tasks.findIndex((t) => t.id === id);
  if (i === -1) return false;
  tasks.splice(i, 1);
  return true;
}
