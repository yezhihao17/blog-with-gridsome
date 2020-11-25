import config from './modules/config'

export default {
  state: {
    count: 0
  },
  mutations: {
    setCount: (state, payload) => {
      state.count = payload
    }
  },
  modules: {
    config
  }
}
