import express from 'express';
import model from 'models';
import { routes } from '../constants/routes';
import { TCollection, TCollectionItem } from '../types';
import { EErrorMessages } from 'enums/EErrorMessages';

const router = express.Router();

router.get(routes.allCollections, async (req, res) => {
    const { userId } = req.query;

    const collectionsListData: TCollectionItem[] = await model.collections.findAll({
        where: { userId },
        attributes: [
            'id',
            'title',
            'userId',
            'description',
            'image',
            'category',
            'custom_int1_state',
            'custom_int1_name',
            'custom_int2_state',
            'custom_int2_name',
            'custom_int3_state',
            'custom_int3_name',
            'custom_string1_state',
            'custom_string1_name',
            'custom_string2_state',
            'custom_string2_name',
            'custom_string3_state',
            'custom_string3_name',
            'custom_text1_state',
            'custom_text1_name',
            'custom_text2_state',
            'custom_text2_name',
            'custom_text3_state',
            'custom_text3_name',
            'custom_boolean1_state',
            'custom_boolean1_name',
            'custom_boolean2_state',
            'custom_boolean2_name',
            'custom_boolean3_state',
            'custom_boolean3_name',
            'custom_date1_state',
            'custom_date1_name',
            'custom_date2_state',
            'custom_date2_name',
            'custom_date3_state',
            'custom_date3_name',
        ],
    });

    const collectionsList: TCollection[] = collectionsListData.map((item) => item.dataValues);

    res.json(collectionsList);
});

router.post(routes.createCollection, async (req, res) => {
    const fields = req.body;

    if (!fields) {
        return res.status(400).json(EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_COLLECTION);
    }

    const newCollection: TCollectionItem = await model.collections.create({
        ...fields,
    });

    res.status(201).json(newCollection);
});

router.post(routes.deleteCollection, async (req, res) => {
    const { collectionId } = req.body;

    const collection = await model.collections.findByPk(collectionId);

    if (!collection) {
        return res.status(500).json({ error: { message: EErrorMessages.COLLECTION_NOT_FOUND } });
    }

    await collection.destroy();

    res.status(200).json(collection);
});

router.put(routes.updateCollection, async (req, res) => {
    const { collectionId } = req.query;
    const updatedFields = req.body;

    const collection = await model.collections.findByPk(collectionId);

    if (!collection) {
        return res.status(404).json({ error: { message: EErrorMessages.COLLECTION_NOT_FOUND } });
    }

    await collection.update(updatedFields);

    res.status(200).json(collection);
});

router.get(routes.getCollectionById, async (req, res) => {
    const { collectionId } = req.query;

    const collection = await model.collections.findByPk(collectionId);

    if (!collection) {
        return res.status(404).json({ error: { message: EErrorMessages.COLLECTION_NOT_FOUND } });
    }

    res.json(collection);
});

export { router };
