export const SET_ROWS = (state, playload) => {
  state.users = playload
  state.model.rows = playload
}

export const SET_ROW = (state, playload) => {
  state.user = playload
  state.model.row = playload
}

export const ADD_ROW = (state, playload) => {
  state.users.push(playload)
  state.model.rows.push(playload)
}
