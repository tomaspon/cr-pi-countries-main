const { Country } = require("../db");
const { Sequelize } = require("sequelize");

const getCountryName = async (name) => {
  try {
    const countryByName = await Country.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });

    return countryByName;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getCountryName;
