import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries } from "../../redux/actions/actions";
import validation from "./validation";
import NavBar from "../navBar/NavBar";
import style from "./Form.module.css"

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "1",
    duration: "03:00",
    season: "Summer",
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
    <div className={style.formContainer}>
      <h2>Create activity</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <input type="text" name="name" value={activity.name} onChange={handleChange}/>
          {errors.name !== "" && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Difficulty:</label>
          <select name="difficulty" value={activity.difficulty} onChange={handleChange}>
            <option value="1">Very easy</option>
            <option value="2">Easy</option>
            <option value="3">Medium</option>
            <option value="4">Hard</option>
            <option value="5">Very hard</option>
          </select>
          {errors.difficulty && (<p>{errors.difficulty}</p>)}
        </div>
        
        <div>
          <label>Duration(hours):</label>
          <input type="time" name="duration" value={activity.duration} onChange={handleChange}/>
          {errors.duration && <p >{errors.duration}</p>}
        </div>
        
        <div>
          <label>Season:</label>
          <select name="season" value={activity.season} onChange={handleChange}>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
          {errors.season && <p>{errors.season}</p>}
        </div>

        <div>
          <label>Countries</label>
          {countries.slice().sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
              <div key={country.id}>
                <input type="checkbox" id={country.id} value={country.id} checked={activity.countries.includes(country.id)} onChange={handleCountryChange}/>
                <label htmlFor={country.id}>{country.name} <img src={country.flag_image} alt="" className={style.formFlag}/></label>
              </div>
            ))}
          {errors.countries && (<p>{errors.countries}</p>)}
        </div>
          <button type="submit" onClick={handleSubmit}>Create turistic activity</button>
      </form>
    </div>
  );
};

export default Form;