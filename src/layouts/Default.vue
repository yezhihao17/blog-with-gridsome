<template>
  <div class="layout">
    <!-- <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header> -->
    <!-- <slot></slot> -->

    <!-- 头部信息 -->
    <section
      class="page-header"
      :style="'background-image: linear-gradient(120deg, ' + config.bg_color_left + ', ' + config.bg_color_right + ');color: ' + config.font_color + ';'"
    >
      <!-- <div style="position:absolute; top:20px; right:20px; z-index:2;">
        <el-tooltip
          effect="dark"
          :content="fullButton.full ? '退出' : '全屏'"
          placement="bottom-end"
        >
          <el-button
            @click="full"
            :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
            circle
          ></el-button>
        </el-tooltip>
      </div> -->
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="'position:absolute; top:' + item.top + 'px; left:' + item.left + 'px; z-index:1;'"
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
      <h1 class="project-name">{{ config.blog_title }}</h1>
      <h2 class="project-tagline">{{ config.blog_describe }}</h2>
      <a :href="userInfo.html_url" class="btn" target="_blank">GitHub主页</a>
      <a :href="userInfo.html_url" class="btn" target="_blank" v-if="!mini">博客源码</a>
    </section>

    <div style="position:relative;  z-index:2;margin: auto;margin-top:-30px;width:64rem;">
      <el-card
        shadow="never"
        :body-style="{ padding: '0px' }"
      >

        <el-row>

          <el-col :span="10">
            <el-menu
              @select="selectTopbar"
              :default-active="topbar.active"
              mode="horizontal"
              menu-trigger="click"
            >

              <el-submenu index="#more">
                <template slot="title">了解博主</template>
                <el-menu-item index="#githubHome">github主页</el-menu-item>
                <el-menu-item index="#blog">其他博客</el-menu-item>
              </el-submenu>

              <el-submenu index="#webSites" v-if="webSites.length > 0">
                <template slot="title">其他网站</template>
                <el-menu-item
                  :index="'#webSites-' + index"
                  v-for="(item,index) in webSites"
                  :key="'#webSites' + index"
                >{{ item.name }}</el-menu-item>
              </el-submenu>

            </el-menu>
          </el-col>

          <el-col
           :span="8"
           style="text-align: center;padding: 12px 0px 0px 10px"
          >
            <el-row>
              <el-col :span="4">
                <el-popover placement="top" trigger="hover">
                  <div style="text-align: center">
                    <el-progress
                      color="#67C23A"
                      type="circle"
                      :percentage="music.volume"
                    ></el-progress>
                    <br>
                    <el-button
                      @click="changeVolume(-10)"
                      icon="el-icon-minus"
                      circle
                    ></el-button>
                    <el-button
                      @click="changeVolume(10)"
                      icon="el-icon-plus" 
                      circle
                    ></el-button>
                  </div>

                  <el-button
                    @click="play"
                    id="play"
                    slot="reference"
                    :icon="music.isPlay ? 'el-icon-refresh' : 'el-icon-caret-right'"
                    circle
                  ></el-button>
                </el-popover>
              </el-col>
              <el-col :span="14" style="padding-left: 20px">
                <el-slider
                  @change="changeTime"
                  :format-tooltip="$util.formatTime"
                  :max="music.maxTime"
                  v-model="music.currentTime"
                  style="width: 100%;"
                ></el-slider>
              </el-col>
              <el-col
                :span="6"
                style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px"
              >
                {{$util.formatTime(music.currentTime)}}/{{$util.formatTime(music.maxTime)}}
              </el-col>
            </el-row>

            <audio ref="music" loop autoplay v-if="audioAutoPlay">
              <source :src="audioUrl" type="audio/mpeg">
            </audio>
            <audio ref="music" loop v-else>
              <source :src="audioUrl" type="audio/mpeg">
            </audio>
          </el-col>

          <el-col :span="4" style="text-align: right;">
            <div style="font-size: 20px;color:#606266;margin-top: 5px">
              <b>{{ userInfo.github_name }}</b>
            </div>
            <div style="color:#606266;">
              <i class="el-icon-location"></i>&nbsp;{{ userInfo.location ? userInfo.location : '未填写地址' }}
              <br>
            </div>
          </el-col>

          <el-col :span="2" style="text-align: center;">
            <img
              v-popover:bigAvatar
              :src="userInfo.avatar_url"
              style="margin-top: 4px;margin-right: 10px;width:52px; height:52px; border-radius:5px; border: 1px solid #EBEEF5"
            />
            <el-popover
              ref="bigAvatar"
              placement="top-start"
              :title="userInfo.github_name"
              width="200"
              trigger="hover"
            >
              <i class="el-icon-star-on"></i>&emsp;{{ userInfo.name }}
              <br>
              <i class="el-icon-location"></i>&emsp;{{ userInfo.location }}
              <br>
              <img :src="userInfo.avatar_url" style="width: 200px;height: 200px;">
            </el-popover>
          </el-col>

        </el-row>

      </el-card>
    </div>

    <section class="main-content">

      <el-row>
        <el-col :span="6" style="padding-right:10px">
          <side-bar></side-bar>
        </el-col>
        <el-col :span="18" style="padding-left:10px">
          <slot></slot>
        </el-col>
      </el-row>

    </section>

    <section class="foot">
      <foot></foot>
    </section>

  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
	config: allStrapiConfig {
    edges {
      node {
        author
        blog_title
        blog_describe
        bg_color_left
        bg_color_right
        font_color
        github_name
        github_link
      }
    }
  }
  userInfo: allUserInfo {
    edges {
      node {
        login
        id
        node_id
        avatar_url
        gravatar_id
        url
        html_url
        followers_url
        following_url
        gists_url
        starred_url
        subscriptions_url
        organizations_url
        repos_url
        events_url
        received_events_url
        type
        site_admin
        name
        blog
        location
        bio
        public_repos
        public_gists
        followers
        following
        created_at
        updated_at
      }
    }
  }
}
</static-query>

