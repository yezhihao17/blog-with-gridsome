// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import util from './utils/util'
import dayjs from 'dayjs'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { appOptions, router }) {
  Vue.use(Vuex)
  Vue.use(ElementUI)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.prototype.$util = util

  // 设置过略器
  Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
  })

  appOptions.store = new Vuex.Store(store)
}
