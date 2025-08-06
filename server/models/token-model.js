import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
    user: { type: Schema, ref: 'User' },
    refreshToken: { type: String, required: true },
})

export const tokenModel = model('User', UserSchema);
