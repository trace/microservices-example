var uuid = require('uuid4');

function getId() {
  return uuid();
}
function message(status, origin) {
  return {
    messageId: getId(),
    messageType: 'SERVICE_STATUS',
    origin: origin,
    
    status: status
  }
}

module.exports = message;
