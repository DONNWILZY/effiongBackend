const axios = require('axios');




/////// IP ADDRESS DETECTOR

const getLocationInfo = async (ipAddress) => {
  try {
    const response = await axios.get(`https://ipapi.com/${ipAddress}?access_key=YOUR_ACCESS_KEY`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving location information:', error);
    return null;
  }
};

module.exports = {
  getLocationInfo,
};




//// LOCATION DETECTOR
const googleLocatioInfo = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: prcoess.env.GOOGLE_MAP,
      },
    });

    // Extract the relevant location data from the response
    const locationInfo = {
      address: response.data.results[0].formatted_address,
      latitude: response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng,
      // Additional location data can be extracted if needed
    };

    return locationInfo;
  } catch (error) {
    console.error('Error retrieving location information:', error);
    return null;
  }
};

module.exports = {
  googleLocatioInfo,
  googleLocatioInfo
};

