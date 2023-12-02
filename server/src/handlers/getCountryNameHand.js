const getCountryName = require("../controllers/getCountryName");

const getCountryNameHand = async (req, res) => {
  try {
    const { name } = req.params;
    const countries = await getCountryName(name);
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getCountryNameHand;
