// do rabbitMQ npm install amqplib

const amqp = require('amqplib/callback_api');

const QUEUE = "transcoding_queue";
var channel;

class QueueMessageSender {

    
    constructor() {
        channel = this.setUpQueueConnection();
    }
    

    // establish connection
    setUpQueueConnection() {
        amqp.connect('amqp://localhost', (connectionError, connection) => {
            if (connectionError) {
                throw connectionError;
            }
            // create channel
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    throw channelError;
                }
               // this.channel = channel;
                // assert queue
                channel.assertQueue(QUEUE);

                return channel;
            })
        })
    }

    sendMessageToQueue(message) {
        channel.sendToQueue(QUEUE, Buffer.from(message));
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new QueueMessageSender();
        }
    }
    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;


