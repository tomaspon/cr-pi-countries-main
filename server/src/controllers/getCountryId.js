const { Country, Activity } = require("../db");

const getCountryId = async (req, res) => {
  try {
    const { idPais } = req.params;

    const country = await Country.findOne({
      where: { id: idPais },
      include: Activity,
    });
    country
      ? res.status(200).json(country)
      : res.status(404).json({ error: "No country found with that ID" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = getCountryId;
