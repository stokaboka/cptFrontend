<template>
  <div>

  <q-card>
    <q-card-section>
      <q-card-section>
        <div class="text-h6">Users</div>
      </q-card-section>

      <q-separator />

      <div v-if="notEmpty" class="column no-wrap">

        <q-list dense bordered padding class="rounded-borders">
          <q-item clickable v-ripple v-for="usr in users" :key="usr.id" @click="onUserClick(usr)">
            <q-item-section>
              <div class="row no-wrap q-gutter-md">
                <span>{{usr.login}}</span>
                <span>{{usr.name}}</span>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else>
        <span>Users not found</span>
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <q-btn label="create" @click="onCreateUserClick"/>
    </q-card-actions>
  </q-card>

    <om-dialog-editor
      :om-dialog="editor.dialog"
      :om-columns="editor.columns"
      :om-mode="editor.mode"
      :om-row="editor.row"
      @on-dialog-commit="onDialogCommit"
      @on-dialog-cancel="onDialogCancel"
    />

  </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
import OmDialogEditor from './OmDialogEditor'
export default {
  name: 'UsersList',
  components: { OmDialogEditor },
  data () {
    return {
      editor: {
        dialog: 'NONE',
        mode: '',
        columns: [
          {
            label: 'Login',
            name: 'login',
            type: 'text',
            mask: '',
            autofocus: true,
            validations: [
              val => !!val || 'Логин пользователя должно быть заполнено',
              val => (val && val.length >= 3) || `Логин пользователя не менее 3 символов`,
              val => (val && val.length < 50) || `Логин пользователя не более 50 символов`
            ],
            icons: [
              {
                name: 'person_outline',
                slot: 'before'
              }
            ]
          },
          {
            label: 'Name',
            name: 'name',
            type: 'text',
            mask: '',
            autofocus: false,
            validations: [
              val => !!val || 'Имя пользователя должно быть заполнено',
              val => (val && val.length >= 3) || `Имя пользователя не менее 3 символов`,
              val => (val && val.length < 50) || `Имя пользователя не более 50 символов`
            ],
            icons: [
              {
                name: 'person_outline',
                slot: 'before'
              }
            ]
          }
        ],
        row: {}
      }
    }
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

    async onDialogCommit (row) {
      this.editor.dialog = 'NONE'
      await this.createUser(row)
    },
    onDialogCancel () {
      this.editor.dialog = 'NONE'
    },
    async onCreateUserClick () {
      this.editor.dialog = 'CREATE'
      this.editor.row = {
        login: '',
        name: ''
      }
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
