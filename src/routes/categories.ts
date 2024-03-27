import express from 'express';
import model from 'models';
import { routes } from '../constants/routes';
import { TCategory, TCategoryModel } from '../types';

const router = express.Router();

router.get(routes.allCategories, async (_, res) => {
    const categoriesListData: TCategoryModel[] = await model.categories.findAll({
        attributes: ['id', 'title'],
    });

    const categoriesList: TCategory[] = categoriesListData.map((item) => item.dataValues);

    res.json(categoriesList);
});

export { router };
