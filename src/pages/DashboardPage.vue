<template>
  <q-page padding class="column q-gutter-md">
    <div class="text-h6">Users, Pipelines, Tasks</div>
    <div class="text-body1">Select "User", "Pipeline", "Task" and click the "CREATE" button in the "Pipeline Tasks" panel</div>
    <div class="row q-gutter-md">
      <om-data-list module="users"></om-data-list>
      <om-data-list module="pipelines" :om-filter="pipelineFilter">
        <template v-slot:actions>
          <q-btn label="run pipeline" @click="onRunPipelineClick"/>
        </template>
      </om-data-list>
      <om-data-list module="pipelineTasks" :om-filter="pipelineTasksFilter"></om-data-list>
      <om-data-list module="tasks"></om-data-list>
      <om-runner-log/>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OmDataList from '../components/ui/OmDataList'
import OmRunnerLog from '../components/OmRunnerLog'

const userFilter = (user) => {
  if (user) {
    const { _id: userId } = user
    return { userId }
  } else {
    return { userId: '_' }
  }
}

const pipelineFilter = (pipeline = null) => {
  if (pipeline) {
    const { _id: pipelineId, userId } = pipeline
    return { pipelineId, userId }
  }
  return { pipelineId: '_', userId: '_' }
}

export default {
  name: 'DashboardPage',
  components: { OmRunnerLog, OmDataList },
  data () {
    return {
      pipelineFilter: null,
      pipelineTasksFilter: null
    }
  },
  computed: {
    ...mapGetters('users', { user: 'row' }),
    ...mapGetters('tasks', { task: 'row' }),
    ...mapGetters('pipelines', { pipeline: 'row' })
  },
  methods: {
    async onRunPipelineClick () {
      if (this.pipeline) {
        const response = await this.runPipeline({ ...this.pipeline })
        console.log('Users run', response)
      } else {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: 'No pipeline selected'
        })
      }
    },
    ...mapActions('pipelines', { runPipeline: 'run' })
  },
  watch: {
    user (val) {
      this.pipelineFilter = userFilter(val)
      this.pipelineTasksFilter = pipelineFilter()
    },
    pipeline (val) {
      this.pipelineTasksFilter = pipelineFilter(val)
    }
  }
}
</script>

<style>
</style>
