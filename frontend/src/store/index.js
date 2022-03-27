import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 0,
    mode: 0,
  },
  getters: {
  },
  mutations: {
    changeUser(state, use){
      state.user = use
    },
    changeMode(state, mode){
      state.mode = mode;
    }
  },
  actions: {
  },
  modules: {
  }
})
