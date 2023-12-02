const { Country, Activity } = require("../db");

const getActivities = async () => {
  try {
    const activities = await Country.findAll({
      include: {
        model: Activity,
        required: true,
      },
    });

    return activities;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getActivities;
