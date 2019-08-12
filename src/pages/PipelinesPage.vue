<template>
  <q-page padding class="row q-gutter-md">
    <om-data-list module="pipelines">
      <template v-slot:actions>
        <q-btn label="run pipeline" @click="onRunPipelineClick"/>
        <pipelines-median ref="median" class="q-ml-md"/>
      </template>
    </om-data-list>
    <om-data-list module="pipelineTasks" :om-filter="pipelineTasksFilter"></om-data-list>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import OmDataList from '../components/ui/OmDataList'
import PipelinesMedian from '../components/PipelinesMedian'
export default {
  components: { PipelinesMedian, OmDataList },
  name: 'PipelinesPage',
  mounted () {
    this.setUser(null)
    this.$refs.median.refreshMedian()
  },
  computed: {
    pipelineTasksFilter () {
      if (this.pipeline) {
        const { _id: pipelineId, userId } = this.pipeline
        return { pipelineId, userId }
      }
      return null
    },
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
    ...mapMutations('users', { setUser: 'SET_ROW' }),
    ...mapActions('pipelines', { runPipeline: 'run' })
  }
}
</script>

<style>
</style>
