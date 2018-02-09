const Bus = require('../../')
const config = require('./config')
const util = require('util')
const sleep = util.promisify(setTimeout)

const bus = Bus.init(config.rabbitmq)
// const send = util.promisify(bus.send).bind(bus)
bus.on('ready', () => {
  console.log('[bus] is ready')
})
bus.on('connection.close', (err) => {
  console.log('[bus] connection.close', err)
})

// const opts = {ack: true, durable: true}
// bus.listen(config.queue, {ack: true}, (msg) => {
//   const data = msg.data
//   console.log('[listening] data =>', data)

//   // 消费异常（失败），会再接收三次（默认最大次数），然后数据放在另一个 queue `${queue}.error`
//   if (data.index === 1) {
//     msg.handle.reject()
//     return
//   }
//   // 接收后，消费在没有回应的情况下，数据还会留在 `${queue}`
//   if (data.index === 2) {
//     return
//   }
//   msg.handle.ack()
// })

const main = async () => {
  let idx = 5
  while (idx--) {
    const data = {index: idx, msg: 'hello service bus'}
    bus.send(config.queue, data, {ack: true, durable: true})
    console.log(`[send] ${idx}`)
    await sleep(1000)
  }
}

main()
  .then(() => {
    process.exit(1)
  })
  .catch(err => console.log(err))
