const { Kafka } = require("kafkajs");
const { randomUUID } = require('node:crypto');

async function bootstrap() {
    const kafka = new Kafka({
        brokers: ['cuddly-spider-11517-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'Y3VkZGx5LXNwaWRlci0xMTUxNyTTEpKMb0U30d6_5cAhed1DAaMcH8mYk9tfTbQ',
          password: '6_YuBY2A1czv-LNUB_m3WOAwmpPzXk5Fab3BhhuvVgcMvP0EpQbZJ5uZOqxX1q_rr33gZQ==',
        },
        ssl: true,
      })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'test sending notification',
                    category: 'test',
                    recipientId: randomUUID(),
                })
            }
        ]
    })

    await producer.disconnect()
}

bootstrap()