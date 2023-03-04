module.exports = (sequelize, dataTypes) => {
    let alias = 'Customer';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        full_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        sex: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        about: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        fav_prod: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        }
    }
    let config = {
        tableName: 'clientes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: true
    }
    const Customer = sequelize.define(alias, cols, config); 

    Customer.associate = function (models) { //un actor va a tener muchas peliculas
        Customer.belongsToMany(models.Product, {
          as: 'products',
          through: 'customer_products',
          otherKey: 'prod_id', //es al revez, es la relacion inversa a la tabla movie
          //foreignKey: 'cust_id', //x q en movie era lo contrario, es la relacion al revez
             //forein ki se refiere al modelo actor y other key al modelo movie
          timestamps: true
        });
    };
    
 
    return Customer
};

//
