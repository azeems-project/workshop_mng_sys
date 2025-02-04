// utils/googleMaps.js
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

exports.getLocationDetails = async (address) => {
  const response = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });
  return response.data.results[0];
};