import React from "react";
import style from "./ActivityCard.module.css";

const ActivityCard = () => {
  return (
    <div className={style.container}>
      {createdActivity && (
        <>
          <h2>Activity Details</h2>
          <p>Name: {createdActivity.name}</p>
          <p>Difficulty: {createdActivity.difficulty}</p>
          <p>Duration: {createdActivity.duration}</p>
          <p>Season: {createdActivity.season}</p>
          <p>
            Countries: <br />
            {createdActivity.countries.map((country) => (
              <span key={country.id}>{country.name}, </span>
            ))}
          </p>
        </>
      )}
    </div>
  );
};

export default ActivityCard;
