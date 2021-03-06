import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECH_ERROR,
} from './types';

// Get Techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('/api/techs');
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECH_ERROR,
      payload: err.response,
    });
  }
};

// Add Tech

export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    await fetch('/api/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: ADD_TECH,
      payload: tech,
    });
  } catch (err) {
    dispatch({
      type: TECH_ERROR,
      payload: err.response,
    });
  }
};

// Delete Tech
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/api/techs/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TECH_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
