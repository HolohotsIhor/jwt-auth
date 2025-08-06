import jwt from 'jsonwebtoken';
import tokenModel from '../models/token.model';

export class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ userId, refreshToken });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
        }
    }
}
