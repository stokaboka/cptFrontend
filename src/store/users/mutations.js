export const SET_ROWS = (state, playload) => {
  state.rows = playload
}

export const SET_ROW = (state, playload) => {
  state.row = playload
}

export const ADD_ROW = (state, playload) => {
  state.rows.push(playload)
}
