const { Router } = require("express");
const getCountries = require("../controllers/getCountries");
const getCountryId = require("../controllers/getCountryId");
const getCountryName = require("../controllers/getCountryName");
const { postActivityHand } = require("../handlers/postActivityHand");
const getActivities = require("../controllers/getActivities");

const router = Router();

router.get("/countries", async (req, res) => {
  const name = req.query.name;
  try {
    if (name) {
      const countries = await getCountryName(name);
      countries
        ? res.status(200).json(countries)
        : res.status(404).json({ error: "No se encontro información" });
    } else {
      const countries = await getCountries();
      countries.length > 0
        ? res.status(200).json(countries)
        : res.status(404).json({ error: "No se cargo la información" });
    }
  } catch (error) {
    res.status(500).json({ error: "No se pudo cargar la información" });
  }
});

router.get("/countries/:idPais", getCountryId);
router.get("/create-activity", getActivities);
router.post("/create-activity", postActivityHand);

module.exports = router;
