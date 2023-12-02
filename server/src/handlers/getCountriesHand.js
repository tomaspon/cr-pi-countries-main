const getCountries = require("../controllers/getCountries");

const getCountriesHand = async (req, res) => {
  try {
    const allCountry = await getCountries();
    return res.json(allCountry);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getCountriesHand;
