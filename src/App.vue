<!--
  - Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
  -->

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
      const { active, scheduled, updated, updatedType, message, busy } = status
      console.log('App onTaskRunnerStatus', status)

      if (active.pipelines) {
        active.pipelines.forEach(_id => {
          this.PIPELINE_TASKS_UPDATE_ROW_STATUS({
            _id,
            status: 'WAIT'
          })
        }, this)
      }

      if (active.tasks) {
        active.tasks.forEach(_id => {
          this.TASKS_UPDATE_ROW_STATUS({ _id, status: 'WAIT' })
        }, this)
      }

      if (scheduled) {
        scheduled.forEach(_id => {
          this.PIPELINE_UPDATE_ROW_STATUS({ _id, status: 'SCHEDULED' })
        }, this)
      }

      if (updated) {
        let color = 'yellow'
        const textColor = 'white'
        this.SET_TASK_RUNNER({
          message: `${message}: ${updated.name} - ${updated.status}`,
          busy
        })
        if (updatedType === 'TASK') {
          this.TASKS_UPDATE_ROW(updated)
          color = 'primary'
        }
        if (updatedType === 'PIPELINE') {
          this.PIPELINE_UPDATE_ROW(updated)
          color = 'accent'
        }
        this.$q.notify({
          color,
          textColor,
          message: `${message} ${updated.name} ${updated.status}`
        })
      } else {
        this.SET_TASK_RUNNER({ message, busy })
      }

      if (message.toUpperCase() === 'Pipelines Queue is Empty'.toUpperCase()) {
        this.$q.notify({
          color: 'positive',
          textColor: 'black',
          message: message
        })
      }
    },

    ...mapMutations('app', ['SET_TASK_RUNNER']),
    ...mapMutations('pipelines', {
      PIPELINE_UPDATE_ROW: 'UPDATE_ROW',
      PIPELINE_UPDATE_ROW_STATUS: 'UPDATE_ROW_STATUS'
    }),
    ...mapMutations('tasks', {
      TASKS_UPDATE_ROW: 'UPDATE_ROW',
      TASKS_UPDATE_ROW_STATUS: 'UPDATE_ROW_STATUS'
    }),
    ...mapMutations('pipelineTasks', {
      PIPELINE_TASKS_UPDATE_ROW_STATUS: 'UPDATE_ROW_STATUS'
    })
  }
}
</script>

<style></style>
