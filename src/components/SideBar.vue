<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <template v-for="item in constantRouterMap">
          <el-menu-item
            :key="item.icon"
            :index="item.path"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-card>

    <!-- <el-card shadow="never" style="margin-top: 20px;text-align: center">
        <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
            <el-button type="text" @click="openTokenDialog">绑定</el-button>
        </div>
        <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
            <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
            <el-button type="text" @click="cancellation">注销</el-button>
        </div>
        <div style="margin-top: 10px;text-align: left">
            <el-alert title="Token获取" type="info" description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
                :closable="false">
            </el-alert>
        </div>
    </el-card> -->
    <!-- <token-dialog ref="tokenDialog"></token-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      constantRouterMap: [
        {
          path: '/',
          name: '最新动态',
          icon: 'el-icon-star-off'
        },
        {
          path: '/community',
          name: '社交圈',
          icon: 'el-icon-mobile-phone'
        },
        {
          path: '/blog',
          name: '博客列表',
          icon: 'el-icon-edit-outline'
        },
        {
          path: '/open-source',
          name: '开源项目',
          icon: 'el-icon-service'
        },
        {
          path: '/help',
          name: '使用帮助',
          icon: 'el-icon-printer'
        },
        {
          path: '/readme',
          name: 'README.md',
          icon: 'el-icon-document'
        }
      ],
      active: '/'
    }
  },
  methods: {
    onSelect (val) {
      this.$router.push(val)
    }
  },
  mounted () {
    this.active = this.$route.path
  }
}
</script>

<style>

</style>
