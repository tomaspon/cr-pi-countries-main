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
  countryActivities: [],
  filteredCountries: [],
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
      return {
        ...state,
        // Actualiza el array de actividades con la nueva actividad
        activities: [...state.activities, action.payload],
      };

    case FILTER_CONTINENTS:
      let filtered = state.countries;
      if (action.payload !== "All") {
        filtered = state.countries.filter((country) => {
          return country.continents.includes(action.payload);
        });
      }
      return {
        ...state,
        filteredCountries: filtered,
      };

    case ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case FILTER_ACTIVITIES:
      let filteredActivities = state.countryActivities;

      if (action.payload && action.payload.length > 0) {
        filteredActivities = state.countryActivities.filter((country) =>
          country.Activities.some((activity) =>
            action.payload.includes(activity.name)
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
