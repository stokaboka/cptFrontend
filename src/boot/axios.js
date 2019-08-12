/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import axios from 'axios'

export default async ({ store, Vue }) => {
  const api = store.getters['app/api']
  axios.defaults.baseURL = `${api.address}/${api.version}`

  Vue.prototype.$axios = axios
}
