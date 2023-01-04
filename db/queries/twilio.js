const db = require('../connection');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = ACed0f4de7ac43019039992fa77cda9658;
<<<<<<< Updated upstream
const authToken = '83ff14a9bab35cdd25d040c6675f225c';
=======
const authToken = `83ff14a9bab35cdd25d040c6675f225c`;
>>>>>>> Stashed changes
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
<<<<<<< Updated upstream
    to: '+6473776171',
    from: '+19897955570',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?'
=======
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19897955570',
     to: '+16473776171'
>>>>>>> Stashed changes
   })
  .then(message => console.log(message.sid));

const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  
  twiml.message('The Robots are coming! Head for the hills!');
  
  res.type('text/xml').send(twiml.toString());
});
  
app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});