import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom-right',
  timeout: 1000,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})
