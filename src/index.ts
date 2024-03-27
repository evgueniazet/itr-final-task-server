import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import appConfig from 'config/config';
import db from 'models';
import { router as usersRouter } from './routes/users';
import { router as categoriesRouter } from './routes/categories';
import { router as collectionsRouter } from './routes/collections';
import { router as itemsRouter } from './routes/items';

const server = express();

server.use(express.json());
server.use(cors());
server.use('/users', usersRouter);
server.use('/categories', categoriesRouter);
server.use('/collections', collectionsRouter);
server.use('/items', itemsRouter);

db.sequelize.sync({ alter: true }).then(() => {
    server.listen(appConfig.PORT, () => {
        console.warn(`Server is running on port: http://localhost:${appConfig.PORT}`);
    });
});