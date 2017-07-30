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

export function getLastPictograms(offset, limit) {
  return doGet("Images", {
    filter: JSON.stringify({
      offset,
      limit,
      order: "created DESC",
      include: ["pictograms"]
    })
  });
}

export function getTotalPictograms() {
  return doGet("Pictograms/count");
}
