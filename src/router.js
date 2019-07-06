import Vue from 'vue'
import Router from 'vue-router'
import recommend from './views/Recommend'
import tab from './views/Tab'
import detail from './views/Detail'
import search from './views/Search'
import searchList from './views/SearchList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: recommend
    },
    {
      path: '/tab/:tabId',
      component: tab,
      props: true
    },
    {
      path: '/d/:detailId',
      component: detail,
      props: true
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/s',
      component: searchList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
