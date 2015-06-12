# Microservice Example

A microservice example using nodejs.

## Requirements

RabbitMQ (optional: with management)

### Setting up RabbitMQ

This example uses Docker to run RabbitMQ.

- If using a Mac you'll need to use boot2docker to run Docker containers. See: https://docs.docker.com/installation/mac/

- Get the RabbitMQ Docker image with management:
```
docker run -d -e RABBITMQ_NODENAME=my-rabbit --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
(See: https://registry.hub.docker.com/__/rabbitmq/)

>This command runs RabbitMQ with management console. It explicitly maps the ports, which also maps the IPs. This might differ when running on Linux / Mac because of boot2docker. On Linux you might be able to use the localhost IP, on Mac you need to use boot2docker IP.

- Now you can access management portal at:
```
http://[boot2dockerIP]:15672, guest, guest
```
- You can access the RabbitMQ message broker using:
```
host: [boot2dockerIP]
port: 5672
login: 'guest'
password: 'guest'
vhost: '/'
```


## Running the project
- Clone the project
- Install the dependancies
- Have RabbitMQ running
- Update connect.js to contain the RabbitMQ host IP
- run each service independently:

```
1. nodemon service/monitor.js
2. nodemon service/need.js
3. nodemon service/solution.js
4. nodemon service/solutionSelector.js
5. nodemon service/membership.js
```

### What this code is attempting to achieve:
- A message / expressed need gets put onto the message bus
- A solution gets appended to the message
- As more information is added to the message, a more adequate solution is presented
- The best solution for a message is printed out


### Overview of logic flow:
- RabbitMQ message broker runs
- To interact with the message broker we create an exchange
- Messages are sent/retrieved from the message broker using a Publish/Subscribe model
- Messages are published to the message broker (via the exchange)
- Messages are retrieved from the message broker via a queue that subscribes to messages (via the exchange)

#### Publish messages to the exchange
1. Connect to RabbitMQ
2. On connected, get a handle to an exchange [*]
3. Publish message using the exchange

#### Subscribe to messages on the exchange
1. Connect to RabbitMQ
2. On connected, get a handle to an exchange [*]
3. Create a queue & bind it to the exchange
4. Subscribe to messages using the queue

> [*] Get a handle to the exchange from the exchange-name - creates a new exchange if non-existant, otherwise returns the existing exchange
