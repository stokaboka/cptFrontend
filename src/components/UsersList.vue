<template>
  <div>
  <q-card>
    <q-card-section>

      <om-simple-list
        om-title="Users"
        :om-columns="editor.columns"
        :om-rows="users"
        @on-row-selected="onUserClick"
      >
        <template v-slot:empty>
          <span>Users not found</span>
        </template>
      </om-simple-list>

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
import OmDialogEditor from './ui/OmDialogEditor'
import OmSimpleList from './ui/OmSimpleList'
export default {
  name: 'UsersList',
  components: { OmSimpleList, OmDialogEditor },
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
    ...mapGetters('app', ['users', 'user'])
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
      console.log(user)
      this.SET_USER(user)
    },
    ...mapMutations('app', ['SET_USER']),
    ...mapActions('app', ['loadUsers', 'createUser'])
  }
}
</script>

<style>
</style>
