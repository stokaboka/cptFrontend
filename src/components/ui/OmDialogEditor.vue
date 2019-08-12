<!--
  - Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
  -->

<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="column">
        <q-input v-for="column in omColumns" :key="column.name"
                 v-model="row[column.name]"
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
        <q-btn color="warning" text-color="black" label="cancel" v-close-popup @click="onDialogCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'OmDialogEditor',
  props: {
    omDialog: {
      type: String,
      required: true
    },
    omColumns: {
      type: Array,
      required: true
    },
    omMode: {
      type: String
    },
    omTemplateRow: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      dialog: false,
      row: {}
    }
  },
  methods: {
    onDialogOkClick () {
      const { row } = this
      this.$emit('on-dialog-commit', row)
    },
    onDialogCancelClick () {
      this.$emit('on-dialog-cancel')
    },
    onFormInput (name, value) {
      console.log(name, value)
    }
  },
  watch: {
    omDialog (val) {
      this.dialog = val !== 'NONE'
      this.row = { ...this.omTemplateRow }
    }
  }
}
</script>

<style>
</style>
