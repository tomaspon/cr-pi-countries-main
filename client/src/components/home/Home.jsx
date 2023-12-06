import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountries,
  getActivities,
  getCountryByName,
  orderCountries,
  orderByPopulation,
  filterActivities,
  filterContinents,
} from "../../redux/actions/actions";
import Cards from "../cards/Cards";
import Filters from "../filter/Filters";
import NavBar from "../navBar/NavBar";
import style from "./Home.module.css";
import fondoHome from "../../assets/76827.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState("none");
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  const handleFilterByName = (name) => {
    setCurrentPage(1);
    dispatch(getCountryByName(name, selectedActivity));
  };

  const handleOrder = (event) => {
    setCurrentPage(1);
    dispatch(orderCountries(event));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOrderByPopulation = (event) => {
    setCurrentPage(1);
    dispatch(orderByPopulation(event));
  };

  const handleFilter = (event) => {
    setCurrentPage(1);
    dispatch(filterContinents(event));
  };

  const handleFilterActivities = (activity) => {
    setCurrentPage(1);
    dispatch(filterActivities(activity));
  };

  useEffect(() => {
    dispatch(getCountries(selectedActivity));
    dispatch(getActivities());
  }, [dispatch, selectedActivity]);

  return (
    <div style={{ background: `url(${fondoHome})`, backgroundSize: "cover" }}>
      <div>
        <NavBar />
        <Filters
          onSearch={handleFilterByName}
          onFilter={handleFilter}
          onFilterActivities={handleFilterActivities}
          onOrder={handleOrder}
          onOrderByPopulation={handleOrderByPopulation}
        />

        <Cards
          countries={filteredCountries} // Usa filteredCountries en lugar de countries
          currentPage={currentPage}
          onPageChange={handlePageChange}
          cardsPerPage={cardsPerPage}
        />

        <div className={style.sPaginated}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previus page"
          >
            ⬅
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredCountries.length / cardsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * cardsPerPage >= filteredCountries.length}
            title="Next page"
          >
            ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
