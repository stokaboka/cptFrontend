<template>
  <div>
    <q-card>
      <q-card-section>

        <om-simple-list
          :om-title="title"
          :om-columns="columns"
          :om-rows="rows"
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
        <q-btn label="create" @click="onCreateClick"/>
      </q-card-actions>
    </q-card>

    <om-dialog-editor
      :om-dialog="editor.dialog"
      :om-columns="columns"
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
        row: {}
      }
    }
  },
  async mounted () {
    await this.$store.dispatch(`${this.module}/load`)
  },
  computed: {
    title () {
      return this.$store.state[this.module].title
    },
    columns () {
      return this.$store.state[this.module].columns
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
    }
  },
  methods: {
    async onDialogCommit (row) {
      this.editor.dialog = 'NONE'
      await this.$store.dispatch(`${this.module}/create`, row)
    },
    onDialogCancel () {
      this.editor.dialog = 'NONE'
    },
    async onCreateClick () {
      this.editor.row = this.prepateTemplateRow(this.templateRow)
      if (this.editor.row !== null) {
        this.editor.dialog = 'CREATE'
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
              color: 'red',
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
    }
  }
}
</script>

<style>
</style>
