import { STATUSES } from '../models/task.model.js';

function check(body, { requireTitle }) {
  const errors = [];
  const { title, description, status } = body ?? {};

  if (requireTitle || title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      errors.push('title is required and must be a non-empty string');
    }
  }
  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string');
  }
  if (status !== undefined && !STATUSES.includes(status)) {
    errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  }
  return errors;
}

export function validateCreate(req, res, next) {
  const errors = check(req.body, { requireTitle: true });
  if (errors.length) return res.status(400).json({ errors });
  next();
}

export function validateUpdate(req, res, next) {
  const errors = check(req.body, { requireTitle: false });
  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push('at least one field is required');
  }
  if (errors.length) return res.status(400).json({ errors });
  next();
}

export function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ errors: ['id must be a positive integer'] });
  }
  req.taskId = id;
  next();
}
