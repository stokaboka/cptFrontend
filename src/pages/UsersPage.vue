<template>
  <q-page padding>
    <om-data-list module="users"></om-data-list>
  </q-page>
</template>

<script>
import OmDataList from '../components/ui/OmDataList'
export default {
  name: 'UsersPage',
  components: { OmDataList }
}
</script>

<style>
</style>
