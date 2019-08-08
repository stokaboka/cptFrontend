export default {
  version: '0.0.1',
  api: {
    address: process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : '',
    version: 'api/v1'
  },

  user: null,
  task: null,
  pipe: null,

  users: [],
  tasks: [],
  pipes: []
}
