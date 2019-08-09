<template>
  <div>
    <q-markup-table v-if="notEmpty" separator="cell">
          <thead>
          <tr>
            <th :colspan="omColumns.length">
              <div class="text-h6 text-left">{{omTitle}}</div>
            </th>
          </tr>
          <tr>
            <th v-for="column in omColumns" :key="column.name">
              {{column.label}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in omRows" :key="row._id" @click="onRowClick(row)">
            <td v-for="column in omColumns" :key="column.name">
              <span v-if="column.prop && row[column.name]">{{row[column.name][column.prop]}}</span>
              <span v-else>{{row[column.name]}}</span>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
    <div v-if="isEmpty" class="q-mt-md">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmSimpleList',
  props: {
    omTitle: {
      type: String,
      default () {
        return ''
      }
    },
    omColumns: {
      type: Array,
      required: true
    },
    omRows: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    notEmpty () {
      return this.omRows && this.omRows.length > 0
    },
    isEmpty () {
      return !this.omRows || this.omRows.length === 0
    }
  },
  methods: {
    onRowClick (row) {
      this.$emit('on-row-selected', row)
    }
  }
}
</script>

<style>
</style>
