<template>
  <q-card>
    <q-card-section>
      <span class="text-h6">
        Task Runner Log
      </span>
    </q-card-section>
    <q-card-section class="column no-wrap">
      <span v-for="(log, index) in taskRunnerLog" :key="index">
        {{log.message}}
      </span>
    </q-card-section>
    <q-card-actions>
      <q-btn label="clear log" @click="onClearLogClick"/>
    </q-card-actions>
  </q-card>
  </template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'OmRunnerLog',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('app', ['taskRunnerLog'])
  },
  methods: {
    onClearLogClick () {
      this.CLEAR_TASK_RUNNER_LOG()
    },
    ...mapMutations('app', ['CLEAR_TASK_RUNNER_LOG'])
  }
}
</script>

<style>
</style>
