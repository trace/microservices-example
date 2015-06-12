/*
Need Publisher
 
Service that sends an initial message to the message broker
*/

var amqp = require('amqp');
var connect = require('../connect');
var messageNeed = require('../message/need');

var config = connect.config;
var connection = connect.createConnection();

var pubInterval = 10000;
var MESSAGE_ORIGIN = 'nodejs-trace';

connection.on('error', function (e) {
  console.log('Error connecting the Need Publisher service', e);
});

// Wait for connection to become established.
connection.on('ready', function () {
  console.log('Connection ready');

  // Setup the exchange
  var exchange = connection.exchange(
    config.exchangeName
    , {type: 'fanout', durable: true, autoDelete: false/*, exclusive: false*/}
    , function (exchange) {
      console.log('Exchange ' + exchange.name + ' is open');
  });

  // Publish
  setInterval(function() {
    var message = messageNeed(MESSAGE_ORIGIN);
    console.log('********** NEED ***********: ', message);
    exchange.publish('', message);  // '' = routing queue
  }, pubInterval);

});
