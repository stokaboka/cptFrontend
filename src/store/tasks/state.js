export default {

  id: 'tasks',
  title: 'Tasks',
  columns: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      mask: '',
      edit: true,
      autofocus: true,
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
      label: 'Average Time (seconds)',
      name: 'averageTime',
      type: 'number',
      mask: '',
      aggregate: 'sum',
      edit: true,
      autofocus: false,
      validations: [
        val => !!val || 'The average time must be filled',
        val => (val > 0) || `The average time must be greater than zero`,
        val => (val < 11) || `Average time should be less than or equal to ten`
      ],
      icons: [
        {
          name: 'access_time',
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
    name: '',
    averageTime: 0
  },
  keys: ['userId', 'name', 'averageTime'],
  url: 'tasks',
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
  ],
  aggregate:
    {
      url: 'average-sum'
    },
  dialog: {
    create: true,
    edit: true
  },
  edit: {
    create: true,
    edit: true,
    delete: true
  }
}
