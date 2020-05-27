import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Cloudinary from 'cloudinary-vue'
Vue.use(
  Cloudinary, {
  configuration: {
    cloudName: 'cloudinary-training'
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
