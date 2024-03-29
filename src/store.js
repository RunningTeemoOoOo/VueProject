import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTabbarShow: true
  },
  mutations: {
    showHideTabbar (state, data) {
      state.isTabbarShow = data
    }
  },
  actions: {

  }
})
