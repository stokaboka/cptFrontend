export default {

  id: 'users',
  title: 'Users',
  columns: [
    {
      label: 'Login',
      name: 'login',
      type: 'text',
      mask: '',
      autofocus: true,
      validations: [
        val => !!val || 'The login must be filled',
        val => (val && val.length >= 3) || `User login at least 3 characters`,
        val => (val && val.length < 50) || `User login no more than 50 characters`
      ],
      icons: [
        {
          name: 'person_outline',
          slot: 'before'
        }
      ]
    },
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      mask: '',
      autofocus: false,
      validations: [
        val => !!val || 'Username must be filled',
        val => (val && val.length >= 3) || `Username at least 3 characters`,
        val => (val && val.length < 50) || `Username no more than 50 characters`
      ],
      icons: [
        {
          name: 'person_outline',
          slot: 'before'
        }
      ]
    }
  ],
  row: {},
  rows: [],
  templateRow: {
    login: '',
    name: ''
  },
  keys: ['login', 'name'],
  url: 'users',
  mutations: {
    create: 'ADD_ROW',
    load: 'SET_ROWS'
  }
}
