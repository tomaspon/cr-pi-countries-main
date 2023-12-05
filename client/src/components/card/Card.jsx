import React, { useState } from "react";
import { formatNumber } from "../../generalFunctions/generalFunctions";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({
  id,
  name,
  flag_image,
  continents,
  capital,
  subregion,
  area,
  population,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div onClick={handleClick} className={style.cardContainer}>
      <Link to={`/detail/${id}`}>
        <img src={flag_image} alt={name} />
        <div className={style.cardContent}>
          <h2 style={{ color: "black" }}>{name}</h2>
          <p style={{ color: "black", fontWeight: "400" }}>
            <b>Continent:</b> {continents}
          </p>
          <p style={{ color: "black", fontWeight: "400" }}>
            <b>Capital:</b> {capital}
          </p>
          {subregion && (
            <p style={{ color: "black", fontWeight: "400" }}>
              <b>Subregion:</b> {subregion}
            </p>
          )}
          {area && (
            <p style={{ color: "black", fontWeight: "400" }}>
              <b>Area:</b> {formatNumber(area)} km²
            </p>
          )}
          <p style={{ color: "black", fontWeight: "400" }}>
            <b>Population:</b> {formatNumber(population)}
          </p>
          <div>
            <Link to={`/detail/${id}`}>
              <h5
                style={{
                  fontSize: "12px",
                  color: "blueviolet",
                  fontWeight: "600",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                Click in the card to show details
              </h5>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
