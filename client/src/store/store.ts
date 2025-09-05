import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import type { IUser } from '../models/IUser';
import type { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';
import { TOKEN_KEY } from '../helpres/constants';

export default class Store {
    createContext() {
        throw new Error('Method not implemented.');
    }
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login (email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log('Login response: ', response);
            localStorage.setItem(TOKEN_KEY, response.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e);
        }
    }

    async registration (email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log('Registration response: ', response);
            localStorage.setItem(TOKEN_KEY, response.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e);
        }
    }

    async logout () {
        try {
            const response = await AuthService.logout();
            console.log('Logout: ', response);
            localStorage.removeItem(TOKEN_KEY);
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch(e) {
            console.log(e);
        }
    }

    async checkAuth () {
        this.setIsLoading(true);
        try {
            const response = await axios.get<AuthResponse>(
                `${API_URL}/refresh`,
                { withCredentials: true }); // Send cookie with request
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.setIsLoading(false);
        }
    }
}
