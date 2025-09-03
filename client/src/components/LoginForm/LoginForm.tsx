import { useState } from 'react';

export const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
            />
            <button>Log in</button>
            <button>Registration</button>
        </div>
    );
}
