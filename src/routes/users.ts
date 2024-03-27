import express from 'express';
import model from 'models';
import fs from 'fs';
import appConfig from 'config/config';
import { routes } from 'constants/routes';
import { TUser, TUserItemModel } from 'types';
import { EErrorMessages, ERoles } from 'enums';
import { createToken } from 'utils';

const jwtSecretCert = fs.readFileSync(appConfig.JWT_CERT_PATH, 'utf8');

const router = express.Router();

router.get(routes.allUsers, async (req, res) => {
    const usersListData: TUserItemModel[] = await model.users.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'role', 'isBlocked'],
    });
    const usersList: TUser[] = usersListData.map((item) => item.dataValues);

    res.json(usersList);
});

router.get(routes.user, async (req, res) => {
    const { userId } = req.query;
    const user = await model.users.findByPk(userId);

    if (!user) {
        return res.status(500).json({ error: { message: EErrorMessages.USER_NOT_FOUND } });
    }

    res.status(200).json(user);
});

router.post(routes.updateUserRole, async (req, res) => {
    const { userId, newRole } = req.body;
    const user = await model.users.findByPk(userId);

    if (!user) {
        return res.status(500).json({ error: { message: EErrorMessages.USER_NOT_FOUND } });
    }

    await user.update({ role: newRole });

    res.status(200).json(user);
});

router.post(routes.updateUserBlockStatus, async (req, res) => {
    const { userId, isBlocked } = req.body;
    const user = await model.users.findByPk(userId);

    if (!user) {
        return res.status(500).json({ error: { message: EErrorMessages.USER_NOT_FOUND } });
    }

    await user.update({ isBlocked });

    res.status(200).json(user);
});

router.post(routes.deleteUser, async (req, res) => {
    const { userId } = req.body;
    const user = await model.users.findByPk(userId);

    if (!user) {
        return res.status(500).json({ error: { message: EErrorMessages.USER_NOT_FOUND } });
    }

    await user.destroy();

    res.status(200).json(user);
});

router.post(routes.register, async (req, res) => {
    const { email, password, name, surname } = req.body;

    const user = await model.users.findOne({ where: { email } });

    if (user) {
        res.status(401).json({
            errors: { message: EErrorMessages.UNAUTHORIZED_USER_EXIST },
        });
    } else {
        //TODO: add validation of data: email, password, name and surname
        await model.users.create({
            email,
            password,
            name,
            surname,
            role: ERoles.USER,
            isBlocked: 0,
        });

        const user = await model.users.findOne({ where: { email } });

        const token = createToken({ email }, appConfig.TOKEN_LIFETIME, jwtSecretCert);

        res.json({ token, user });
    }
});

router.post(routes.login, async (req, res) => {
    const { email, password } = req.body;
    const user = await model.users.findOne({ where: { email } });

    if (!user) {
        res.status(401).json({
            errors: { message: EErrorMessages.UNAUTHORIZED_USER_NOTFOUND },
        });
    } else {
        if (password === user.password) {
            const token = createToken(
                { email: user.email },
                appConfig.TOKEN_LIFETIME,
                jwtSecretCert,
            );

            res.json(token);
        } else {
            res.status(401).json({
                errors: { message: EErrorMessages.UNAUTHORIZED_WRONG_CREDENTIALS },
            });
        }
    }
});

export { router };
