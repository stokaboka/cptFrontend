<template>
  <q-page padding class="row q-gutter-md">
    <om-data-list module="users"></om-data-list>
    <om-data-list module="pipelines" :om-filter="pipelineFilter"></om-data-list>
    <om-data-list module="pipelineTasks" :om-filter="pipelineTasksFilter"></om-data-list>
    <om-data-list module="tasks"></om-data-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import OmDataList from '../components/ui/OmDataList'
export default {
  name: 'UsersPage',
  components: { OmDataList },
  computed: {
    pipelineFilter () {
      if (this.user) {
        const { _id: userId } = this.user
        return { userId }
      }
      return null
    },
    pipelineTasksFilter () {
      if (this.pipeline) {
        const { _id: pipelineId, userId } = this.pipeline
        return { pipelineId, userId }
      }
      return null
    },
    ...mapGetters('users', { user: 'row' }),
    ...mapGetters('tasks', { task: 'row' }),
    ...mapGetters('pipelines', { pipeline: 'row' })
  }
}
</script>

<style>
</style>
