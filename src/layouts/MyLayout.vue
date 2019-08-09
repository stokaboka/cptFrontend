<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Pipelined Tasks App
        </q-toolbar-title>

        <div v-if="user">User: <strong>{{user.name || user.login}}</strong></div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>

        <q-item v-for="item in menu" :key="item.id" clickable :to="item.route">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{item.label}}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      menu: [
        {
          id: 1,
          label: 'Users',
          route: { name: 'users' },
          icon: 'person'
        },
        {
          id: 2,
          label: 'Pipelines',
          route: { name: 'pipelines' },
          icon: 'fast_forward'
        },
        {
          id: 3,
          label: 'Tasks',
          route: { name: 'tasks' },
          icon: 'play_arrow'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('users', { user: 'row' })
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
