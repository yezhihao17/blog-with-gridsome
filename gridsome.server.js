// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    
    const [ userData, gistsData, followersData, followingData ] = await Promise.all([
      axios.get('https://api.github.com/users/yezhihao17'),
      axios.get('https://api.github.com/users/yezhihao17/gists'),
      axios.get('https://api.github.com/users/GitHub-Laziji/followers'),
      axios.get('https://api.github.com/users/GitHub-Laziji/following')
    ])

    // 获取用户信息
    const { data: user } = userData
    const userCollection = addCollection('UserInfo')
    userCollection.addNode(user)

    // 获取用户 github 的 gist
    const { data: gists } = gistsData
    const gistsCollection = addCollection('Gist')
    for (const item of gists) {
      gistsCollection.addNode(item)
    }

    // 设置粉丝列表
    const { data: followers } = followersData
    const followerCollection = addCollection('Followers')
    for (const item of followers) {
      followerCollection.addNode(item)
    }

    // 设置关注列表
    const { data: following } = followingData
    const followingCollection = addCollection('Following')
    for (const item of following) {
      followingCollection.addNode(item)
    }

    // 获取 gits 详情
    let gistDetail = {}
    if (gists.length > 0) {
      const { data } = await axios.get(`https://api.github.com/gists/${gists[0].id}`)
      gistDetail = data
    }
    const gistsDetailCollection = addCollection('GistDetail')
    gistsDetailCollection.addNode(gistDetail)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/profile/:username',
      component: './src/templates/Profile.vue'
    })
  })
}
