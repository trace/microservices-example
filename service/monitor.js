/*
Monitor

Service that listens for all messages that have been sent to the message broker
*/
var amqp = require('amqp');
var connect = require('../connect');

var config = connect.config;
var connection = connect.createConnection();

connection.on('error', function (e) {
  console.log('Error connecting the Monitor service', e);
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

  // Use the default 'amq.topic' exchange
  connection.queue(''
    , {exclusive: true/*, durable: true*/}
    , function (q) {
      console.log('Queue connected');

      q.bind(exchange, '', function() {
        console.log('Waiting for solutions on the '+ config.vhost + ' bus');
      });

      q.subscribe(function (message) {
        if(message.data) {
          message = JSON.parse(message.data.toString());
        }
        console.log('********** MONITOR ***********: ', message);
      });
  });
});
