/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

export const SET_TASK_RUNNER = (state, playload) => {
  state.taskRunner = playload
  state.taskRunnerLog.push(playload)
}

export const CLEAR_TASK_RUNNER_LOG = (state) => {
  state.taskRunnerLog = []
}