<script>
import SideBar from '@/components/SideBar'
import Foot from '@/components/Foot'

export default {
  data () {
    return {
      randomIcon: [],
      mini: false,
      webSites: [
        {
          name: '掘金'
        }
      ],
      topbar: {
        active: ''
      },
      audioAutoPlay: false,
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100
      },
      fullButton: {
        full: false
      },
      audioUrl: ''
    }
  },

  computed: {
    // 基本信息
    config () {
      return this.$static.config.edges[0].node
    },

    // 用户信息
    userInfo () {
      return this.$static.userInfo.edges[0].node
    }
  },

  methods: {
    selectTopbar(index) {
      //取消菜单选中状态
      this.topbar.active = this.topbar.active === '' ? ' ' : ''
      switch (index) {
        case '#githubHome':
          window.open('https://github.com/' + this.config.github_name)
          break
        case '#blog':
          if (this.blog) {
            window.open((this.blog.match(/https?:\/\//i)?'':'https://') + this.blog)
          } else {
            this.$message({
              message: '博主没有其他博客',
              type: 'info'
            })
          }
          break
        default:
          if(/#webSites-\d+/.test(index)){
            let i = parseInt(index.split('-')[1])
            let url = this.webSites[i].url
            window.open((url.match(/https?:\/\//i)?'':'https://') + url)
          }
          break
      }
    },

    play() {
      if (this.$refs.music.paused) {
        this.$refs.music.play()
      } else {
        this.$refs.music.pause()
      }
      this.music.isPlay = !this.$refs.music.paused
      this.$nextTick(() => {
        document.getElementById('play').blur()
      })

    },
    changeTime(time) {
      this.$refs.music.currentTime = time
    },
    changeVolume(v) {
      this.music.volume += v
      if (this.music.volume > 100) {
        this.music.volume = 100
      }
      if (this.music.volume < 0) {
        this.music.volume = 0
      }
      this.$refs.music.volume = this.music.volume / 100
    }
  },

  mounted () {
    // 设置顶部音符内容
    let width = window.innerWidth
    for (let i = 0; i < 12; i++) {
      let temp = {}
      let left = this.$util.randomInt(10, width - 310)
      if (left > width / 2 - 150){
        left+=300
      }
      temp["left"] = left
      temp["top"] = this.$util.randomInt(20, 300)
      temp["size"] = this.$util.randomInt(20, 40)
      this.randomIcon.push(temp)
    }
  },

  components: {
    SideBar,
    Foot
  }
}
</script>

<style>
body {
  margin: 0;
}
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: underline;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn+.btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>
