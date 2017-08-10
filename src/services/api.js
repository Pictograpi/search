import fetch from "isomorphic-fetch";
import queryString from "query-string";
import Store from "../stores/Store";

let token;

// Spanish language id.
const DEFAULT_LANGUAGE_ID = "58fa1b203852d50029a048a7";

/**
 * Requests to a given route of the api with given options.
 *
 * @param {string} route Route to request.
 * @param {Object} options Options to include in the request.
 * @returns {Promise} To be resolved with the response.
 */
async function doGet(route, options) {
  let params;

  await start();

  params = queryString.stringify(
    Object.assign({ access_token: token }, options)
  );

  return (await fetch(`${process.env.PICTOGRAPI_URL}/${route}?${params}`, {
    method: "GET"
  })).json();
}

/**
 * Starts the API and stores the token.
 */
async function start() {
  let response;

  if (token) {
    return Promise.resolve();
  }

  response = await fetch(`${process.env.PICTOGRAPI_URL}/Accounts/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: process.env.PICTOGRAPI_EMAIL,
      password: process.env.PICTOGRAPI_PASSWORD
    })
  });

  token = (await response.json()).id;

  return Promise.resolve();
}

/**
 * Obtains last pictographs with a given offset and limit.
 *
 * @export
 * @param {number} offset
 * @param {number} limit
 * @returns {Promise} To be resolved with an Array of pictographs.
 */
export function getLastPictographs(offset, limit) {
  return doGet("Images", {
    filter: JSON.stringify({
      offset,
      limit,
      order: "created DESC",
      fields: ["id", "url"]
    })
  });
}

/**
 * Obtains total pictographs in the API.
 *
 * @export
 * @returns {Promise} To be resolved with a number.
 */
export function getTotalPictographs() {
  return doGet("Pictograms/count");
}

/**
 * Obtains total images in the API.
 *
 * @export
 * @returns {Promise} To be resolved with a number.
 */
export function getTotalImages() {
  return doGet("Images/count");
}

/**
 * Obtains pictographs with a given query.
 *
 * @export
 * @param {string} query
 * @returns {Promise} To be resolved with an Array of pictographs.
 */
export async function getPictographsByQuery(query, offset, limit) {
  return doGet("Pictograms", {
    filter: JSON.stringify({
      offset,
      limit,
      where: {
        term: {
          regexp: new RegExp(`^${query}$`, "i").toString()
        },
        languageId: Store.getState().languages.selectedId
      },
      include: {
        relation: "image",
        scope: {
          fields: ["url"]
        }
      }
    })
  });
}

/**
 * Obtains count by a given query.
 *
 * @export
 * @param {string} query Query to filter the count.
 * @returns {Promise} To be resolved with a total count.
 */
export async function getCountByQuery(query) {
  return doGet("Pictograms/count", {
    where: JSON.stringify({
      term: {
        regexp: new RegExp(`^${query}$`, "i").toString()
      },
      languageId: Store.getState().languages.selectedId
    })
  });
}

/**
 * Obtains pictographs associated to an image id.
 *
 * @export
 * @param {string} imageId Image id.
 * @returns {Promise} To be resolved with an array of pictographs.
 */
export function getPictographsByImageId(imageId) {
  return doGet(`Images/${imageId}/pictograms`, {
    filter: JSON.stringify({
      include: ["language", "type"]
    })
  });
}

/**
 * Obtains an image by a given id.
 *
 * @export
 * @param {string} id Image id.
 * @returns {Promise} To be resolved with an image.
 */
export function getImageById(id) {
  return doGet(`Images/${id}`);
}

/**
 * Obtains all languages
 *
 * @export
 * @returns {Promise} To be resolved with languages.
 */
export function getLanguages() {
  return doGet(`Languages`);
}

/**
 * Obtains total languages
 *
 * @export
 * @returns {Promise} To be resolved with total languages.
 */
export function getTotalLanguages() {
  return doGet(`Languages/count`);
}
