import Vue from 'vue'
import Router from 'vue-router'
import chinaMap from '@/views/echarts/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chinaMap',
      component: chinaMap
    }
  ]
})
