import { get, post } from '../../lib/axiosWrapper'

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
