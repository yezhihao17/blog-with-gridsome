import axios from 'axios'

export default {
  namespaced: true,
  state: {
    backgroundColorLeft: '#155799',
    backgroundColorRight: '#159957',
    fontColor: '#fff',
    blogTitle: '我的博客',
    blogDescribe: '博客描述',
    githubUsername: 'yezhihao17',
    mini: false
  },
  mutations: {
    SET_CONFIG: (state, config) => {
      state.backgroundColorLeft = config.backgroundColorLeft || '#155799'
      state.backgroundColorRight = config.backgroundColorRight || '#159957'
      state.fontColor = config.fontColor || '#fff'
      state.blogTitle = config.blogTitle || '我的博客'
      state.blogDescribe = config.blogDescribe || '博客描述'
      state.githubUsername = config.githubUsername || 'yezhihao17'
      state.mini = config.mini || false
    }
  },
  actions: {
    async getConfig () {
      const data = await axios.get('../../../static/config.json')
      console.log(data)
    }
  }
}
