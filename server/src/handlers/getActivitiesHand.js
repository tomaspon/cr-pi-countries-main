const getActivities = require("../controllers/getActivities");

const getActivitiesHand = async (req, res) => {
  try {
    const activities = await getActivities();

    if (activities.length > 0) {
      return res.status(200).json(activities);
    } else {
      return res.status(200).send("No se encontraron actividades");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getActivitiesHand;
