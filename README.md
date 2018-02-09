# irajs-mq
消息队列，集成 servicebus; 封装常见的配置；

## 用法
安装 `npm i irajs-mq`

使用：请看 examples 目录

## 问题
1、 send 与 listen 的 queue 参数不一致？导致报错 406。
解决：send 时强制增加 `{ack: true, durable: true}`, 详见 examples/sl2/send.js

2、listen 时，如果没有正确处理好 ack 与 reject, 会导致消息一直在 nack （即消息正在消费中）,只有强制关闭连接，消息才回到 ready。
解决：listen 时强制 ack, 如果出现异常，应该用 reject。确保消息一次消费，或者放在别的 queue 待处理。

## LICENSE
MIT
