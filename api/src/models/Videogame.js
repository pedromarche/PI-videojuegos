const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
   id: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV4,
     primaryKey: true,     
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isAfter: '1990-01-01',
        isBefore: '2022-12-12' 

      }
    },
  rating: {
      type:DataTypes.FLOAT,

    },
  platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  img: {
      type: DataTypes.STRING,
    },
  origin:{
    type: DataTypes.STRING,
  }

  });
};
