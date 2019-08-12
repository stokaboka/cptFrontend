<template>
  <div class="row no-wrap">
    <div v-for="(log, index) in taskRunnerLog" :key="index">
      {{log.message}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OmRunnerLog',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('app', ['taskRunnerLog'])
  }
}
</script>

<style>
</style>
