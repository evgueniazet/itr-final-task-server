import { Dialect } from 'sequelize';

export type TDbConfigItem = {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port: number;
}
