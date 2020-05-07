require('dotenv').load();

export const environment = {
  production: true,
  key: '${process.env.OPEN_WEATHER_API_KEY}'
};
