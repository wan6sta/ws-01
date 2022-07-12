import express from 'express'
import ws from 'ws'
import cors from 'cors'
import 'dotenv/config'


const PORT: number = Number(process.env.PORT) || 5000

const wss = new ws.Server({
  port: PORT
}, () => console.log(`Websockets is running on port ${PORT}`))

interface IMessage {
  event: string,
  userName: string,
  id: number,
  message: string
}

wss.on('connection', (ws) => {
  ws.on('message', (message: IMessage) => {
    message = JSON.parse(String(message))
    console.log(message)
    switch (message.event) {
      case 'message':
        broadcastMessage(message)
        break
      case 'connection':
        broadcastMessage(message)
        break
    }
  })
})

function broadcastMessage(message: IMessage) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
  })
}

