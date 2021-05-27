import { Server } from 'socket.io'
import { editPost, getPostChange } from '../../lib/api'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', (socket) => {
      socket.on('postChange', (payload) => {
        editPost(payload.payload, payload.slug).then(() => {
          getPostChange(payload.slug).then((postPayload) => {
            socket.emit('getPostChange', { postPayload })
          })
        })
      })
    })
    res.socket.server.io = io
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler
