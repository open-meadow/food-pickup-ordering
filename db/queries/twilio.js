// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendClientText(clientPhone, orderTime) {
  return client.messages
  .create({
    to: `+1${clientPhone}`,
    messagingServiceSid: 'MG1722efd2941c77fbbb8a7d3aff316147',
    body: `Your order will be ready for pickup in ${Math.ceil(orderTime)} minutes.`
  })
  .then(message => console.log(message.sid))
  .catch (error => console.log(error))
  .done();
};

function sendRestoText(bodyMSG) {
  return client.messages
  .create({
    to: process.env.MY_PHONE_NUMBER,
    messagingServiceSid: 'MG1722efd2941c77fbbb8a7d3aff316147',
    body: `new order ID #${bodyMSG}`
  })
  .then (message => console.log(message.sid))
  .catch (error => console.log(error))
  .done();
};

module.exports = {
  sendClientText,
  sendRestoText
}
