import { userService } from '../service/user-service.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error.js';

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            if (!errors.isEmpty()) next(ApiError.badRequest('Ошибка регистрации', errors.array()));

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } // httpOnly - security we don't want to be able to access the cookie from the client side
            );

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;

            // if(!activationLink) throw new Error('Invalid activation link');

            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next('Activation failed');
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '234']);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
