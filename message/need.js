var uuid = require('uuid4');

var TIME_TO_LIVE = 20;

function getId() {
  return uuid();
}

function need(origin) {
  return {
    messageId: getId(),
    messageType: 'RENTAL_OFFER_NEED',
    origin: origin,

    ttl: TIME_TO_LIVE,
    need: 'car_rental_offer',
    solutions: [],
    membershipId: getId()
  }
}

module.exports = need;
