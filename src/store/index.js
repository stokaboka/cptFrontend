/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import users from './users'
import tasks from './tasks'
import pipelines from './pipelines'
import pipelineTasks from './pipelineTasks'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    users,
    tasks,
    pipelines,
    pipelineTasks
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
