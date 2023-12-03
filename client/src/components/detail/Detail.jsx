import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCountryById } from "../../redux/actions/actions";
import { formatNumber } from "../../generalFunctions/generalFunctions";
import ActivityCard from "../card/ActivityCard";
import style from "./Detail.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.countryDetails);
  const [error, setError] = useState(false);
  const [countryActivities, setCountryActivities] = useState([]);
  console.log("COUNTRYDETAILS", countryDetails);

  useEffect(() => {
    dispatch(getCountryById(params?.id))
      .then((country) => {
        setError(false);
        // Actualizar el estado de countryActivities usando el país obtenido
        setCountryActivities(country.Activities);
      })
      .catch(() => setError(true));
  }, [params]);

  useEffect(() => {
    const countryActivities = async () => {
      try {
        // Verifica si 'props.country' está definido y tiene la propiedad 'id'
        if (props.country && props.country.id) {
          const response = await axios.get(
            `http://localhost:3001/countries/${props.country.id}/activities`
          );
          setCountryActivities(response.data);
        } else {
          console.error(
            "El objeto props.country o su propiedad id es undefined."
          );
        }
      } catch (error) {
        console.error("Error al obtener actividades asociadas al país:", error);
      }
    };

    countryActivities();
  }, [props.country]);

  return (
    <div className={`${style.detailContainer} ${style.contentOrder}`}>
      <Link to="/home" className={style.homeButton}>
        ↩Go home
      </Link>
      <div>
        <div>
          {error ? (
            <div>
              <h2>Country not found</h2>
            </div>
          ) : (
            <div className={`${style.countryDetails} ${style.contentOrder}`}>
              {countryDetails ? (
                <div className={style.countryDetailsContent}>
                  <h2>{countryDetails.name}</h2>
                  <img src={countryDetails.flag_image} alt="" />
                  <p>Capital: {countryDetails.capital}</p>
                  <p>Subregion: {countryDetails.subregion}</p>
                  <p>Area: {formatNumber(countryDetails.area)} km²</p>
                  <p>Population: {formatNumber(countryDetails.population)}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>
        <div>
          {countryDetails && countryDetails.Activities.length >= 1 ? (
            <div className={style.activityContainer}>
              <h2>Country activities:</h2>
              {countryDetails &&
                countryDetails.Activities.map((activity) => (
                  <div key={activity.id}>
                    <h3>{activity.name}</h3>
                    <p>Difficulty: {activity.difficulty}</p>
                    <p>Duration: {activity.duration} hours</p>
                    <p>Season: {activity.season}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {countryActivities.map((activity) => (
                <div key={activity.id}>
                  <ActivityCard />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
