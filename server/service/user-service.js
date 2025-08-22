import { userModel } from '../models/user-model.js'
import { mailService } from '../service/mail-service.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { tokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({ email });

        // Check if user with this email already exists
        if (candidate) throw new Error('User with this email already has access');

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
        await tokenService.saveToken(userDto.id, `${process.env.API_URL}/api/activate/${tokens.refreshToken}`);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        if (!user) throw new Error('User not found');

        user.isActivated = true;
        await user.save();
    }
}

export const userService = new UserService();
