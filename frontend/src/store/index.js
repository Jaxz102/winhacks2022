import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 0
  },
  getters: {
  },
  mutations: {
    changeUser(state, use){
      state.user = use
    }
  },
  actions: {
  },
  modules: {
  }
})
