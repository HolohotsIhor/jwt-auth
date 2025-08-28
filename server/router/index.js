import { Router } from 'express';
import { userController } from '../controllers/user-controller.js';
import { body } from 'express-validator';

const router = new Router();
const registrationValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6, max: 40 }).withMessage('Password must be 6–40 chars')
];

router.post('/registration', registrationValidation, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

export default router;
