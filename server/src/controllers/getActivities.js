const { Country, Activity } = require("../db");

const getActivities = async () => {
  try {
    const activities = await Country.findAll({
      include: Activity, // Asociación directa
    });

    return activities;
  } catch (error) {
    throw error; // Relanza el error original
  }
};

module.exports = getActivities;
