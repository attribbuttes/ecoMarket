module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('Usuarios', 
    id = {
        autoIncrement: true,
        primaryKey: truetype,
        type: dataTypes.INTEGER
    },
    nombre = {
        allowNull: false,
        type: dataTypes.STRING
    },  
    {
        tableName: "UsuariosVIP"
    });
    return User
    }
