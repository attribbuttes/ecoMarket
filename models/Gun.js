module.exports = (sequelize, dataTypes)=>{

    let alias = "Guns"; //alias
    let cols = { //columnas
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        title: {
            type: dataTypes.STRING
        },
        length: {
            type: dataTypes.INTEGER
        }
    };

    let config = { //configuracion
        tableName: "movies",
        timestamps: false
    };
    const Pelicula = sequelize.define(alias, cols, config)

    return Pelicula;
}

