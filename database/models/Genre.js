// const { TINYINT, INTEGER } = require("sequelize/types");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        /*rating: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
              max: 100,
              min: 0
            }
          },*/
    };
    let config = {
        tableName: 'generos',

        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: true
    }
    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function (models) {
        Genre.hasMany(models.Product, {
          as: 'products',
          foreignKey: 'cat_id',
        });
    };

    return Genre
};