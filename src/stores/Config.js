const ConfigReducer = (
  state = {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    PICTOGRAPI_EMAIL: process.env.PICTOGRAPI_EMAIL,
    PICTOGRAPI_PASSWORD: process.env.PICTOGRAPI_PASSWORD,
    PICTOGRAPI_URL: process.env.PICTOGRAPI_URL
  },
  action
) => state;

export default ConfigReducer;
