// const { Country, Activity } = require("../db");

// const postActivity = async (req, res) => {
//   try {
//     const { name, difficulty, duration, season, countries } = req.body;

//     if (!name || !difficulty || !countries || countries.length === 0) {
//       return res.status(400).json({ error: "Faltan datos obligatorios" });
//     }

//     const newActivity = await Activity.create({
//       name,
//       difficulty,
//       duration,
//       season,
//     });

//     if (countries && countries.length > 0) {
//       const countryModels = await Country.findAll({ where: { id: countries } });
//       await newActivity.setCountries(countryModels);
//     }

//     return res.status(201).json(newActivity);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ error: "Error al crear la actividad turística" });
//   }
// };

// module.exports = postActivity;

const { Country, Activity } = require("../db");

const postActivity = async (activityData) => {
  try {
    const { name, difficulty, duration, season, countries } = activityData;

    const validSeasons = ["summer", "winter", "spring", "autumn"];
    if (!validSeasons.includes(season)) {
      throw new Error("El valor de 'season' no es válido");
    }

    if (!name || !difficulty || !countries || countries.length === 0) {
      throw new Error("Faltan datos obligatorios");
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    if (countries && countries.length > 0) {
      const countryModels = await Country.findAll({ where: { id: countries } });
      await newActivity.setCountries(countryModels);
    }

    return newActivity;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la actividad turística");
  }
};

module.exports = {
  postActivity,
};
