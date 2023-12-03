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
      console.log("ESTO VIENE DEL ACTION COUNTRIE", response.data);
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

export const getCountryById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({
        type: SEARCH_BY_ID,
        payload: response.data,
      });
      // Retornar el país para que esté disponible en el componente
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getCountryByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const createActivity = (activityData) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud POST al servidor
      const response = await axios.post(
        "http://localhost:3001/create-activity", // Ajusta la ruta según tu backend
        activityData
      );

      // Dispatch para actualizar el estado con la nueva actividad
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al crear la actividad:", error);
      // Puedes manejar el error de alguna manera si es necesario
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
