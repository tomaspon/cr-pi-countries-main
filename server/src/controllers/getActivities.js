const { Activity, Country } = require("../db");

const getActivities = async (req, res) => {
  try {
    const activities = await Country.findAll({
      include: {
        model: Activity,
        required: true, 
      },
    });
    activities.length > 0
      ? res.status(200).json(activities)
      : res.status(200).send("No se encontraron actividades");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = getActivities;