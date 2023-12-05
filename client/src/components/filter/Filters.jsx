import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivities } from "../../redux/actions/actions";
import style from "./Filters.module.css";

const Filters = ({
  onFilter,
  onSearch,
  onFilterActivities,
  onOrder,
  onOrderByPopulation,
}) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    onSearch(name);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleOrder = (event) => {
    onOrder(event.target.value);
  };

  const handleOrderByPopulation = (event) => {
    onOrderByPopulation(event.target.value);
  };

  const handleFilter = (event) => {
    onFilter(event.target.value);
  };

  const handleFilterActivities = (event) => {
    onFilterActivities(event.target.value);
  };

  useEffect(() => {
    // Obtener las actividades al montar el componente
    dispatch(getActivities());
  }, [dispatch]);

  const activityOptions = activities.map((activity) => activity.name);

  return (
    <nav className={style.filterContainer}>
      <ul className={style.filterList}>
        <li className={style.searchContainer}>
          <input
            type="search"
            placeholder="Write a country name"
            value={name}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className={style.searchBar}
          />
          <button onClick={handleSearch} className={style.searchButton}>
            <img
              src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-noir.png"
              alt="Search icon"
            />
          </button>
        </li>
        <li>
          <select id="filterContinent" onChange={handleFilter}>
            <option value="none" hidden>
              Filter by continent
            </option>
            <option value="all">All continents</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
        </li>

        <li>
          <select id="order" onChange={handleOrder} disabled={false}>
            <option value="none" hidden>
              Order by name
            </option>
            <option value="ascendente">Ascendent</option>
            <option value="descendente">Descendent</option>
          </select>
        </li>

        <li>
          <select
            id="orderPopulation"
            onChange={handleOrderByPopulation}
            disabled={false}
          >
            <option value="none" hidden>
              {" "}
              Order by population
            </option>
            <option value="mayor">Most</option>
            <option value="menor">Minor</option>
          </select>
        </li>

        <li>
          <select id="filterActivity" onChange={handleFilterActivities}>
            <option value="none" hidden>
              Filter by activity
            </option>
            <option value="All">All activities</option>
            {activityOptions.map((activity, index) => (
              <option key={index} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Filters;
