import React from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";

const Cards = ({ countries, currentPage, cardsPerPage }) => {
  if (!countries || !Array.isArray(countries)) {
    return <div>No se han encontrado países.</div>;
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = countries.slice(indexOfFirstCard, indexOfLastCard);

  return (
    
    <div className={styles.cardsContainer}>
    
      {currentCards.map(({id,name,flag_image,continents,capital,subregion,area,population,}) => (
          <div key={id} className={styles.card}>
            <Card
              id={id}
              name={name}
              flag_image={flag_image}
              continents={continents}
              capital={capital}
              subregion={subregion}
              area={area}
              population={population}
            />
          </div>
          ))}
    </div>
  );
};

export default Cards;