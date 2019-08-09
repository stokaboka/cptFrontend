export default {

  id: 'pipelineTasks',
  title: 'Pipeline Tasks',
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
    }
  ],
  row: {},
  rows: [],
  templateRow: {
    userId: 'users.row._id',
    pipelineId: 'pipelines.row._id',
    taskId: 'tasks.row._id',
    name: ''
  },
  keys: ['userId', 'pipelineId', 'taskId'],
  url: 'pipeline-tasks',
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
    },
    {
      prop: 'pipeline.row',
      message: 'No pipeline selected'
    },
    {
      prop: 'tasks.row',
      message: 'No task selected'
    }
  ]

}
