import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCountryById } from "../../redux/actions/actions";
import { formatNumber } from "../../generalFunctions/generalFunctions";
import style from "./Detail.module.css"
import { Link } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.countryDetails);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getCountryById(params?.id))
      .then(() => setError(false))
      .catch(() => setError(true));
  }, [params]);

  return (
    <div className={style.detailContainer}>
      <Link to="/home" className={style.homeButton}>
        ↩Go home
      </Link>
      {error 
      ? (<div>
          <h2>Country not found</h2>
        </div>) 
      : (<div>
          {countryDetails 
          ? (<div>
              <img src={countryDetails.flag_image} alt=""/>
              <h2>{countryDetails.name}</h2>
              <p>Capital: {countryDetails.capital}</p>
              <p>Subregion: {countryDetails.subregion}</p>
              <p>Area: {formatNumber(countryDetails.area)} km²</p>
              <p>Population: {formatNumber(countryDetails.population)}</p>
            </div>) 
          : (<p>Loading...</p>)}
        </div>)}
      <div>
        {countryDetails && countryDetails.Activities.length >= 1 
        ? (<div>
            <h2>Activities</h2>
            {countryDetails &&
              countryDetails.Activities.map((activity) => (
                <div key={activity.id}>
                  <h3>{activity.name}</h3>
                  <p>Difficulty: {activity.difficulty}</p>
                  <p>Duration: {activity.duration} hours</p>
                  <p>Season: {activity.season}</p>
                </div>
              ))}
          </div>) 
        : (<p>No activities were found, you can filter all activities in the main menu.</p>)}
      </div>
    </div>
  );
};

export default Detail;