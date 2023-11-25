const { Country, Activity } = require("../db");

const postActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    // Validación de datos
    if (!name || !difficulty || !countries || countries.length === 0 || typeof difficulty !== 'number') {
      return res.status(400).json({ error: "Datos obligatorios incorrectos o faltantes" });
    }

    // Crear nueva actividad
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // Asociar países si se proporcionaron
    if (countries && countries.length > 0) {
      const countryModels = await Country.findAll({ where: { id: countries } });
      await newActivity.setCountries(countryModels);
    }

    // Registro de la actividad creada
    console.log("Nueva actividad creada:", newActivity);

    // Respuesta con código 201 y la actividad creada
    return res.status(201).json(newActivity);
  } catch (error) {
    // Registro detallado del error
    console.error("Error al crear la actividad turística:", error);

    // Respuesta con código 500 y mensaje de error
    return res.status(500).json({ error: "Error al crear la actividad turística" });
  }
};

module.exports = postActivity;
