module.exports = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost'
    // enableConfirms: true
  },
  queue: 'irajs.mq.sl2.xx'
}
