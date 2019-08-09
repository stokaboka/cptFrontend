<template>
  <q-page padding>
    <om-data-list module="users"></om-data-list>
  </q-page>
</template>

<script>
import OmDataList from '../components/OmDataList'
export default {
  name: 'UsersPage',
  components: { OmDataList }
}
</script>

<style>
</style>
