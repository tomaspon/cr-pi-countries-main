const { Country } = require("../db");
const { Sequelize } = require("sequelize");

const getCountryName = async (name) => {
  const countryByName = await Country.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${name}%`,
      },
    },
  });
  return countryByName;
};
module.exports = getCountryName;