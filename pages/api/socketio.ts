import { Server } from 'socket.io'
import { editPost } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', (socket) => {
      socket.on('postChange', (payload) => {
        markdownToHtml(payload.payload).then((postPayload) => {
          socket.emit('getPostChange', { postPayload })
        }).finally(() => {
          editPost(payload.payload, payload.slug)
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
