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
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  const handleFilterByName = (name) => {
    setCurrentPage(1);
    dispatch(getCountryByName(name));
  };

  const handleOrder = (event) => {
    setCurrentPage(1);
    dispatch(orderCountries(event));
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
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const totalPages = Math.ceil(filteredCountries.length / cardsPerPage);

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
          countries={filteredCountries}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          cardsPerPage={cardsPerPage}
        />
        <div className={style.sPaginated}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * cardsPerPage >= filteredCountries.length}
          >
            ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
