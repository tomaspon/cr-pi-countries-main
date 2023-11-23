import React, { useState } from "react";
import { formatNumber } from "../../generalFunctions/generalFunctions";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({id, name, flag_image, continents, capital, subregion, area, population}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div onClick={handleClick} className={style.cardContainer}>
        <img src={flag_image} alt={name}/>
        <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
        </Link>
        <p>Continent: {continents}</p>
        <p>Capital: {capital}</p>
        {subregion && <p>Subregion: {subregion}</p>}
        {area && <p>Area: {formatNumber(area)} km²</p>}
        <p>Population: {formatNumber(population)}</p>
        <Link to={`/detail/activities/${id}`}>
          <p>Show activities</p>
        </Link>
      </div>
  );
};

export default Card;