<!--
  - Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
  -->

<template>
  <q-page padding>
    <om-data-list module="pipelineTasks"></om-data-list>
  </q-page>
</template>

<script>
import OmDataList from '../components/ui/OmDataList'
export default {
  components: { OmDataList },
  name: 'PipelineTasksPage'
}
</script>

<style>
</style>
