export default (sequelize: any, DataTypes: any) => {
    const categories = sequelize.define('categories', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return categories;
};
