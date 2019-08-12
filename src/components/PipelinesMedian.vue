<template>
    <div class="row q-gutter-md items-center">
      <span>Pipelines Median:</span>
      <strong>{{medianValue}}</strong>
      <q-btn label="refresh median" @click="refreshMedian"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    },
    ...mapGetters('users', { user: 'row' })
  },
  methods: {
    refreshMedian () {
      this.getMedian()
    },

    getMedianFilter (user) {
      if (user) {
        const { _id: userId } = user
        return { userId }
      }
      return null
    },

    async getMedian () {
      const filter = this.getMedianFilter(this.user)
      this.medianValueArr = await this.median(filter)
    },
    ...mapActions('pipelines', ['median'])
  }
}
</script>

<style>
</style>
