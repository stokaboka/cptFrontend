<template>
  <q-page padding>
    <users-list></users-list>
  </q-page>
</template>

<script>
import UsersList from '../components/UsersList'
export default {
  name: 'UsersPage',
  components: { UsersList }
}
</script>

<style>
</style>
