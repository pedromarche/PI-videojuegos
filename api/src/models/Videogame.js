const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositekey',
    },
    description: {
      type: DataTypes.STRING,

    },
    launch_date: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type:DataTypes.INTEGER,
    }

  });
};
