import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCountryById } from "../../redux/actions/actions";
import { formatNumber } from "../../generalFunctions/generalFunctions";
import style from "./Detail.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.countryDetails);
  const [error, setError] = useState(false);
  const [countryActivities, setCountryActivities] = useState([]);

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
    <div>
      <Link
        to="/home"
        className={style.homeButton}
        style={{ color: "black", marginLeft: "4px" }}
      >
        ↩Go home
      </Link>
      <div className={style.contentOrder}>
        <div>
          {error ? (
            <div>
              <h2>Country not found</h2>
            </div>
          ) : (
            <div className={style.countryDetails}>
              <h2>COUNTRY DETAILS</h2>
              {countryDetails ? (
                <div className={style.countryDetailsContent}>
                  <h3>{countryDetails.name}</h3>
                  <img src={countryDetails.flag_image} alt="" />
                  <p>
                    <b>Capital:</b> {countryDetails.capital}
                  </p>
                  <p>
                    <b>Subregion:</b> {countryDetails.subregion}
                  </p>
                  <p>
                    <b>Area:</b> {formatNumber(countryDetails.area)} km²
                  </p>
                  <p>
                    <b>Population:</b> {formatNumber(countryDetails.population)}
                  </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>
        <hr />
        <div>
          {countryDetails && countryDetails.Activities.length >= 1 ? (
            <div className={style.activityContainer}>
              <h2>⬇ COUNTRY ACTIVITIES ⬇</h2>
              {countryDetails &&
                countryDetails.Activities.map((activity) => (
                  <div key={activity.id} className={style.individualActivity}>
                    <h4>{activity.name}</h4>
                    <p>
                      <b>Difficulty:</b> {activity.difficulty}
                    </p>
                    <p>
                      <b>Duration:</b> {activity.duration} hours
                    </p>
                    <p>
                      <b>Season:</b> {activity.season}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {countryActivities.map((activity) => (
                <div key={activity.id}></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
