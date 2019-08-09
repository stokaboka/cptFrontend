<template>
  <div>
    <q-markup-table v-if="notEmpty" separator="cell">
          <thead>
          <tr class="bg-blue-grey-4">
            <td :colspan="omColumns.length">
              <div class="text-h6 text-left text-white">{{omTitle}}</div>
            </td>
          </tr>
          <tr>
            <th v-for="column in omColumns" :key="column.key">
              <strong>{{column.label}}</strong>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in omRows" :key="row._id" @click="onRowClick(row)" :class="{'bg-secondary': omRow && row._id === omRow._id}">
            <td v-for="column in omColumns" :key="column.key" :class="{'text-right': column.type === 'number'}">
              <span v-if="column.prop && row[column.name]">{{row[column.name][column.prop]}}</span>
              <span v-else>{{row[column.name]}}</span>
            </td>
          </tr>
          <tr v-if="aggregateRow">
            <td :colspan="omColumns.length" class="bg-yellow-1">
              <strong class="text-left">Total:</strong>
            </td>
          </tr>
          <tr v-if="aggregateRow">
            <td v-for="column in omColumns" :key="column.key" class="bg-yellow-1" :class="{'text-right': column.type === 'number'}">
              <strong>{{aggregateRow[column.key]}}</strong>
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

const existAggregateColumns = (columns) => {
  const idx = columns.findIndex(e => e.aggregate)
  return idx >= 0
}

const calculateAggregateValue = (aggregate) => {
  switch (aggregate.method.toUpperCase()) {
    case 'SUM' :
      return aggregate.sum
    case 'AVERAGE' :
      return aggregate.count !== 0 ? aggregate.sum / aggregate.count : aggregate.sum
  }
}

const calculateAggregateRow = (columns, rows) => {
  if (!existAggregateColumns(columns)) {
    return false
  }
  const out = {}
  for (const column of columns) {
    if (column.aggregate) {
      const aggregate = {
        sum: 0,
        count: 0,
        method: column.aggregate
      }
      for (const row of rows) {
        if (row[column.name]) {
          const value = column.prop ? row[column.name][column.prop] : row[column.name]
          if (value) {
            aggregate.count++
            aggregate.sum += value
          }
        }
      }

      out[column.key] = calculateAggregateValue(aggregate)
    } else {
      out[column.key] = ''
    }
  }
  return out
}

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
    },
    omRow: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      aggregateRow: {}
    }
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
  },
  watch: {
    omRows (val) {
      this.aggregateRow = calculateAggregateRow(this.omColumns, val)
    },
    omColumns (val) {
      this.aggregateRow = calculateAggregateRow(this.val, this.omRows)
    }
  }
}
</script>

<style>
</style>
