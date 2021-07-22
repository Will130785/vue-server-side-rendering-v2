import { createApp } from './main'
import './assets/style.css'

const { app, router } = createApp({ state: window.__INITIAL_STATE__ })

router.onReady(() => {
  app.$mount('#app')
})
