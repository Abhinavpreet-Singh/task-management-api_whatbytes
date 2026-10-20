import { Router } from 'express';
import * as controller from '../controllers/task.controller.js';
import { validateCreate, validateUpdate, validateId } from '../middleware/validate.js';

const router = Router();

router.post('/', validateCreate, controller.create);
router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getOne);
router.put('/:id', validateId, validateUpdate, controller.update);
router.delete('/:id', validateId, controller.remove);

export default router;
