import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cont: []
  },
  getters: {
    getListById: (state) => (id) => {
      return state.alllist[id]
    }
  },
  mutations: {
    Contlist (state, payload) {
      state.cont.push(payload)
    }
  }

})
export default store
