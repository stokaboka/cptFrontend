import { objectToParamStr } from './utils'
import axios from 'axios'
import { Notify } from 'quasar'

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

export const get = (options) => {
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

export const post = (options) => {
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

export const put = (options) => {
  const { commit } = options.store
  const { params, url, mutation } = options

  delete params.__v

  return axios.put(`/${url}`, params)
    .then(response => {
      if (response.data.nModified > 0) {
        commit(mutation, params)
      }
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}

export const remove = (options) => {
  const { commit } = options.store
  const { params, url, mutation } = options

  return axios.delete(`/${url}`, { data: params })
    .then(response => {
      commit(mutation, params)
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}
