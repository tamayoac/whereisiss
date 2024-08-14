export const environment = {
    production: true,
    mapbox: {
        accessToken: process.env['MAPBOX_ACCESS_TOKEN'] || ''
      },
      issapi: 'https://api.wheretheiss.at/v1/satellites/25544'
  };