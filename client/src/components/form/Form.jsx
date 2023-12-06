import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../../redux/actions/actions";
import validation from "./validation";
import style from "./Form.module.css";
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "0",
    duration: "00:00",
    season: "",
    countries: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const updatedCountries = activity.countries.includes(selectedCountry)
      ? activity.countries.filter((country) => country !== selectedCountry)
      : [...activity.countries, selectedCountry];
    setActivity({ ...activity, countries: updatedCountries });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Activity data to be sent:", activity);
    if (Object.entries(errors).length === 0) {
      const activityData = { ...activity };

      // Verificar que los países seleccionados tienen un atributo 'id'
      const selectedCountriesWithId = activity.countries.filter(
        (country) => country.id
      );

      // Luego, enviar a la acción solo aquellos países con 'id' definido
      dispatch(createActivity(activityData, selectedCountriesWithId));
    }
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (
      activity.name !== "" ||
      activity.duration !== "" ||
      activity.difficulty !== "" ||
      activity.season !== "" ||
      activity.countries.length !== 0
    ) {
      const activityValidated = validation(activity);
      setErrors(activityValidated);
    }
  }, [activity]);

  return (
    <div className={style.container}>
      <Link
        to="/home"
        className={style.homeButton}
        style={{ color: "black" }}
        title="Go home"
      >
        ↩Go home
      </Link>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <div className={style.formContent}>
          <div>
            <h2
              className={style.createTitle}
              style={{ fontWeight: "700", fontSize: "24px" }}
            >
              🎲 CREATE ACTIVITY 🎲
            </h2>
          </div>
          <div className={style.allLabels}>
            <div>
              <label className={style.labels}>Name:</label>
              <br />
              <input
                placeholder="Name activity"
                type="text"
                name="name"
                value={activity.name}
                onChange={handleChange}
                className={style.namePlaceHolder}
              />
              {errors.name !== "" && <p>{errors.name}</p>}
            </div>

            <div>
              <label className={style.labels}>Difficulty:</label>
              <br />
              <select
                name="difficulty"
                value={activity.difficulty}
                onChange={handleChange}
              >
                <option value="">Level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>

            <div>
              <label className={style.labels}>Duration (in hours):</label>
              <br />
              <input
                type="time"
                name="duration"
                value={activity.duration}
                onChange={handleChange}
              />
              {errors.duration && <p>{errors.duration}</p>}
            </div>

            <div>
              <label className={style.labels}>Season:</label>
              <br />
              <select
                name="season"
                value={activity.season}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
              </select>
              {errors.season && <p>{errors.season}</p>}
            </div>

            <div>
              <label className={style.labels}>Countries:</label>
              <br />
              <div className={style.selectContainer}>
                <select
                  multiple
                  value={activity.countries}
                  onChange={handleCountryChange}
                >
                  {countries
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                </select>
                {errors.countries && <p>{errors.countries}</p>}
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={style.createButton}
            title="Create activity"
          >
            ¡CREATE!
          </button>
        </div>
      </form>
      <hr
        style={{
          margin: "20px",
          height: "200px",
          position: "relative",
          top: "200px",
          border: "solid 1px blueviolet",
        }}
      />
      <div className={style.prevCardContainer}>
        <h2>🧪 ACTIVITY PREVIEW 🧪</h2>
        <div className={style.prevCardTexts}>
          <p>
            <b>Name:</b> {activity.name}
          </p>
          <p>
            <b>Difficulty:</b> {activity.difficulty}
          </p>
          <p>
            <b>Duration:</b> {activity.duration}
          </p>
          <p>
            <b>Season:</b> {activity.season}
          </p>
          <p>
            <b>Countries:</b> <br />
            {activity.countries.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
