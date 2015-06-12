var amqp = require('amqp');

// Default connection config
var defaultConfig = {
    host: [boot2docker-ip]
  , port: 5672
  , login: 'guest'
  , password: 'guest'
  , vhost: '/'
  , exchangeName: 'rapids'
  // , connectionTimeout: 10000
  // , noDelay: true
  // , ssl: { enabled : false
};

// Alternatively create a specific vhost / user on RabbitMQ
var environment = 'bart';
var customConfig = {
    host: [boot2docker-ip]
  , port: 5672
  , login: environment
  , password: environment
  , vhost: environment
  , exchangeName: 'rapids'
};

var config = defaultConfig;

function createConnection() {
  return amqp.createConnection(config, {recover: false});
}

module.exports = {
  config: config,
  createConnection: createConnection
};
