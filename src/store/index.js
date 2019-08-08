import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'

// import example from './module-example'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
