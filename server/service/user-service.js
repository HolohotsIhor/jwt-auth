import { userModel } from '../models/user-model.js'
import { mailService } from '../services/mail-service.js';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

export class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({ email });

        if (candidate) throw new Error('User with this email already has access');

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // Generate random string for activation link
        const user = await userModel.create({
            email,
            password: hashPassword,
            activationLink,
        });

        await mailService.sendActivationMail(email, activationLink);
    }
}
