import Vue from 'vue'
import { get, post, put, remove } from '../../lib/axiosWrapper'

const uint8ToString = (buf) => {
  const encodedString = String.fromCharCode.apply(null, new Uint8Array(buf))
  const decodedString = decodeURIComponent(escape(encodedString))
  return decodedString
}

export const load = ({ state, commit }, params) => {
  const { keys, url } = state
  const mutation = state.mutations.load
  return get({
    store: {
      commit
    },
    params,
    keys,
    url,
    mutation
  })
}

export const aggregate = ({ state, commit }, params) => {
  const { keys, url } = state
  const { url: urlAggregate } = state.aggregate
  const mutation = null
  console.log(state.id, params, urlAggregate)
  return get({
    store: {
      commit
    },
    params,
    keys,
    url: `${url}/${urlAggregate}`,
    mutation
  })
}

export const create = ({ state, commit }, params) => {
  const { url } = state
  const mutation = state.mutations.create
  return post({
    store: {
      commit
    },
    params,
    url,
    mutation
  })
}

export const save = ({ state, commit }, params) => {
  const { url } = state
  const mutation = state.mutations.save
  return put({
    store: {
      commit
    },
    params,
    url,
    mutation
  })
}

export const purge = ({ state, commit }, params) => {
  const { url } = state
  const mutation = state.mutations.remove
  return remove({
    store: {
      commit
    },
    params,
    url,
    mutation
  })
}

export const run = ({ state, commit }, params) => {
  return new Promise((resolve, reject) => {
    try {
      Vue.prototype.$socket.emit('run-pipeline', { ...params }, response => {
        console.log('run actions', response)
        const data = uint8ToString(response.output.data)
        console.log('run actions', data)
        resolve({ ...response, data })
      })
    } catch (e) {
      console.error('run actions', e)
      reject(null)
    }
  })
}
