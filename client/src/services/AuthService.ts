import type { AxiosResponse } from 'axios';
import type { AuthResponse } from '../models/response/AuthResponse';
import $api from '../http';

type LoginProps = {
    email: string, g
    password: string
}

export default class AuthService {
    static async login({ email, password }: LoginProps): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password })
            .then(response => response.data);
    }

    static async registration({ email, password }: LoginProps): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password })
            .then(response => response.data);
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }

    static async checkAuth(): Promise<boolean> {
        return $api.get('/auth/me')
            .then(response => response.data)
    }
}
