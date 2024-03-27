import * as path from 'path';
import { config } from 'dotenv';

const root = path.resolve(__dirname, '../../');

config();

const appConfig = {
    PROTOCOL: process.env.PROTOCOL,
    PORT: process.env.PORT || 80,
    MYSQL_CONFIG_PATH: path.join(root, process.env.MYSQL_CONFIG_PATH as string),
    TOKEN_LIFETIME: 5,
    JWT_CERT_PATH: path.join(root, process.env.JWT_SECRET_CERT_PATH as string),
};

export default appConfig;
