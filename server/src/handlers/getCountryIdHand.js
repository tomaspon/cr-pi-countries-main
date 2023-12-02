const getCountryId = require("../controllers/getCountryId");

const getCountryIdHand = async (req, res) => {
  try {
    const { idPais } = req.params;
    const country = await getCountryId(idPais);
    return res.status(200).json(country);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getCountryIdHand;
