const { postActivity } = require("../controllers/postActivity");

const postActivityHand = async (req, res) => {
  try {
    const activityData = req.body;
    const newActivity = await postActivity(activityData);

    return res.status(201).json(newActivity);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al crear la actividad turística" });
  }
};

module.exports = {
  postActivityHand,
};
