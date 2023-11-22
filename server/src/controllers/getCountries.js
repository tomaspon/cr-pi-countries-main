const axios = require("axios");
const { Country } = require("../db");
const URL = "http://localhost:5000/countries"


const getCountries = async (req, res) => {
    let allCountry = await Country.findAll();
  
    if (allCountry.length === 0) {
      const response = await axios.get(URL);
      const countries = response.data;
      const destructuringCountries = countries.map((countryData) => ({
        id: countryData.cca3,
        name: countryData.name.common,
        flag_image: countryData.flags.png,
        continents: countryData.continents,
        capital: countryData.capital,
        subregion: countryData.subregion,
        area: countryData.area,
        population: countryData.population,
      }));
  
      await Country.bulkCreate(destructuringCountries);
      allCountry = await Country.findAll();
    }
    return allCountry;
  };
  
  module.exports = getCountries;
