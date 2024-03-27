import { sign } from 'jsonwebtoken';
import { TCreateToken } from 'types/TCreateToken';

export const createToken = (token: TCreateToken, lifetime: number, cert: string): string => {
    return sign(
        {
            ...token,
            exp: Math.floor(Date.now() / 1000) + lifetime * 60,
        },
        cert,
        { algorithm: 'RS256' },
    );
};