import { makeAutoObservable } from "mobx";
import type { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

const TOKEN_KEY = 'token';

export default class Store {
    createContext() {
        throw new Error('Method not implemented.');
    }
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
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
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            this.isAuth = setAuth(true);
            this.user = setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration (email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log('Registration response: ', response);
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            this.isAuth = setAuth(true);
            this.user = setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout () {
        try {
            const response = await AuthService.logout();
            console.log('Logout: ', response);
            localStorage.removeItem(TOKEN_KEY);
            this.isAuth = setAuth(false);
            this.user = setUser({} as IUser);
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }
}
