<template>
  <q-page padding class="column q-gutter-md">
    <div class="text-h6">Users, Pipelines, Tasks</div>
    <div class="text-body1">Select "User", "Pipeline", "Task" and click the "CREATE" button in the "Pipeline Tasks" panel</div>
    <div class="row q-gutter-md">
      <om-data-list module="users"></om-data-list>
      <om-data-list module="pipelines" :om-filter="pipelineFilter"></om-data-list>
      <om-data-list module="pipelineTasks" :om-filter="pipelineTasksFilter"></om-data-list>
      <om-data-list module="tasks"></om-data-list>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import OmDataList from '../components/ui/OmDataList'

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
  name: 'UsersPage',
  components: { OmDataList },
  data () {
    return {
      pipelineFilter: null,
      pipelineTasksFilter: null
    }
  },
  computed: {
    // pipelineFilter () {
    //   if (this.user) {
    //     const { _id: userId } = this.user
    //     return { userId }
    //   }
    //   return { userId: '_' }
    // },
    // pipelineTasksFilter () {
    //   if (this.pipeline) {
    //     const { _id: pipelineId, userId } = this.pipeline
    //     return { pipelineId, userId }
    //   }
    //   return { pipelineId: '_', userId: '_' }
    // },
    ...mapGetters('users', { user: 'row' }),
    ...mapGetters('tasks', { task: 'row' }),
    ...mapGetters('pipelines', { pipeline: 'row' })
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
