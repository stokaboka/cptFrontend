<template>
  <q-page padding class="row q-gutter-md">
    <om-data-list module="pipelines"></om-data-list>
    <om-data-list module="pipelineTasks" :om-filter="pipelineTasksFilter"></om-data-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import OmDataList from '../components/ui/OmDataList'
export default {
  components: { OmDataList },
  name: 'PipelinesPage',
  computed: {
    pipelineTasksFilter () {
      if (this.pipeline) {
        const { _id: pipelineId, userId } = this.pipeline
        return { pipelineId, userId }
      }
      return null
    },
    ...mapGetters('pipelines', { pipeline: 'row' })
  }
}
</script>

<style>
</style>
