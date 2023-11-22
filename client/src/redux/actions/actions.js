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
  
  import axios from "axios";
  
  export const getCountries = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/countries`);
        dispatch({
          type: COUNTRIES,
          payload: response.data,
        });
        console.log("ESTO VIENE DEL ACTION COUNTRIE", responde.data)
      } catch (error) {
        throw Error(error.message);
      }
    };
  };
  
  export const getActivities = (actividad) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/activities`);
        dispatch({
          type: ACTIVITIES,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    };
  };
  
  export const getCountrieById = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        dispatch({
          type: SEARCH_BY_ID,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    };
  };
  
  export const getCountriesByName = (name) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/countries?name=${name}`);
        dispatch({
          type: SEARCH_BY_NAME,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    };
  };
  
  export const createActivity = (activity) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`http://localhost:3001/activities`, activity);
        dispatch({
          type: CREATE_ACTIVITY,
          payload: response.data,
        });
      } catch (error) {
        throw Error(error.message);
      }
    };
  };
  
  export const filterContinents = (continent) => {
    return {
      type: FILTER_CONTINENTS,
      payload: continent,
    };
  };
  
  export const filterActivities = (activity) => {
    return {
      type: FILTER_ACTIVITIES,
      payload: activity,
    };
  };
  
  export const orderCountries = (order) => {
    return {
      type: ORDER_COUNTRIES,
      payload: order,
    };
  };
  
  export const orderByPopulation = (order) => {
    return {
      type: ORDER_BY_POPULATION,
      payload: order,
    };
  };