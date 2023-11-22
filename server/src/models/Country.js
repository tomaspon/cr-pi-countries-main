const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  const Country = sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING, // cca3
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      flag_image: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      continents: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: false,
      },
      capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      subregion: {
        type: DataTypes.STRING, 
      },
      area: {
        type: DataTypes.FLOAT, 
      },
      population: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};