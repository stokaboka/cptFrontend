export default {

  id: 'pipelines',
  title: 'Pipelines',
  columns: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      mask: '',
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
    }
  ],
  row: {},
  rows: [],
  templateRow: {
    userId: 'users.row._id',
    name: ''
  },
  keys: ['userId', 'name'],
  url: 'pipelines',
  mutations: {
    create: 'ADD_ROW',
    load: 'SET_ROWS'
  },
  required: [
    {
      prop: 'users.row',
      message: 'No user selected'
    }
  ]
}
