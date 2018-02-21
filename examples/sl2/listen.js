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

const asyncDo = async (data) => {
  await sleep(1000)
  console.log('sleep 1s: ', data)
  if (data.index === 5) throw new Error('xxx')
  return data.index
}
// const opts = {ack: true, durable: true}
bus.listen(config.queue, {ack: true}, async (msg) => {
  const data = msg.data
  console.log('[listening] data =>', data)
  const idx = await asyncDo(data)
  // 消费异常（失败），会再接收三次（默认最大次数），然后数据放在另一个 queue `${queue}.error`
  if (idx % 2 === 0) {
    msg.handle.reject()
  } else {
    msg.handle.ack()
  }
  // 接收后，消费在没有回应的情况下，数据还会留在 `${queue}`；如果该通道连续没有关闭，消息一直在 unack 状态。如果通道关闭，消息回到 ready；应该避免出现这类错误，或者强制 ack.
  // if (data.index === 2) {
  //   return
  // }
})

