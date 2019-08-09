export default {

  id: 'pipelineTasks',
  title: 'Pipeline Tasks',
  columns: [
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
    },
    {
      label: 'Pipeline',
      name: 'pipeline.name',
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
    },
    {
      label: 'Task',
      name: 'task.name',
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
    },
    {
      label: 'Average Time',
      name: 'task.averageTime',
      type: 'number',
      mask: '',
      edit: false,
      autofocus: false,
      aggregate: 'sum',
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
    pipelineId: 'pipelines.row._id',
    taskId: 'tasks.row._id',
    user: 'users.row',
    pipeline: 'pipelines.row',
    task: 'tasks.row'
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
      prop: 'pipelines.row',
      message: 'No pipeline selected'
    },
    {
      prop: 'tasks.row',
      message: 'No task selected'
    }
  ],
  dialog: {
    create: false,
    edit: false
  },
  edit: {
    create: true,
    edit: false,
    delete: true
  }

}
