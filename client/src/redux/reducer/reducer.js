import {
    COUNTRIES,
    ACTIVITIES,
    SEARCH_BY_ID,
    SEARCH_BY_NAME,
    CREATE_ACTIVITY,
    FILTER_CONTINENTS,
    FILTER_ACTIVITIES,
    ORDER_COUNTRIES,
    ORDER_BY_POPULATION,
  } from "../action-types/action-types";
  
  const initialState = {
    countries: [],
    activities: [],
    filteredCountries: [],
    countriesActivities: [],
    countryDetails: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      
      case COUNTRIES:
        return {
          ...state,
          countries: action.payload,
          filteredCountries: action.payload,
        };
      
      case ACTIVITIES:
        return {
          ...state,
          countriesWitchActivities: action.payload,
        };
      
      case SEARCH_BY_ID:
        return {
          ...state,
          countryDetails: action.payload,
        };
      
      case SEARCH_BY_NAME:
        return {
          ...state,
          filteredCountries: action.payload,
        };
      
      case CREATE_ACTIVITY:
        return { ...state, activities: action.payload }; // Se recibe la activities para que luego mostremos un detail con la actividad creada
      
      case FILTER_CONTINENTS:
        let filtered = state.countries;
        if (action.payload !== "Todos") {
          filtered = state.countries.filter((country) => {
            return country.continents.includes(action.payload);
          });
        }
        return {
          ...state,
          filteredCountries: filtered,
        };
      
      case FILTER_ACTIVITIES:
        let filteredActivities = state.countriesWitchActivities;
        if (action.payload !== "Todos") {
          filteredActivities = state.countriesWitchActivities.filter((country) =>
            country.Activities.some(
              (activity) => activity.name === action.payload
            )
          );
        }
        return {
          ...state,
          filteredCountries: filteredActivities,
        };
      
      case ORDER_COUNTRIES:
        let resultOrder = [...state.filteredCountries];
        if (action.payload === "ascendente") {
          resultOrder.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          resultOrder.sort((a, b) => b.name.localeCompare(a.name));
        }
        return {
          ...state,
          filteredCountries: resultOrder,
        };
      
      case ORDER_BY_POPULATION:
        let resultOrderByPopulation = [...state.filteredCountries];
        if (action.payload === "mayor") {
          resultOrderByPopulation.sort((a, b) => b.population - a.population);
        } else {
          resultOrderByPopulation.sort((a, b) => a.population - b.population);
        }
        return {
          ...state,
          filteredCountries: resultOrderByPopulation,
        };
      default:
        return state;
    }
  };
  export default reducer;