module.exports = (sequelize, dataTypes) => {
    let alias = 'Customer';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            field: 'id',
            autoIncrementIdentity: true
                },
        full_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            field: 'full_name'
        },
        username: {
            type: dataTypes.STRING(100),
            allowNull: false,
            field: 'username'
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
        text: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false,
            field: 'password'
          },
        role: {
            type: dataTypes.ENUM('customer', 'admin'),
            allowNull: false,
            //defaultValue: 'customer'
          },
        /*fav_prod: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        }*/
    }
    let config = {
        tableName: 'clientes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        paranoid: false
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
