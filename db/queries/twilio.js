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
    body: `Your order will be ready for pickup in ${Math.ceil(orderTime/60)} minutes.`
  }) 
  .then(message => console.log(message.sid)) 
  .done();
};

function sendRestoText(bodyMSG) {
  return client.messages 
  .create({ 
    to: '+hard coded resto phone #', 
    messagingServiceSid: 'MG1722efd2941c77fbbb8a7d3aff316147',      
    body: `new order ${bodyMSG}`
  }) 
  .then (message => console.log(message.sid)) 
  .done();
};

module.exports = { 
  sendClientText,
  sendRestoText
}