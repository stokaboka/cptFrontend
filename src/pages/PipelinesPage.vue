<template>
  <q-page padding>
    <om-data-list module="pipelines"></om-data-list>
  </q-page>
</template>

<script>
import OmDataList from '../components/ui/OmDataList'
export default {
  components: { OmDataList },
  name: 'PipelinesPage'
}
</script>

<style>
</style>
