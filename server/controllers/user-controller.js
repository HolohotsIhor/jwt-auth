import { userService } from '../service/user-service.js';

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } // httpOnly - security we don't want to be able to access the cookie from the client side
            );

            return res.json(userData);
        } catch (e) {
            throw new Error(e);
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

        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;

            // if(!activationLink) throw new Error('Invalid activation link');

            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            throw new Error('Activation failed');
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
ƒ
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '234']);
        } catch (e) {

        }
    }
}

export const userController = new UserController();
