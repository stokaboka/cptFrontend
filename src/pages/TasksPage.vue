<template>
  <q-page padding>
    <om-data-list module="tasks"></om-data-list>
  </q-page>
</template>

<script>
import OmDataList from '../components/ui/OmDataList'
export default {
  components: { OmDataList },
  name: 'TasksPage'
}
</script>

<style>
</style>
