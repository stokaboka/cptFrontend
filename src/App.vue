<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  mounted () {
    this.$socket.on('task-runner-status', data => {
      this.onTaskRunnerStatus(data)
    })
  },
  computed: {
    ...mapGetters('app', ['taskRunner'])
  },
  methods: {
    onTaskRunnerStatus (status) {
      const { active, scheduled, updated, message, busy } = status
      console.log('App onTaskRunnerStatus', status)

      this.SET_TASK_RUNNER({ message, busy })

      if (updated) {
        this.PIPELINE_UPDATE_ROW(updated)
        this.PIPELINE_UPDATE_ROW_STATUS({ _id: updated._id, status: 'RUN' })
      }

      if (scheduled) {
        scheduled.forEach(e => {
          this.PIPELINE_UPDATE_ROW_STATUS({ _id: e, status: 'WAIT' })
        }, this)
      }

      if (active.pipeline) {
        this.PIPELINE_TASKS_UPDATE_ROW_STATUS({
          _id: active.pipeline,
          status: 'RUN'
        })
      }
      if (active.task) {
        this.TASKS_UPDATE_ROW_STATUS({ _id: active.task, status: 'RUN' })
      }
    },

    ...mapMutations('app', ['SET_TASK_RUNNER']),
    ...mapMutations('pipelines', {
      PIPELINE_UPDATE_ROW: 'UPDATE_ROW',
      PIPELINE_UPDATE_ROW_STATUS: 'UPDATE_ROW_STATUS'
    }),
    ...mapMutations('tasks', { TASKS_UPDATE_ROW_STATUS: 'UPDATE_ROW_STATUS' }),
    ...mapMutations('pipelineTasks', {
      PIPELINE_TASKS_UPDATE_ROW_STATUS: 'UPDATE_ROW_STATUS'
    })
  }
}
</script>

<style></style>
