import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';

const router = new Router();
const userController = new UserController();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/activate/:link', userController.activate);
router.post('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

export default router;
