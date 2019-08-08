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

    <q-separator dark />

    <q-card-actions>
      <q-btn label="create" @click="onCreateUserClick"/>
    </q-card-actions>
  </q-card>

    <q-dialog v-model="editor.dialog">
      <q-card>
        <q-card-section class="column">
          <q-input v-for="column in editor.columns" :key="column.name"
                   v-model="editor.row[column.name]"
                   clearable
                   counter
                   outlined
                   square
                   dense
                   :name="column.name"
                   :type="column.type"
                   :mask="column.mask"
                   :ref="column.name"
                   :rules="column.validations"
                   :autofocus="column.autofocus"
                   lazy-rules
                   @keyup.enter="submit"
                   @input="value => onFormInput( column.name, value )"
                   :label="column.label">
            <template v-for="icon in column.icons" v-slot:[icon.slot]>
              <q-icon :name="icon.name"
                      :key="icon.name"
                      :class="{'cursor-pointer': icon.action}"
                      @click="icon.action ? icon.action() : ''"
              ></q-icon>
            </template>
          </q-input>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Ok" v-close-popup @click="onDialogOkClick"/>
          <q-btn color="warning" text-color="black" label="cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'UsersList',
  data () {
    return {
      editor: {
        dialog: false,
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
    onFormInput (name, value) {
      console.log(name, value)
    },
    async onDialogOkClick () {
      this.editor.dialog = false
      await this.createUser(this.editor.row)
    },
    async onCreateUserClick () {
      this.editor.dialog = true
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
