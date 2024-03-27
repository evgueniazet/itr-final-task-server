import express from 'express';
import model from 'models';
import { routes } from '../constants/routes';
import { TItemInCollection, TItemInCollectionModel } from '../types';
import { EErrorMessages } from 'enums/EErrorMessages';

const router = express.Router();

router.get(routes.allItemsInCollection, async (req, res) => {
    const { collectionId } = req.query;

    const itemsInCollectionListData: TItemInCollectionModel[] = await model.items.findAll({
        where: { collectionId },
        attributes: [
            'id',
            'title',
            'tags',
            'collectionId',
            'custom_int1',
            'custom_int2',
            'custom_int3',
            'custom_string1',
            'custom_string2',
            'custom_string3',
            'custom_text1',
            'custom_text2',
            'custom_text3',
            'custom_boolean1',
            'custom_boolean2',
            'custom_boolean3',
            'custom_date1',
            'custom_date2',
            'custom_date3',
        ],
    });

    const itemsInCollectionList: TItemInCollection[] = itemsInCollectionListData.map(
        (item) => item.dataValues,
    );

    res.json(itemsInCollectionList);
});

router.post(routes.createItem, async (req, res) => {
    const fields = req.body;

    if (!fields) {
        return res.status(400).json(EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_ITEM_IN_COLLECTION);
    }

    const newItem: TItemInCollection = await model.items.create({
        ...fields,
    });

    res.status(201).json(newItem);
});

router.post(routes.deleteItem, async (req, res) => {
    const { itemId } = req.body;

    const item = await model.items.findByPk(itemId);

    if (!item) {
        return res
            .status(500)
            .json({ error: { message: EErrorMessages.ITEM_IN_COLLECTION_NOT_FOUND } });
    }

    await item.destroy();

    res.status(200).json(item);
});

router.put(routes.updateItem, async (req, res) => {
    const { itemId } = req.query;
    const updatedFields = req.body;

    const item = await model.items.findByPk(itemId);

    if (!item) {
        return res
            .status(404)
            .json({ error: { message: EErrorMessages.ITEM_IN_COLLECTION_NOT_FOUND } });
    }

    await item.update(updatedFields);

    res.status(200).json(item);
});

export { router };
