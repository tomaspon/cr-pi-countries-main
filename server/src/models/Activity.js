const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Activity = sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
      },
      season: {
        type: DataTypes.ENUM("", "summer", "winter", "spring", "autumn"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
