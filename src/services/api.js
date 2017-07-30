import fetch from "isomorphic-fetch";
import queryString from "query-string";

let token;

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

export async function getPictographsByQueryTotal(query) {
  return doGet("Pictograms/count", {
    where: {
      term: {
        like: query
      },
      languageId: "58fa1b203852d50029a048a7"
    }
  });
}

/**
 * Obtains pictographs with a given query.
 *
 * @export
 * @param {string} query
 * @returns {Promise} To be resolved with an Array of pictographs.
 */
export async function getPictographsByQuery(query) {
  const pictographs = await doGet("Pictograms", {
    filter: JSON.stringify({
      limit: 24,
      where: {
        term: {
          like: query
        },
        languageId: "58fa1b203852d50029a048a7"
      },
      include: {
        relation: "image",
        scope: {
          fields: ["url"]
        }
      }
    })
  });
  const total = await doGet("Pictograms/count", {
    where: JSON.stringify({
      term: {
        like: query
      },
      languageId: "58fa1b203852d50029a048a7"
    })
  });

  return {
    pictographs,
    total: total.count
  };
}
