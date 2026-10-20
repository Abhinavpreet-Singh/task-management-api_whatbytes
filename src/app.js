import express from 'express';
import taskRoutes from './routes/task.routes.js';

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;
