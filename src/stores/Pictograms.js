import Store from "./Store";
import { getLastPictograms, getTotalPictograms } from "../services/api";

const PictogramReducer = (state = [], action) => {
  switch (action.type) {
    case "PICTOGRAMS_FETCH_LAST": {
      state = {
        ...state,
        isLoading: false,
        isError: false,
        last: action.payload.last
      };
      break;
    }
    case "PICTOGRAMS_FETCH_TOTAL": {
      state = {
        ...state,
        total: action.payload.total
      };
    }
  }

  return state;
};

/**
 * Action launched when fecthing last success.
 * 
 * @param {any} pictograms 
 * @returns
 */
function pictogramsFetchLastSuccess(pictograms) {
  return {
    type: "PICTOGRAMS_FETCH_LAST",
    payload: {
      last: pictograms.map(pictogram => ({
        url: pictogram.url,
        id: pictogram.id
      }))
    }
  };
}

/**
 * Action launched when fecthing total success.
 * 
 * @param {any} total
 * @returns
 */
function pictogramsFetchTotalSuccess(response) {
  return {
    type: "PICTOGRAMS_FETCH_TOTAL",
    payload: {
      total: response.count
    }
  };
}

export default PictogramReducer;

/**
 * Fetch last pictograms.
 * 
 * @export
 * @returns
 */
export function pictogramsFetchLast(page) {
  const limit = 24;
  const offset = page * limit;

  return async dispatch => {
    let response = await getLastPictograms(offset, limit);

    dispatch(pictogramsFetchLastSuccess(response));
  };
}

export function pictogramsFetchTotal() {
  return async dispatch => {
    let response = await getTotalPictograms();

    dispatch(pictogramsFetchTotalSuccess(response));
  };
}
