import axios from 'axios'

export default async ({ store, Vue }) => {
  const api = store.getters['app/api']
  axios.defaults.baseURL = `${api.address}/${api.version}`

  Vue.prototype.$axios = axios
}
