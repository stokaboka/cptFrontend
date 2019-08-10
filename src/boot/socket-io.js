import io from 'socket.io-client'

export default async ({ store, Vue }) => {
  const api = store.getters['app/api']
  const connection = `${api.address}`

  const socket = io(connection)
  socket.on('connect', function () {
    console.log('Connected')
    // socket.emit('events', { test: 'test' })
    socket.emit('identity', 0, response =>
      console.log('Identity:', response)
    )
  })
  socket.on('events', function (data) {
    console.log('event', data)
  })
  socket.on('exception', function (data) {
    console.log('event', data)
  })
  socket.on('disconnect', function () {
    console.log('Disconnected')
  })

  Vue.prototype.$socket = socket
}
