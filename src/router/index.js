import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact',
  routes: [
   
    {
      path: '/',
      name: 'Home',
      component: resolve=>require(['../pages/home.vue'],resolve)
    },
    {
      path: '/macroanalysis',
      name: 'Macroanalysis',
      component: resolve=>require(['../pages/macroanalysis.vue'],resolve)
    },
    {
      path: '/tradearea',
      name: 'Tradearea',
      component: resolve=>require(['../pages/tradearea.vue'],resolve)
    },
    {
      path: '/cointypeDetail/:id',
      name: 'cointypeDetail',
      component: resolve=>require(['../pages/cointypeDetail.vue'],resolve)
    }
  ]
})
