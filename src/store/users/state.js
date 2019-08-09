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
        val => !!val || 'Логин пользователя должно быть заполнено',
        val => (val && val.length >= 3) || `Логин пользователя не менее 3 символов`,
        val => (val && val.length < 50) || `Логин пользователя не более 50 символов`
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
        val => !!val || 'Имя пользователя должно быть заполнено',
        val => (val && val.length >= 3) || `Имя пользователя не менее 3 символов`,
        val => (val && val.length < 50) || `Имя пользователя не более 50 символов`
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
