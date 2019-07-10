import Vue from 'vue'
import Router from 'vue-router'
import recommend from './views/Recommend'
import tab from './views/Tab'
import detail from './views/Detail'
import search from './views/Search'
import searchList from './views/SearchList'
import toplist from './views/TopList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
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
      path: '/s/:sData',
      component: searchList
    },
    {
      path: '/toplist/:topListId/sub/:subId',
      component: toplist,
      props: true
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
