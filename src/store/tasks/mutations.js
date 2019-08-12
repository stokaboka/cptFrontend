/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

export const SET_ROWS = (state, playload) => {
  state.rows = playload
  state.row = null
}

export const SET_ROW = (state, playload) => {
  state.row = playload
}

export const ADD_ROW = (state, playload) => {
  state.rows.push(playload)
}

export const UPDATE_ROW = (state, playload) => {
  state.rows = state.rows.map(e => {
    return (e._id === playload._id) ? { ...playload } : e
  })
}

export const UPDATE_ROW_STATUS = (state, playload) => {
  const { _id, status } = playload
  state.rows = state.rows.map(e => {
    return (e._id === _id) ? { ...e, status } : e
  })
}

export const REMOVE_ROW = (state, playload) => {
  state.rows = state.rows.filter(e => e._id !== playload._id)
}
