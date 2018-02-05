'use strict'

const servicebus = require('servicebus')
const retry = require('servicebus-retry')
// const {rabbitmq} = require('../config')

exports.init = function init (config = {}) {
  const bus = servicebus.bus(config)

  bus.use(bus.package())
  bus.use(bus.correlate())
  bus.use(bus.logger())
  bus.use(retry({
    store: new retry.MemoryStore()
  }))
  return bus
}

