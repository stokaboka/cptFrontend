import axios from 'axios'
import { Notify } from 'quasar'
import { objectToParamStr } from '../../lib/utils'

const errorNotify = function (error) {
  // eslint-disable-next-line no-console
  console.warn(error)
  Notify.create({
    message: `Что-то пошло не так...: ${error}`,
    color: 'negative',
    textColor: 'white',
    icon: 'error_outline'
  })
}

const get = (options) => {
  const { commit } = options.store
  const { params, keys, url, mutation } = options
  const paramsList = objectToParamStr(keys, params)

  return axios.get(`/${url}/${paramsList}`)
    .then(response => {
      commit(mutation, response.data)
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}

const post = (options) => {
  const { commit } = options.store
  const { params, url, mutation } = options

  return axios.post(`/${url}`, params)
    .then(response => {
      commit(mutation, response.data)
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}

export const loadUsers = ({ commit }, params) => {
  return get({
    store: {
      commit
    },
    params,
    keys: ['login', 'name'],
    url: 'users',
    mutation: 'SET_USERS'
  })
}

export const createUser = ({ commit }, params) => {
  return post({
    store: {
      commit
    },
    params,
    url: 'users',
    mutation: 'ADD_USER'
  })
}

export const loadTasks = ({ state, commit }, params) => {
  return get({
    store: {
      commit
    },
    params,
    keys: ['userId', 'name'],
    url: 'tasks',
    mutation: 'SET_TASKS'
  })
}

export const loadPipes = ({ state, commit }, params) => {
  return get({
    store: {
      commit
    },
    params,
    keys: ['userId', 'name'],
    url: 'pipes',
    mutation: 'SET_PIPES'
  })
}
