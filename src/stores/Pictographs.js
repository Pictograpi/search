import Store from "./Store";
import { getLastPictographs, getTotalPictographs } from "../services/api";

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
 * @param {any} pictographs
 * @returns
 */
function pictographsFetchLastSuccess(pictographs) {
  return {
    type: "PICTOGRAMS_FETCH_LAST",
    payload: {
      last: pictographs.map(pictogram => ({
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
function pictographsFetchTotalSuccess(response) {
  return {
    type: "PICTOGRAMS_FETCH_TOTAL",
    payload: {
      total: response.count
    }
  };
}

export default PictogramReducer;

/**
 * Fetch last pictographs.
 *
 * @export
 * @returns
 */
export function pictographsFetchLast(page) {
  const limit = 24;
  const offset = page * limit;

  return async dispatch => {
    let response = await getLastPictographs(offset, limit);

    dispatch(pictographsFetchLastSuccess(response));
  };
}

export function pictographsFetchTotal() {
  return async dispatch => {
    let response = await getTotalPictographs();

    dispatch(pictographsFetchTotalSuccess(response));
  };
}
