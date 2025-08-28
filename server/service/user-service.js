import { userModel } from '../models/user-model.js'
import { mailService } from '../service/mail-service.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { tokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import { ApiError } from '../exceptions/api-error.js';

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({ email });

        // Check if user with this email already exists
        if (candidate) throw ApiError.BadRequestError(`User with this email ${email} already has access`);

        // Generate hash password
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink =  uuidv4(); // Generate random string for activation link

        // Save user to database
        const user = await userModel.create({
            email,
            password: hashPassword,
            activationLink,
        });
        await mailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        // Create userDto
        const userDto = new UserDto(user); // id, email, activationLink
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        if (!user) throw ApiError.BadRequestError('User not found');

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) throw ApiError.BadRequestError('User not found');

        const isPassEqueal = await bcrypt.compare(password, user.password);
        if (!isPassEqueal) throw ApiError.BadRequestError('Password is not correct');

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();
    }
}

export const userService = new UserService();
