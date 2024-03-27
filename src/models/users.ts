export default (sequelize: any, DataTypes: any) => {
    const users = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    users.associate = (models: any) => {
        users.hasMany(models.collections, {
            foreignKey: 'userId',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return users;
};
