import React, { useState } from "react";
import { formatNumber } from "../../generalFunctions/generalFunctions";
import { Link } from "react-router-dom";
// import style from "./Card.module.css";

const Card = ({id,name,flag_image,continents,capital,subregion,area,population,}) => {

  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div onClick={handleClick}>
      <div>
        <Link to={`/detail/${id}`}>
          <h2>{name}</h2>
        </Link>
        <img src={flag_image} alt={name}/>
        <h2>Continente: {continents}</h2>
      </div>

      <div>
        <Link to={`/detail/${id}`}>
          <h2>Name: {name}</h2>
        </Link>
        <p>Capital: {capital}</p>
        {subregion && <p>Subregion: {subregion}</p>}
        {area && <p>Area: {formatNumber(area)} km²</p>}
        <p>Population: {formatNumber(population)}</p>
        <div>
          <p>Show all activities</p>
        </div>
      </div>

    </div>
  );
};

export default Card;