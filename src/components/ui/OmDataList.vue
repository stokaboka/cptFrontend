<template>
  <div>
    <q-card>
      <q-card-section>
        <om-simple-list
          :om-title="title"
          :om-columns="displayColumns"
          :om-rows="rows"
          :om-row="row"
          :om-aggregate-row="aggregateRow"
          @on-row-selected="onRowClick"
        >
          <template v-slot:empty>
            <div class="text-h6 text-left">{{title}}</div>
            <span>Data not found</span>
          </template>
        </om-simple-list>

      </q-card-section>

      <q-separator/>

      <q-card-actions>
        <q-btn v-if="edit.create" label="create" @click="onCreateClick"/>
        <q-btn v-if="edit.edit" label="edit" :disable="!row" @click="onEditClick"/>
        <q-btn v-if="edit.delete" label="delete" :disable="!row" @click="onDeleteClick"/>
        <div>
          <slot name="actions"></slot>
        </div>
      </q-card-actions>
    </q-card>

    <om-dialog-editor
      :om-dialog="editor.dialog"
      :om-columns="editColumns"
      :om-mode="editor.mode"
      :om-template-row="editor.row"
      @on-dialog-commit="onDialogCommit"
      @on-dialog-cancel="onDialogCancel"
    />

  </div>
</template>

<script>

import OmDialogEditor from './OmDialogEditor'
import OmSimpleList from './OmSimpleList'
import { mapGetters } from 'vuex'
export default {
  name: 'OmDataList',
  components: { OmSimpleList, OmDialogEditor },
  props: {
    module: {
      type: String,
      required: true
    },
    omFilter: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      aggregateRow: null,
      editor: {
        dialog: 'NONE',
        mode: '',
        row: {}
      }
    }
  },
  async mounted () {
    await this.load(this.omFilter)
  },
  watch: {
    async omFilter (val) {
      await this.load(val)
    }
  },
  computed: {
    ...mapGetters('users', { user: 'row' }),
    title () {
      return this.$store.state[this.module].title
    },
    columns () {
      return this.$store.state[this.module].columns
    },
    displayColumns () {
      return this.columns.map(e => {
        const key = e.name
        if (e.name.indexOf('.') >= 0) {
          const a = e.name.split('.')
          return {
            ...e,
            name: a[0],
            prop: a[1],
            key
          }
        } else {
          return { ...e, prop: false, key }
        }
      })
    },
    editColumns () {
      return this.columns.filter(e => e.edit)
    },
    rows () {
      return this.$store.state[this.module].rows
    },
    row () {
      return this.$store.state[this.module].row
    },
    templateRow () {
      return this.$store.state[this.module].templateRow
    },
    required () {
      return this.$store.state[this.module].required
    },
    aggregate () {
      if (this.$store.state[this.module].aggregate) {
        return this.$store.state[this.module].aggregate
      } else {
        return null
      }
    },
    dialog () {
      if (this.$store.state[this.module].dialog) {
        return this.$store.state[this.module].dialog
      } else {
        return {
          create: true,
          edit: true
        }
      }
    },
    edit () {
      if (this.$store.state[this.module].edit) {
        return this.$store.state[this.module].edit
      } else {
        return {
          create: true,
          edit: true,
          delete: true
        }
      }
    }
  },
  methods: {
    async load (filter) {
      await this.$store.dispatch(`${this.module}/load`, filter)
      if (this.aggregate) {
        const rows = await this.$store.dispatch(`${this.module}/aggregate`, filter)
        this.aggregateRow = (rows !== null && rows.length > 0) ? rows[0] : null
      }
    },

    async onDialogCommit (row) {
      switch (this.editor.dialog) {
        case 'CREATE' :
          await this.$store.dispatch(`${this.module}/create`, row)
          break
        case 'EDIT' :
          await this.$store.dispatch(`${this.module}/save`, row)
          break
      }
      this.editor.dialog = 'NONE'
    },
    onDialogCancel () {
      this.editor.dialog = 'NONE'
    },
    async onCreateClick () {
      this.editor.row = this.prepateTemplateRow(this.templateRow)
      if (this.editor.row !== null) {
        if (this.dialog.create) {
          this.editor.dialog = 'CREATE'
        } else {
          await this.$store.dispatch(`${this.module}/create`, this.editor.row)
        }
      }
    },
    onEditClick () {
      if (this.checkOwner(this.user, this.row)) {
        this.editor.row = this.row
        if (this.editor.row !== null) {
          if (this.dialog.edit) {
            this.editor.dialog = 'EDIT'
          }
        }
      } else {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: 'No user selected or access denied'
        })
      }
    },
    async onDeleteClick () {
      if (this.row && this.checkOwner(this.user, this.row)) {
        await this.$store.dispatch(`${this.module}/purge`, this.row)
      } else {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: 'No user selected or access denied'
        })
      }
    },
    onRowClick (row) {
      console.log(row)
      this.$store.commit(`${this.module}/SET_ROW`, row)
    },
    prepateTemplateRow (templateRow) {
      const out = { ...templateRow }
      for (const item in out) {
        const itemValue = out[item]
        if (itemValue) {
          const checkRequired = this.checkRequiredValue(this.required, itemValue)
          if (checkRequired.result) {
            const bindingValue = this.getBindingValue(itemValue, itemValue)
            out[item] = bindingValue
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              message: checkRequired.message
            })
            return null
          }
        }
      }
      return out
    },
    checkRequiredValue (required, itemValue) {
      const rule = required.find(e => itemValue.startsWith(e.prop))
      const out = {
        result: true,
        message: ''
      }
      if (rule) {
        const checkValue = this.getBindingValue(rule.prop, null)
        out.result = checkValue !== null
        out.message = out.result ? '' : rule.message
      }
      return out
    },
    getBindingValue (itemValue, defVal) {
      if (typeof itemValue === 'string' && itemValue.indexOf('.') > 0) {
        const parts = itemValue.split('.')
        if (parts.length === 3) {
          return this.getModulePropFieldValue(parts, defVal)
        }
        if (parts.length === 2) {
          return this.getModulePropValue(parts, defVal)
        }
      }
      return defVal
    },
    getModulePropValue (parts, defVal) {
      const module = parts[0]
      const prop = parts[1]
      if (this.$store.state[module]) {
        const value = this.$store.state[module][prop]
        if (value) {
          return value
        }
      }
      return defVal
    },
    getModulePropFieldValue (parts, defVal) {
      const module = parts[0]
      const prop = parts[1]
      const field = parts[2]
      if (this.$store.state[module] && this.$store.state[module][prop]) {
        const value = this.$store.state[module][prop][field]
        if (value) {
          return value
        }
      }
      return defVal
    },

    checkOwner (user, row) {
      if (row) {
        if (row.hasOwnProperty('userId')) {
          return user !== null ? user._id === row.userId : false
        } else {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style>
</style>
