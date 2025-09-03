import $api from '../api';
import { AxiosResponse } from 'axios';

type LoginProps = {
    username: string,
    password: string
}

export default class {
    static async login({ username, password }: LoginProps): Promise<AxiosResponse<>> {
        return $api.post();
    }
}
