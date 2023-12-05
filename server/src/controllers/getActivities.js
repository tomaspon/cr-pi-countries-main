const { Activity, Country } = require("../db");

const getActivities = async (req, res, next) => {
  try {
    const activities = await Country.findAll({
      include: {
        model: Activity,
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
