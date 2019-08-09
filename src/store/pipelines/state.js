export default {

  id: 'pipelines',
  title: 'Pipelines',
  columns: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      mask: '',
      edit: true,
      autofocus: false,
      validations: [
        val => !!val || 'The pipeline name must be filled',
        val => (val && val.length >= 3) || `Pipeline name at least 3 characters`,
        val => (val && val.length < 50) || `Pipeline name no more than 50 characters`
      ],
      icons: [
        {
          name: 'fast_forward',
          slot: 'before'
        }
      ]
    },
    {
      label: 'User',
      name: 'user.name',
      type: 'text',
      mask: '',
      edit: false,
      autofocus: false,
      validations: [],
      icons: [
        {
          name: 'play_arrow',
          slot: 'before'
        }
      ]
    }
  ],
  row: null,
  rows: [],
  templateRow: {
    userId: 'users.row._id',
    user: 'users.row',
    name: ''
  },
  keys: ['userId', 'name'],
  url: 'pipelines',
  mutations: {
    create: 'ADD_ROW',
    load: 'SET_ROWS',
    save: 'UPDATE_ROW',
    remove: 'REMOVE_ROW'
  },
  required: [
    {
      prop: 'users.row',
      message: 'No user selected'
    }
  ]
}
