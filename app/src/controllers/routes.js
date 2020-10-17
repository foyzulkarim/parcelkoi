import express from 'express';
import userRoutes from './userController';

let router = express.Router();

router.use('/users', userRoutes);

export default router;