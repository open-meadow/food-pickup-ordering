// Boilerplate SMS function testing
const { sendClientText, sendRestoText } = require('./twilio.js');

sendClientText('phone# (no space)', 'time(seconds)');

sendRestoText('order# (from DB POST return orders ID)');