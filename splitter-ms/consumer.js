const amqp = require('amqplib/callback_api');
const QUEUE_NAME = "splitting_queue";

const makeQueueConnection = () => {

    amqp.connect('amqp://localhost', (connectionError, connection) => {
        if (connectionError) {
            throw connectionError;
        }
        // create channel
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError;
            }

            channel.assertQueue(QUEUE_NAME);

            channel.consume(QUEUE_NAME, (message) => {
                console.log($(message.content.toString))
            });
        });
    });

}