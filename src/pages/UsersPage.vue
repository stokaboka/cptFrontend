<!--
  - Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
  -->

<template>
  <q-page padding class="column q-gutter-md">
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
