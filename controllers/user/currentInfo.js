const useragent = require('user-agent');
const CurrentInfo = require('../../models/user/currentInfo');
const User = require('../../models/user/User');
const { getLocationInfo } = require('../../utility/locationInfo');
const mailer = require('../../utility/mailer');



//////// DEVICE INFO
const userAgentString = req.headers['user-agent'];
const userAgent = useragent.parse(userAgentString);

const device = {
  browser: userAgent.family,
  os: userAgent.os.family,
  device: userAgent.device.family
};

console.log(device);


///////// CURRENT LOCATION

const ipAddress = req.ip; // Assumes you have middleware to retrieve the client's IP address

const locationInfo = await getLocationInfo(ipAddress);

console.log(locationInfo);



