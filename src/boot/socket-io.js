/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import io from 'socket.io-client'

export default async ({ store, Vue }) => {
  const api = store.getters['app/api']
  const connection = `${api.address}`

  const socket = io(connection)
  socket.on('connect', function () {
    console.log('Connected')
    // socket.emit('events', { test: 'test' })
    socket.emit('identity', 0, response =>
      console.log('identity:', response)
    )
  })
  socket.on('events', function (data) {
    console.log('event', data)
  })
  socket.on('exception', function (data) {
    console.log('exception', data)
  })
  socket.on('testing', function (data) {
    console.log('testing', data)
  })

  // socket.on('task-runner-status', function (data) {
  //   console.log('task-runner-status', data)
  // })

  socket.on('disconnect', function () {
    console.log('Disconnected')
  })

  Vue.prototype.$socket = socket
}
