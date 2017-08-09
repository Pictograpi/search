import Store from "./Store";
import {
  getLastPictographs,
  getTotalPictographs,
  getPictographsByQuery,
  getPictographsByImageId,
  getImageById,
  getCountByQuery
} from "../services/api";

const ACTIONS = {
  SEARCH: "PICTOGRAPHS_FETCH_BY_QUERY",
  TOTAL: "PICTOGRAPHS_FETCH_TOTAL",
  PICTOGRAPHS_BY_ID: "PICTOGRAPHS_FETCH_ID",
  IMAGE_BY_ID: "PICTOGRAPHS_FETCH_IMAGE_BY_ID",
  COUNT_BY_QUERY: "PICTOGRAPHS_FETCH_COUNT_BY_QUERY"
};

const LIMIT_PER_PAGE = 30;

const PictographReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.TOTAL: {
      state = {
        ...state,
        total: action.payload.total
      };
      break;
    }
    case ACTIONS.SEARCH: {
      state = {
        ...state,
        pictographsByQuery: action.payload.pictographsByQuery
      };
      break;
    }
    case ACTIONS.PICTOGRAPHS_BY_ID: {
      state = {
        ...state,
        pictographsById: action.payload.pictographsById
      };
      break;
    }
    case ACTIONS.IMAGE_BY_ID: {
      state = {
        ...state,
        imageById: action.payload.imageById
      };
      break;
    }
    case ACTIONS.COUNT_BY_QUERY: {
      state = {
        ...state,
        countByQuery: action.payload.countByQuery
      };
      break;
    }
  }

  return state;
};

export default PictographReducer;

/**
 * Fetches total pictographs.
 *
 * @export
 * @returns {Promise} To be resolved when finished.
 */
export function fetchTotalPictographs() {
  return async dispatch => {
    let response = await getTotalPictographs();

    dispatch({
      type: ACTIONS.TOTAL,
      payload: {
        total: response.count
      }
    });
  };
}

/**
 * Fetches pictographs by a given query.
 *
 * @export
 * @param {string} query Query to search pictographs.
 * @param {number} page Page to calculate the offset/limit.
 * @returns {Promise} To be resolved when finished.
 */
export function fetchPictographsByQuery(query, page) {
  const offset = page * LIMIT_PER_PAGE;

  return async dispatch => {
    let response = await getPictographsByQuery(query, offset, LIMIT_PER_PAGE);

    dispatch({
      type: ACTIONS.SEARCH,
      payload: {
        pictographsByQuery: response.map(pictograph => ({
          url: pictograph.image.url,
          id: pictograph.imageId,
          pictographId: pictograph.id
        }))
      }
    });
  };
}

/**
 * Fetches pictographs by image id.
 *
 * @export
 * @param {number} imageId Image id.
 * @returns {Promise} To be resolved when finished.
 */
export function fetchPictographsByImageId(imageId) {
  return async dispatch => {
    let response = await getPictographsByImageId(imageId);

    dispatch({
      type: ACTIONS.PICTOGRAPHS_BY_ID,
      payload: {
        pictographsById: response.map(pictograph => ({
          id: pictograph.id,
          term: pictograph.term,
          languageCode: pictograph.language.code,
          languageName: pictograph.language.name,
          typeCode: pictograph.type.code,
          typeName: pictograph.type.name
        }))
      }
    });
  };
}

/**
 * Fetches image by a given id.
 *
 * @export
 * @param {number} id Image id.
 * @returns {Promise} To be resolved when finished.
 */
export function fetchImageById(id) {
  return async dispatch => {
    let response = await getImageById(id);

    dispatch({
      type: ACTIONS.IMAGE_BY_ID,
      payload: {
        imageById: {
          name: response.name,
          url: response.url,
          externalId: response.extId,
          type: response.type,
          created: response.created
        }
      }
    });
  };
}

/**
 * Fetches count by a given query.
 *
 * @export
 * @param {string} query Query to obtain its count.
 * @returns {Promise} To be resolved when finished.
 */
export function fetchCountByQuery(query) {
  return async dispatch => {
    let response = await getCountByQuery(query);

    dispatch({
      type: ACTIONS.COUNT_BY_QUERY,
      payload: {
        countByQuery: response.count
      }
    });
  };
}
