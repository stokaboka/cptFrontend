export const SET_USERS = (state, playload) => {
  state.users = playload
}

export const SET_USER = (state, playload) => {
  state.user = playload
}

export const ADD_USER = (state, playload) => {
  state.users.push(playload)
}

export const SET_TASKS = (state, playload) => {
  state.tasks = playload
}

export const SET_PIPES = (state, playload) => {
  state.pipes = playload
}

export const SET_TASK = (state, playload) => {
  state.task = playload
}

export const SET_PIPE = (state, playload) => {
  state.pipe = playload
}
