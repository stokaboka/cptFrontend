<template>
  <q-page class="flex flex-center">
    <users-list></users-list>
  </q-page>
</template>

<style>
</style>

<script>
import UsersList from '../components/UsersList'
export default {
  name: 'PageIndex',
  components: { UsersList }
}
</script>
