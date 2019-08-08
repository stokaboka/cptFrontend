<template>
  <q-card>
    <q-card-section>
      <div v-if="notEmpty" class="column no-wrap">
        <div class="row no-wrap" v-for="usr in users" :key="usr.id" @click="onUserClick(usr)">
          <span>{{usr.login}}</span>
          <span>{{usr.name}}</span>
        </div>
      </div>
      <div>
        <span>Users not found</span>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn label="create" @click="onCreateUserClick"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'UsersList',
  data () {
    return {}
  },
  async mounted () {
    await this.loadUsers()
  },
  computed: {
    notEmpty () {
      return this.users && this.users.length > 0
    },
    ...mapGetters('app', ['users'])
  },
  methods: {
    async onCreateUserClick () {
      await this.createUser({
        login: 'www',
        name: 'xxxxxx'
      })
    },
    onUserClick (user) {
      this.SET_USER(user)
    },
    ...mapMutations('app', ['SET_USER']),
    ...mapActions('app', ['loadUsers', 'createUser'])
  }
}
</script>

<style>
</style>
