import { ERoles } from 'enums/ERoles';

export type TUser = {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: ERoles;
    isBlocked: boolean;
}
