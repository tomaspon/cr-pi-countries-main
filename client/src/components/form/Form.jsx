import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../../redux/actions/actions";
import validation from "./validation";
import style from "./Form.module.css"
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "1",
    duration: "01:00",
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(errors).length === 0) {
      dispatch(createActivity(activity)); 
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
      setErrors(activityValidated); }
  }, [activity]);

  return (
    <div className={style.container}>
      <Link to="/home" className={style.homeButton}>
        ↩Go home
      </Link>
      <form onSubmit={handleSubmit} className={style.formContainer}>
      <div>
      <h2 className={style.createTitle}>CREATE ACTIVITY</h2>
      </div>
      <div className={style.allLabels}>
        <div>
          <label>Name:</label>
          <br />
          <input placeholder="Name activity" type="text" name="name" value={activity.name} onChange={handleChange} className={style.namePlaceholder}/> 
          {errors.name !== "" && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Difficulty:</label>
          <br />
          <select name="difficulty" value={activity.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Very hard">Very hard</option>
            <option value="Expert">Expert</option>
          </select>
          {errors.difficulty && (<p>{errors.difficulty}</p>)}
        </div>
        
        <div>
          <label>Duration (in hours):</label>
          <br />
          <input type="time" name="duration" value={activity.duration} onChange={handleChange}/>
          {errors.duration && <p >{errors.duration}</p>}
        </div>
        
        <div>
          <label>Season:</label>
          <br />
          <select name="season" value={activity.season} onChange={handleChange}>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
          {errors.season && <p>{errors.season}</p>}
        </div>
        <div >
  <label>Countries:</label>
  <br />
  <select
    multiple
    value={activity.countries}
    onChange={handleCountryChange}
  >
    {countries.slice().sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
  {errors.countries && (<p>{errors.countries}</p>)}
  </div>
  </div>
      <button type="submit" onClick={handleSubmit} className={style.createButton}>CREATE</button>
      </form>
      <div className={style.prevCardContainer}>
        <h2>PREVIEW</h2>
        <div className={style.prevCardTexts}>
        <p>Name: {activity.name}</p>
        <p>Difficulty: {activity.difficulty}</p>
        <p>Duration: {activity.duration}</p>
        <p>Season: {activity.season}</p>
        <p>Countries: <br />{activity.countries.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default Form;