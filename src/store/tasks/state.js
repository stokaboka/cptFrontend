export default {

  id: 'tasks',
  title: 'Tasks',
  columns: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      mask: '',
      autofocus: false,
      validations: [
        val => !!val || 'The task name must be filled',
        val => (val && val.length >= 3) || `Task name at least 3 characters`,
        val => (val && val.length < 50) || `Task name no more than 50 characters`
      ],
      icons: [
        {
          name: 'play_arrow',
          slot: 'before'
        }
      ]
    },
    {
      label: 'Average Time',
      name: 'averageTime',
      type: 'number',
      mask: '',
      autofocus: false,
      validations: [
        val => !!val || 'The average time must be filled',
        val => (val > 0) || `The average time must be greater than zero`
      ],
      icons: [
        {
          name: 'access_time',
          slot: 'before'
        }
      ]
    }
  ],
  row: {},
  rows: [],
  templateRow: {
    userId: 'users.row._id',
    user: 'users.row',
    name: '',
    averageTime: 0
  },
  keys: ['userId', 'name', 'averageTime'],
  url: 'tasks',
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
