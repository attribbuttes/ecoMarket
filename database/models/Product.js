module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            field: 'id',
            autoIncrementIdentity: 'MAX'
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        text: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        
        price: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        
        cat_id: { 
        type: dataTypes.BIGINT(10)
        },
        image: {
            type: dataTypes.STRING(500),
            
        },
        
    };
    let config = {
        tableName: 'productos',

        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.belongsTo(models.Genre, {
                as: 'genre',
                foreignKey: 'cat_id'
        });
       
       /* Product.belongsToMany(models.Customer, 
        {
          as: 'customers',
          through: 'customer_products', //tabla intermedia para hacer muchos a muchos
          foreignKey: 'prod_id', //clave q referencia a movie, la vclave q referencia ala pelicula, esta es la foreignkey de genero
          //otherKey: 'cust_id', //clave q referencia a actor
          timestamps: true
        });*/
    };
    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    return Product
};