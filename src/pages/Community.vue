<template>
  <Layout>

    <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
      <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
        <el-tab-pane :label="'粉丝 '+ userInfo.followers" name="followers" style="padding: 5px">
          <div v-loading="followers.loading">
            <div v-if="$page.followers.edges.length">
              <el-row style="min-height: 200px; ">
                <el-col
                  :span="8"
                  v-for="(item, index) in $page.followers.edges"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="'/profile/' + item.node.login"
                      style=" text-decoration:none;cursor:pointer"
                    >{{ item.node.login }}</g-link>
                    <br>
                    <i class="el-icon-message"></i>&emsp;
                    <a :href="item.node.html_url" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                    <br>
                    <img :src="item.node.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px">
                  </el-card>
                </el-col>
              </el-row>
              <!-- <div style="text-align: center;margin-top: 10px">
                <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="followers.query.page"
                  :page-size="followers.query.pageSize"
                  :total="followers.query.pageNumber*followers.query.pageSize"
                >
                </el-pagination>
              </div> -->
            </div>
            <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注 '+ userInfo.following" name="following" style="padding: 5px">
          <div v-loading="following.loading">
            <div v-if="$page.followings.edges.length">
              <el-row style="min-height: 200px; ">
                <el-col
                  :span="8"
                  v-for="(item,index) in $page.followings.edges"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="'/profile/' + item.node.login"
                      style=" text-decoration:none;cursor:pointer"
                    >{{ item.node.login }}</g-link>
                    <br>
                    <i class="el-icon-message"></i>&emsp;
                    <a :href="item.node.html_url" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                    <br>
                    <img :src="item.node.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px">
                  </el-card>
                </el-col>
              </el-row>
              <!-- <div style="text-align: center;margin-top: 10px">
                <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="following.query.page"
                  :page-size="following.query.pageSize"
                  :total="following.query.pageNumber*following.query.pageSize"
                >
                </el-pagination>
              </div> -->
            </div>
            <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
  </Layout>
</template>

<page-query>
query {
	userInfo: allUserInfo {
    edges {
      node {
        id
        followers
        following
      }
    }
  }
  followers: allFollowers {
    edges {
      node {
        id
        avatar_url
        login
        html_url
      }
    }
  }
  followings: allFollowing {
    edges {
      node {
        id
        avatar_url
        login
        html_url
      }
    }
  } 
}
</page-query>

<script>
export default {
  name: 'CommunityPage',
  data() {
    return {
      activeTab: "followers",
      followers: {
        query: {
          page: 1,
          pageSize: 9,
          pageNumber: 1
        },
        loading: false,
        list: []
      },
      following: {
        query: {
          page: 1,
          pageSize: 9,
          pageNumber: 1
        },
        loading: false,
        list: []
      }
    }
  },
  computed: {
    userInfo () {
      return this.$page.userInfo.edges[0].node
    }
  },
  metaInfo: {
    title: '社交圈'
  },
  methods: {
    onSelect() {}
  }
}
</script>

<style>

</style>
