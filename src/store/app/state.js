/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

export default {
  version: '0.0.1',
  api: {
    address: process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : '',
    version: 'api/v1'
  },
  taskRunner: {
    message: '',
    busy: false
  },
  taskRunnerLog: []
}
