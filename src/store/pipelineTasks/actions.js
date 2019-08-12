/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { get, post, put, remove } from '../../lib/axiosWrapper'

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
  // console.log(state.id, params, urlAggregate)
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
