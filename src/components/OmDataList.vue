<template>
  <div>
    <q-card>
      <q-card-section class="bg-primary text-white">

        <om-simple-list
          :om-title="title"
          :om-columns="columns"
          :om-rows="rows"
          @on-row-selected="onRowClick"
        >
          <template v-slot:empty>
            <span>Data not found</span>
          </template>
        </om-simple-list>

      </q-card-section>

      <q-separator/>

      <q-card-actions>
        <q-btn label="create" @click="onCreateClick"/>
      </q-card-actions>
    </q-card>

    <om-dialog-editor
      :om-dialog="editor.dialog"
      :om-columns="columns"
      :om-mode="editor.mode"
      :om-template-row="templateRow"
      @on-dialog-commit="onDialogCommit"
      @on-dialog-cancel="onDialogCancel"
    />

  </div>
</template>

<script>
// import { mapMutations, mapActions } from 'vuex'
import OmDialogEditor from './ui/OmDialogEditor'
import OmSimpleList from './ui/OmSimpleList'
export default {
  name: 'OmDataList',
  components: { OmSimpleList, OmDialogEditor },
  props: {
    module: {
      type: String,
      required: true
    }
  },
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
    await this.$store.dispatch(`${this.module}/load`)
  },
  computed: {
    model () {
      return this.$store.state[this.module].model
    },
    title () {
      return this.model.title
    },
    columns () {
      return this.model.columns
    },
    rows () {
      return this.model.rows
    },
    row () {
      return this.model.row
    },
    templateRow () {
      return this.model.templateRow
    }
  },
  methods: {
    async onDialogCommit (row) {
      this.editor.dialog = 'NONE'
      await this.$store.dispatch(`${this.module}/create`, row)
      // await this.createUser(row)
    },
    onDialogCancel () {
      this.editor.dialog = 'NONE'
    },
    async onCreateClick () {
      this.editor.dialog = 'CREATE'
      this.editor.row = { ...this.templateRow }
    },
    onRowClick (row) {
      console.log(row)
      this.$store.commit(`${this.module}/SET_ROW`, row)
      // this.SET_USER(row)
    }
    // ...mapMutations('app', ['SET_USER']),
    // ...mapActions('app', ['loadUsers', 'createUser'])
  }
}
</script>

<style>
</style>
