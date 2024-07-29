import express from 'express';
import { createState, getStates, updateState, deleteState } from '../controllers/stateController';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

router.post('/', isAuthenticated, createState);
router.get('/', getStates);
router.put('/:id', isAuthenticated, updateState);
router.delete('/:id', isAuthenticated, deleteState);

export default router;
