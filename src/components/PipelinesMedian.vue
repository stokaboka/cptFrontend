<template>
    <div class="row q-gutter-md items-center">
      <span>Pipelines Median:</span>
      <strong>{{medianValue}}</strong>
      <q-btn label="refresh median" @click="onRefreshMedianClick"/>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PipelinesMedian',
  data () {
    return {
      medianValueArr: []
    }
  },
  mounted () {
    this.getMedian()
  },
  computed: {
    medianValue () {
      return (this.medianValueArr && this.medianValueArr.length === 1) ? this.medianValueArr[0].median : 0
    }
  },
  methods: {
    onRefreshMedianClick () {
      this.getMedian()
    },
    async getMedian () {
      this.medianValueArr = await this.median()
    },
    ...mapActions('pipelines', ['median'])
  }
}
</script>

<style>
</style>
