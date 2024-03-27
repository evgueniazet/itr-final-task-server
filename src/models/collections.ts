export default (sequelize: any, DataTypes: any) => {
    const collections = sequelize.define('collections', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_int1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_int2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_int3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_string1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_string2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_string3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_text1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_text2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_text3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_boolean1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_boolean2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_boolean3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_date1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_date2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        custom_date3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    collections.associate = (models: any) => {
        collections.hasMany(models.itemInCollection, {
            foreignKey: 'collectionId',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return collections;
};
