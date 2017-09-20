// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Dropzone from 'vue2-dropzone'

Vue.use(VueMaterial, VueAxios, axios)
Vue.use(VueResource)
Vue.config.productionTip = false

// Vue.http.options.root = 'http://127.0.0.1:8000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
