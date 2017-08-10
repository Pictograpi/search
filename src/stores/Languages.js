import Store from "./Store";
import { getLanguages, getTotalLanguages } from "../services/api";

const ACTIONS = {
  ALL: "LANGUAGES_FETCH_ALL",
  TOTAL: "LANGUAGES_FETCH_TOTAL",
  STORE_SELECTED: "LANGUAGES_STORE_SELECTED"
};

const LanguageReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.ALL: {
      state = {
        ...state,
        all: action.payload.all
      };
      break;
    }
    case ACTIONS.TOTAL: {
      state = {
        ...state,
        total: action.payload.total
      };
      break;
    }
    case ACTIONS.STORE_SELECTED: {
      state = {
        ...state,
        selected: action.payload.selected
      };
      break;
    }
  }

  return state;
};

export default LanguageReducer;

/**
 * Obtains all languages.
 *
 * @export
 * @returns {Promise} To be resolved when finished.
 */
export function fetchAllLanguages() {
  return async dispatch => {
    let response = await getLanguages();

    dispatch({
      type: ACTIONS.ALL,
      payload: {
        all: response.map(language => ({
          id: language.id,
          code: language.code,
          name: language.name
        }))
      }
    });
  };
}

/**
 * Obtains total languages.
 *
 * @export
 * @returns {Promise} To be resolved when finished.
 */
export function fetchTotalLanguages() {
  return async dispatch => {
    let response = await getTotalLanguages();

    dispatch({
      type: ACTIONS.TOTAL,
      payload: {
        total: response.count
      }
    });
  };
}

/**
 * Stores selected language.
 *
 * @export
 * @param {Object} language Language to store.
 * @returns {Object} Dispatched action.
 */
export function storeSelectedLanguage(language) {
  return dispatch => {
    dispatch({
      type: ACTIONS.STORE_SELECTED,
      payload: {
        selected: language
      }
    });
  };
}
