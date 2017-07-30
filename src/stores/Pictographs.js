import Store from "./Store";
import {
  getLastPictographs,
  getTotalPictographs,
  getPictographsByQuery
} from "../services/api";

const LIMIT_PER_PAGE = 24;

const PictographReducer = (state = [], action) => {
  switch (action.type) {
    case "PICTOGRAPHS_FETCH_LAST": {
      state = {
        ...state,
        isSearch: false,
        last: action.payload.items
      };
      break;
    }
    case "PICTOGRAPHS_FETCH_TOTAL": {
      state = {
        ...state,
        total: action.payload.total
      };
      break;
    }
    case "PICTOGRAPHS_FETCH_SEARCH": {
      state = {
        ...state,
        isSearch: true,
        found: action.payload.items,
        query: action.payload.query,
        totalFound: action.payload.total
      };
      break;
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
    type: "PICTOGRAPHS_FETCH_LAST",
    payload: {
      items: pictographs.map(pictograph => ({
        url: pictograph.url,
        id: pictograph.id
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
    type: "PICTOGRAPHS_FETCH_TOTAL",
    payload: {
      total: response.count
    }
  };
}

/**
 * Action launched when fecthing pictographs by query success.
 *
 * @param {any} response
 * @param {string} query
 * @returns
 */
function pictographsFetchSearchSuccess(response, query) {
  return {
    type: "PICTOGRAPHS_FETCH_SEARCH",
    payload: {
      items: response.pictographs.map(pictograph => ({
        url: pictograph.image.url,
        id: pictograph.imageId,
        pictographId: pictograph.id
      })),
      total: response.total,
      query
    }
  };
}

export default PictographReducer;

/**
 * Fetch last pictographs.
 *
 * @export
 * @returns
 */
export function pictographsFetchLast(page) {
  const offset = page * LIMIT_PER_PAGE;

  return async dispatch => {
    let response = await getLastPictographs(offset, LIMIT_PER_PAGE);

    dispatch(pictographsFetchLastSuccess(response));
  };
}

export function pictographsFetchTotal() {
  return async dispatch => {
    let response = await getTotalPictographs();

    dispatch(pictographsFetchTotalSuccess(response));
  };
}

export function pictographsSearch(query, page) {
  const offset = page * LIMIT_PER_PAGE;

  return async dispatch => {
    let response = await getPictographsByQuery(query);

    dispatch(pictographsFetchSearchSuccess(response, query));
  };
}
