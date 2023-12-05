const { Activity, Country } = require("../db");

const getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities,
};
